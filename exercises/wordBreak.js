/**
 * Word Break
 *
 * Given a non-empty string s and a dictionary wordDict
 * containing a list of non-empty words, determine if
 * s can be segmented into a space-separated sequence
 * of one or more dictionary words.
 *
 * Note:
 * - Dictionary words may be reused multiple times.
 * - You may assume the dictionary does not contain duplicate words.
 *
 * @example
 * Input: s = "leetcode", wordDict = ["leet", "code"]
 * Output: true
 * Explanation: Return true because "leetcode" can be segmented as "leet code".
 * @example
 * Input: s = "applepenapple", wordDict = ["apple", "pen"]
 * Output: true
 * Explanation: Return true because "applepenapple" can be segmented
 *              as "apple pen apple". Remember we can reuse dictionary words.
 * @example
 * Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 * Output: false
 * Explanation: s cannot be segmented into any combination of dictionary words.
 *
 * Analysis: See psuedocode near EOF.
 */

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
module.exports = function wordBreak( s, wordDict ) {
  const sLen = s.length;

  // Convert wordDict arr to hash map for O(1) word checks.
  // And keep track of max length word for checking boundaries.
  const dict = new Map();
  let maxWordLen = 1;
  for ( const word of wordDict ) {
    const wordLen = word.length;
    if ( wordLen === sLen && s === word ) {
      return true;
    }
    if ( wordLen < sLen ) {
      dict.set( word, true );
      if ( wordLen > maxWordLen ) {
        maxWordLen = wordLen;
      }
    }
  }

  // By not filling, every loop will skip idxs not set.
  const prefixIndices = Array( sLen );

  // If we forEach on s, s will be coerced to arr = +O(S) space
  for ( let i = 0; i < sLen; i+=1 ) {
    if ( i < maxWordLen && dict.has( s.slice( 0, i + 1 ) ) ) {
      prefixIndices[i] = true;
    } else {
      prefixIndices.every( ( _, j ) => {
        if ( dict.has( s.slice( +j + 1, i + 1 ) ) ) {
          prefixIndices[i] = true;
        }
        // Break if set by returning false
        return !prefixIndices[i];
      } );
    }
    // Don't need to check anymore since we can guarantee
    // substring(j:i) won't be in dict if len > max dict word.
    delete prefixIndices[i - maxWordLen];
  }

  return Boolean( prefixIndices[sLen - 1] );
};


/** Recursive, top-down solution which TLE's. */
/* eslint-disable no-unused-vars */
function bruteForce( s, wordDict ) {
  // Build dictionary of words for O(1) access
  const dict = {};
  let maxWordLen = 1;
  wordDict.forEach( ( word ) => {
    dict[word] = true;
    if ( word.length > maxWordLen ) {
      maxWordLen = word.length;
    }
  } );

  // If we reached end, entirety of s can be segmented
  let hasReachedEnd = false;

  const checkWord = ( start, inProgress ) => {
    if ( start === s.length ) {
      hasReachedEnd = true;
      return;
    }
    for ( let i = start; i < s.length; i+=1 ) {
      if ( ( inProgress + s[i] ) in dict ) {
        checkWord( i + 1, '' );
      }
      if ( inProgress.length < maxWordLen ) {
        inProgress += s[i];
      } else {
        break;
      }
    }
  };

  checkWord( 0, '' );

  return hasReachedEnd;
}

/*

Attempt 1: TLE on multiple of same letter
keep track of in progress
if reachedEnd -> true
for each letter in s:
  if inProgress = word in dict -> branch
Runtime could be S^S if branching for all characters

Attempt 2: DP?
1. Dict hash map again
  - Optimization: keep max word len from dict for less checks

2. For each letter in s:
  2a. If encounter valid prefix:
        - store current index
  2b. If not valid:
        for all stored indices where prefix seen:
            - if substring from that index to current:
                store current
            - delete if current - stored is > max len in dict

3. True if the end index in our prefixes

Big O would be:
let D = len(wordDict)
let S = len(s)
Build dict:
  Time: O(D)
  Space: O(D)
Check prefixes:
  Time: O(S^2) if each index makes a prefix and maxDictWord = S-1
  Space: O(S) to store prefixes
        - although not storing at some indices,
          contiguous space in mem still reserved
TOTAL BIG O:
Time: O(S^2 + D)
Space: O(S + D)

*/
