/**
 * @=lc id=392 lang=javascript tag=dp
 *
 * [392] Is Subsequence
 *
 * Given a string s and a string t, check if s is subsequence of t.
 *
 * You may assume that there is only lower case English letters in both s and t.
 * t is potentially a very long (length ~= 500,000) string,
 * and s is a short string (<=100).
 *
 * A subsequence of a string is a new string which is formed from the
 * original string by deleting some (can be none) of the characters without
 * disturbing the relative positions of the remaining characters.
 * ie, "ace" is a subsequence of "abcde" while "aec" is not.
 *
 * @example
 * Input: s = "abc", t = "ahbgdc"
 * Output: true
 *
 * @example
 * Input: s = "axc", t = "ahbgdc"
 * Output: false
 *
 * @complexity
 * Time: O(T) worst case t is false, O(s) best case if t is prefixed with s.
 * Space:
 */

/**
 * Check t (in order), "crossing off" chars in s.
 * There is a valid subsequence if the end of s is reached.
 *
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
module.exports = function isSubsequence( S, T ) {
  if ( S === '' ) {
    return true;
  }
  for ( let s = 0, t = 0; t < T.length; t++ ) {
    if ( S[s] == T[t] ) {
      if ( ++s === S.length ) {
        return true;
      }
    }
  }
  return false;
};

