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
 */

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
module.exports = function wordBreak( s, wordDict ) {

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
