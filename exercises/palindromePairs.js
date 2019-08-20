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
 * Analysis:
 * N is # of words
 * k is length of longest word (for upper bound). Avg length for average case.
 * Time: 2(N * k^2) <-building + searching trie = O(N*k^2)
 * Space: O(  ), trie
 *
 */

/**
 * @param {string[]} words
 * @return {number[][]}
 */
module.exports = function palindromePairs( words ) {

};

/**
 * Validates a string for palindrome fulfillment.
 * Time: O(k), where k is length of word.
 */
const isPalindrome = word => {
  let left = 0, right = word.length - 1;
  while ( left <= right ) {
    if ( word[left] !== word[right] ) {
      return false;
    }
    left++; right--;
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
      if ( w1 !== w2 && isPalindrome( w1 + w2 ) )
        pairs.push( [i, wordMap[w2]] );
  } );

  return pairs;
};
