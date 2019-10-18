/**
 * Counting Bits
 *
 * Given a non-negative integer `num`, for every number `i`,
 * where `0 <= i <= num`, calculate the number of 1's in thei
 * binary representation and return them as an array where arr[i] is count.
 *
 * @example
 * Input: 2
 * Output: [0,1,1]
 *
 * @example
 * Input: 5
 * Output: [0,1,1,2,1,2]
 *
 * @complexity:
 * Time: O(n), where n is input, num
 * Space: O(n) only for output
 */

/**
 * DP + least significant bit, pop count is:
 * P(n) = P(n/2) + parity
 * @param {number} num
 * @return {number[]}
 */
module.exports.leastSignificantBit = function( num ) {
  const dp = [0];
  for ( let i = 1; i < num + 1; i++ ) {
    dp[i] = dp[i >> 1] + ( i & 1 );
  }
  return dp;
};

/**
 * Set last set bit to 0 and increment 1, pop count is:
 * P(n) = P(lastsetbit of n to 0) + 1
 * Set bit to 0 is x&(x-1)
 * @param {number} num
 * @return {number[]}
 */
module.exports.lastSetBit = function( num ) {
  const dp = [0];
  for ( let i = 1; i < num + 1; i++ ) {
    dp[i] = dp[i & ( i - 1 )] + 1;
  }
  return dp;
};

