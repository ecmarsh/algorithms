/**
 * Get Equal Substrings Within Budget
 * __Weekly Contest 156__
 *
 * You are given two strings s and t of the same length.
 * You want to change s to t. Changing the i-th character of s to i-th
 * character of t costs |s[i] - t[i]| that is, the absolute difference
 * between the ASCII values of the characters.
 *
 * You are also given an integer maxCost.
 *
 * Return the maximum length of a substring of s that can be changed to be
 * the same as the corresponding substring of twith a cost lte maxCost.
 *
 * If there is no substring from s that can be changed to
 * its corresponding substring from t, return 0.
 *
 * Constraints:
 * - `1 <= s.length, t.length <= 10^5
 * - `0 <= maxCost <= 10^6`
 * - `s` and `t` contain only lowercase English letters.
 *
 * @example
 * Input: s = "abcd", t = "bcdf", maxCost = 3
 * Output: 3
 * Explanation: "abc" of s can change to "bcd".
 *              That costs 3, so the maximum length is 3.
 * @example
 * Input: s = "abcd", t = "cdef", maxCost = 3
 * Output: 1
 * Explanation: Each character in s costs 2 to change to charactor in t,
 *              so the maximum length is 1.
 * @example
 * Input: s = "abcd", t = "acde", maxCost = 0
 * Output: 1
 * Explanation: You can't make any change, so the maximum length is 1.
 *
 * Analysis:
 * N is len(s) === len(t)
 * Time: O(N) with sliding window.
 * Space: O(N) with memo. O(1) w/o memo. Without caching,
 *        potentially performing N more operations than needed though.
 *        Made about a 15% difference for test cases in scripting languages.
 */

/**
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
module.exports = function equalSubstringsInBudget( s, t, maxCost ) {
  const windowBounds = [0, 0];
  let [lo, hi] = windowBounds;

  for ( lo, hi; hi < s.length; hi += 1 ) {
    maxCost -= Math.abs( s.charCodeAt( hi ) - t.charCodeAt( hi ) );
    if ( maxCost < 0 ) {  // if over budget
      maxCost += Math.abs( s.charCodeAt( lo ) - t.charCodeAt( lo ) );
      lo += 1;
    }
  }

  /**
   * Note we don't need to check for window length each time
   * because upper bound is always being incremented and
   * lower bound is at most being incremented by one,
   * so once we reach the max, it can never be lower than that size.
   * We could also use s.length as hi since hi will always end there.
   */
  return hi - lo;
};
