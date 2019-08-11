/**
 * Number of Dice Rolls with Target Sum
 * _Weekly Contest 149_
 *
 * You have d dice, and each die has f faces numbered 1, 2, ..., f.
 *
 * Return the number of possible ways (out of fd total ways) **modulo 10^9 + 7**
 * to roll the dice so the sum of the face up numbers equals target.
 *
 * @example
 * Input: d = 1, f = 6, target = 3
 * Output: 1
 * Explanation: You throw one die with 6 faces. Only one way to get sum of 3.
 *
 * @example
 * Input: d = 2, f = 6, target = 7
 * Output: 6
 * Explanation: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1
 *
 * @example
 * Input: d = 2, f = 5, target = 10
 * Output: 1
 * Explanation: You throw two dice, each w 5 faces. Only one way to get 10: 5+5.
 *
 * @example
 * Input: d = 30, f = 30, target = 500
 * Output: 222616187
 * Explanation: The answer must be returned mod 10**9 + 7.
 *
 * Constraints:
 * + `1 <= d, f <= 30`
 * + `1 <= target <= 1000`
 *
 */

/**
 * @param {number} die Number of dice.
 * @param {number} faces Number of faces each dice has.
 * @param {number} target Sum faces should equal.
 * @return {number} Number of ways to roll acc sum of target.
 */
module.exports = function numRollsToTarget( die, faces, target ) {
  const dp = Array( target + 1 ).fill( 0 ),
    mod = 10 ** 9 + 7;

  dp[0] = 1;

  for ( let c = 0; c < die; c++ ) {
    for ( let i = target; i >= 0; i-- ) {
      dp[i] = 0;

      for ( let x = 1; x <= faces && x <= i; x++ ) {
        dp[i] = ( dp[i] + dp[i - x] ) % mod;
      }

    }
  }

  return dp[target];
};
