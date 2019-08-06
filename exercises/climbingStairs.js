/**
 * Climbing Stairs
 *
 * You are climbing a stair case.
 * It takes `n` steps to reach the top.
 *
 * Each time you can either climb 1 or 2 steps.
 * In how many distinct ways can you climb to the top?
 *
 * Constraints: n is positive integer.
 *
 * @example
 * Input: 2
 * Output: 2
 * Explanation: 1+1 or 2
 *
 * @example
 * Input: 3
 * Output: 3
 * Explanation: 1,1,1 or 2,1 or 1,2
 *
 */

/**
 * @param {number} n
 * @return {number}
 */
module.exports = function climbStairs( n ) {
  return Array( n - 1 )
    .fill( 0 ) // [].prototype.reduce ignores undefined
    .reduce( ( [a, b] ) => [b, a + b], [1, 1] )
    .pop();
};
