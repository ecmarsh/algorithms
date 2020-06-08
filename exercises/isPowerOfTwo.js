/**
 * @lc id=231 lang=javascript tag=bits
 *
 * [231] Power of Two
 *
 * Given a positive integer, write a funciton to determine if power of two.
 *
 * @example
 * Input: 1
 * Output: true
 * Explanation: 2^0 = 1
 *
 * @example
 * Input: 16
 * Output: true
 * Explanation: 2^4 = 16
 *
 * @example
 * Input: 218
 * Output: false
 *
 * @complexity
 * Time: O(1)
 * Space: O(1)
 */

/**
 * @param {number} n
 * @return {boolean}
 */
module.exports = function isPowerOfTwo( n ) {
  // Remove last set bit formula: n & (n-1)
  // Powers of two will only have one set bit.
  // So if we remove the last one, then it should be zero.
  return n & ( n - 1 ) === 0;
};
