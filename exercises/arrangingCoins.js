/**
 * @lc id=441 lang=javascript tag=binsearch,math
 *
 * [441] Arranging Coins
 *
 * You have a total of n coins that you want to form in a
 * staircase shape, where every k-th row must have exactly k coins.
 *
 * Given n, find the total number of full staircase rows that can be formed.
 *
 * n is a non-negative integer and fits within the range of
 * a 32-bit signed integer.
 *
 * @example
 * Input: n = 5
 * Output: 2
 * Explanation:
 *  The coins can form the following rows:
 *    ¤
 *    ¤ ¤
 *    ¤ ¤
 *  Because the 3rd row is incomplete, we return 2.
 *
 * @example
 * Input: n = 8
 * Output: 3
 * Explanation:
 *  The coins can form the following rows:
 *    ¤
 *    ¤ ¤
 *    ¤ ¤ ¤
 *    ¤ ¤
 *  Because the 4rd row is incomplete, we return 3.
 *
 * @complexity
 * Time: O(log n) -> Binary search 1..n
 * Space: O(1)
 */

/**
 * @param {number} n
 * @return {number}
 */
module.exports = function arrangeCoins( n ) {
  if ( n <= 1 ) {
    return n;
  }

  let [lo, hi] = [1, n];

  while ( lo < hi ) {
    const mid = ( hi + lo ) >> 1;
    const s = summation( mid );
    if ( s > n ) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return summation( lo ) > n ? lo - 1 : lo;
};

/**
 * Gauss summation
 * Calcuates summation from 1..n
 * @param {number} n
 * @return {number}
 */
const summation = n => ( n * ( n + 1 ) ) / 2;
