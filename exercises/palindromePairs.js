/**
 * Palindrome Pairs
 *
 * Given a list of _unique_ words, find all pairs of
 * _distinct_ indices (i,j) in the list, so that the concatenation,
 * of the two words (words[i] + words[j]) is a palindrome.
 *
 * @example
 * Input: ['abcd','dcba','lls','s','sssll']
 * Output: [[0,1][1,0][3,2][2,4]]
 * Explanation: The palindromes are:
 * ['dcbaabcd','abcddcba','slls','llsssll']
 *
 * @example
 * Input: ['bat','tab','cat']
 * Output: [[0,1],[1,0]]
 * Explanation: ['battab','tabbat']
 *
 * Analysis (Optimal Solution):
 * N is # of words
 * k is length of longest word (for upper bound). Avg length for average case.
 * Time: 2(N * k^2) <-building + searching trie = O(N*k^2)
 * Space: O(N * k) <-trie
 *
 */

/**
 * @param {string[]} words
 * @return {number[][]}
 */
module.exports = function palindromePairs( words ) {
  if ( words.length < 2 ) {
    return [];
  }

  const trie = new Trie();

  for ( let i = 0; i < words.length; i++ ) {
    trie.addWord( words, i );
  }

  for ( let i = 0; i < words.length; i++ ) {
    trie.findPalindromePairs( words, i );
  }

  return trie.pairs;
};

/**
 * Defines node in trie of chars.
 */
function TrieNode() {
  this.children = {};
  this.endIndex = -1;
  this.prefixIndices = [];
}

/**
 * Defines structure for Trie.
 */
function Trie() {
  this.root = new TrieNode();
  this.pairs = [];
}

/**
 * Adds characters of given word to trie in reverse,
 * storing the index of word of words if
 * is a palindrome at an index of word.
 * @param {string} word The word to add to trie.
 * @param {number} index The index of word in words[].
 * @return {void}
 *
 * If k is length of word, then
 * Runtime: O(k^2)
 * Space: +O(k) space (plus # of prefixes that are palindromes).
 *
 */
Trie.prototype.addWord = function( words, index ) {
  const word = words[index];

  let node = this.root;
  for ( let i = word.length - 1; i >= 0; i-- ) {
    const char = word.charAt( i );

    if ( !node.children[char] ) {
      node.children[char] = new TrieNode();
    }

    // Store the word index if prefix is palindrome
    // so we can limit check to concatenation with suffix.
    if ( isPalindrome( words, index, 0, i ) ) {
      node.prefixIndices.push( index );
    }

    node = node.children[char];
  }

  node.endIndex = index;
  node.prefixIndices.push( index );
};

/**
 * Searches trie for a complement that may
 * be concatenated with given word to form palindrome.
 * @param {string} word The list of words.
 * @param {number} i The index of current word.
 * @return {void} Matches are stored in trie's pairs property.
 */
Trie.prototype.findPalindromePairs = function( words, i ) {
  const word = words[i];

  // Check for case where a palindrome is valid where
  // a prefix of the current word can form a palindrome with
  // the reversed form of another word.
  // If this is the case, as long as the suffix of the current word
  // is also a palindrome, then we have valid palindrome.
  // Ex: Current word is 'abccc'. Another word is 'ba', stored as 'ab'.
  //     At index 2, the node will have an end index for 'ba'.
  //     Since the remaining suffix, 'ccc', is a palindrome,
  //     we can make a palindrome from 'ab' + 'ccc' + 'ba'.
  let node = this.root,
    j = 0;

  while ( node && j < word.length ) {
    const isEndOfOtherWord = node.endIndex >= 0 && node.endIndex !== i;
    if ( isEndOfOtherWord && isPalindrome( words, i, j ) ) {
      this.pairs.push( [i, node.endIndex] );
    }
    node = node.children[word[j++]];
  }

  // Check for case where a palindrome is valid using the
  // the entire current word as a prefix to another word.
  // Ex: Current word is 'abc'. There is another word 'dedcba'
  //     Other word was stored as a->b->c->d->e-d
  //     We've exhausted 'abc' search, and there still remains 'ded'
  //     Since 'ded' is a palindrome, index should be stored,
  //     and we know that abc + dedcba makes a prefix.
  if ( !node ) {
    return;
  }
  for ( const j of node.prefixIndices ) {
    if ( i !== j ) {
      this.pairs.push( [i, j] );
    }
  }
};


/**
 * Validates a string for palindrome fulfillment.
 * Optionally check a substring for palindrome requirements
 * by providing a start and end index.
 * Default will check the entire word.
 */
