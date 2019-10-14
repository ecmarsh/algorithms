/**
 * Split a String into Balanced Substrings
 * __Weekly Contest 158__
 *
 * Balanced strings are those who have a quantity of 'L' and 'R' characters.
 *
 * Given a balanced string `s`, return the maximum amount
 * of splitted balanced strings.
 *
 * Constraints:
 *  - `1 <= s.length <= 1000`
 *  - `s[i] = 'L' or 'R'
 *
 * @example
 * Input: s = "RLRRLLRLRL"
 * Output: 4
 * Explanation: s can be split into "RL", "RRLL", "RL", "RL"
 *              each substring contains same number of 'L' and 'R'.
 *
 * @example
 * Input: s = "RLLLLRRRLR"
 * Output: 3
 * Explanation: s can be split into "RL", "LLLRRR", "LR",
 *              each substring contains same number of 'L' and 'R'.
 *
 * @exmaple
 * Input: s = "LLLLRRRR"
 * Output: 1
 * Explanation: s can be split into "LLLLRRRR".
 *
 * Complexity:
 * n is len(s)
 * Time: O(n)
 * Space: O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
module.exports = function balancedStringSplit( s ) {
  const m = { R: 1, L: -1 };
  let cnt = 0;
  let ret = 0;
  for ( let i = 0; i < s.length; i++ ) {
    cnt += m[s[i]];
    ret += cnt === 0;
  }
  return ret;
};