const isPalindrome = ( words, i, start, end ) => {
  if ( start == null ) {
    start = 0;
  }
  if ( end == null ) {
    end = words[i].length - 1;
  }
  while ( start <= end ) {
    if ( words[i].charAt( start ) !== words[i].charAt( end ) ) {
      return false;
    }
    start++; end--;
  }
  return true;
};


/**
 * Palindrome Pairs Brute Force Solution
 * Accepted, but at very unreasonable runtime.
 * O(N^2 * k) runtime - See @pseudocode at bottom for deets.
 * O(N) space
 *
 * @param {string[]} words
 * @return {number[][]}
 */
module.exports.bruteForce = function bruteForce( words ) {
  const wordMap = {};
  words.forEach( ( word, i ) => {
    wordMap[word] = i;
  } );

  const pairs = [];
  words.forEach( ( w1, i ) => {
    for ( const w2 in wordMap )
      if ( w1 !== w2 && isPalindromeBrute( w1 + w2 ) )
        pairs.push( [i, wordMap[w2]] );
  } );

  return pairs;
};

/**
 * Simple boolean check for palindrome fulfillment.
 */
const isPalindromeBrute = word => {
  let left = 0, right = word.length - 1;
  while ( left <= right ) {
    if ( word[left] !== word[right] ) {
      return false;
    }
    left++; right--;
  }
  return true;
};

/*
PSUEDO/PLANNING

Brute force:
  Compare all possible pairs of indices for palindrome match.

  map = { [word]: index };
  for i in range(0,len(words)-1):
    map.add(words[i], i)

  for w1 in range(0,len(words)-1):
    for w2 in map:
      if ( w1 != w2 and isPalindrome(w1+w2) ):
        addToResult([i, map[w2]])

Time:
N <- build map
+ N*N <- check each combo
*(k+k)<- validate palindrome
= N^2 * 2k + N
= O(N^2*k)
Space: O(N) <- map

--------------------

Can we do linear?
Can we move exponential to smaller (k)?
Trie?
Store reversals?
Sort then check?

  for i in range(0, len(words)):
    word = words[i]
    for j in range(0, len(word)):
      addCharToTrie();

  for i in range(0, len(words)):
    if ( trie.has(charLeft) ):
      continue checking...true if EOW(w idx) && i = len(word)
      add( [i, trieNodeIdx])
    if ( trie.has(charRight) ):
      continue checking...true if EOW(w idx) && i < 0
      add( [trieNodeIdx, i] )

Time: O(2 * len(words) * maxLenWord)
Space: O(len(words) * maxLenWord) <-- trie, no output arr

root=new TrieNode()

TrieNode:
  children: new Map<char, trieNode>,
  eowIndex: -1

addWord( word, idx ):
  cur = root
  c = 0
  while ( c < len(word) ):
    char = word[c]
    if ( !cur.children.has(char) ):
      cur.children.set(char, new TrieNode)
    cur = cur.children.get(char)
    c++
  **cur.children.eowIdx = idx;


...same strategy for traversal on check word
  cur = root
  c = 0
  while ( c < len(word) ):
    if ( !cur.has(word[c])):
      return -1
    c++

  return cur.eowIdx;

***
Note the idea of this solution fails
even if start at last char - 1 since missing the cases
like 's', lls' where we need to check the other word.
***
-----------
Then what makes palindrome work?

Concatenation of two words, s1 is s2 is a palindrome if:

1. The reverse of s2 is a suffix of s1 and the rest of s1 is a palindrome; ie the prefix of s1 excluding the previous suffix is a palindrome.
  s1='lls', s2='s'
  suffix(s1)='s' && rvs(s2)='s'
  && s1-rvs(s1) = 'll' -> isPalin

2. The reverse of s1 is a suffix of s2 and the rest of s2 is a palindrome; ie, the prefix of s2 excluding the previous suffix is a palindrome.
  's1'='abc', s2='dcdcba'
   rvs(s1)='cba' && s2[:-len(s1)]=true (dcd,**cba**)
   && s2-rvsd(s1) = 'dcd' -> isPalin

Saying the same thing, except with vice versa order:
isConcatAPalin( s1, s2 ):
  VARS:
    len1, len2 = len(s1), len(s2)
    prefix, suffix = s1[0,len2], s1[:-len2]
  REQS:
    suffix === s2[::-1]
    isPalin(prefix) === true

*** How can we use this? ***
- When adding word to trie and already iterating characters,
  we can check at each char (a prefix) if it's a palindrome,
  and add the index if it is a palindrome in addition
  to the entire word as a modification to the failed
  trie psuedocode above.
- Checking at each char index will be k*(k-1) = k^2 time,
  but then we only have to check one word at a time amongst trie.
  So we'll see the benefits if number of words < avg word length,
  since time will be N*k^2 vs k*N^2.

*/
