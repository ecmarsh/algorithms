/* eslint-disable curly */

/**
 * Coin Change
 *
 * You are given coins of different denominations and
 * a total amount of money amount.
 *
 * Write a function to compute the fewest number of coins
 * that you need to make up that amount.
 *
 * If that amount of money cannot be made up
 * by any combination of the coins, return -1.
 *
 * You may assume that you have an infinite number of each coin.
 *
 * @example
 * Input: coins=[1,2,5] amount=11
 * Output: 3
 * Explanation: Fewest is 11 = 5 + 5 + 1
 *
 * @example
 * Input: coins=[2] amount=3
 * Output: -1
 * Explanation: You cannot make 3 from 2
 *
 *
 * Analysis:
 * let A = amount, c = # of coins
 * Time: O(A * c) <-- check each coin for every amount up to amount
 * Mem: O(A) <-- dp table
 *
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
module.exports = function coinChange( coins, amount ) {
  if ( !amount )
    return 0;
  if ( !coins.length )
    return -1;
  if ( coins.length === 1 )
    return amount % coins[0] ? -1 : amount / coins[0];

  coins.sort( ( a, b ) => a - b );

  const dp = [0, ...Array( amount ).fill( amount + 1 )];

  for ( let i = 1; i <= amount; i++ ) {
    for ( let x = 0; x < coins.length && coins[x] <= i; x++ ) {
      const remains = i - coins[x];

      if ( dp[remains] < dp[i] )
        dp[i] = 1 + dp[remains];
    }
  }

  return dp[amount] <= amount ? dp[amount] : -1;
};

/**
 * Slower, but more readable implementation.
 */
module.exports._coinChange = function _coinChange( coins, amount ) {
  const max = amount + 1,
    dp = [0].concat( Array( amount ).fill( max ) );

  for ( let i = 1; i < max; i++ ) {
    for ( let c = 0; c < coins.length; c++ ) {
      if ( coins[c] <= i )
        dp[i] = Math.min( dp[i], 1 + dp[i - coins[c]] );
    }
  }

  return dp[amount] > amount ? -1 : dp[amount];
};

/*
DP
coins=[1, 2, 5], amount=3

TOP DOWN
 3 ->  [2,1] -> []
:1 ->    3-1=2          3-2=1
:2 -> 2-1=1, 2-2=*0*    1-1=*0*

BOTTOM UP
Array(amount + 1):
 0  1  2  3
[0, 4, 4, 4]

i=0,x=1-> [0,1,4,4]
i=0,x=2-> X
i=1,x=1-> [0,1,1,4]
i=1,x=2-> [0,1,min(2,1),4]
i=2,x=1-> [0,1,1,2]
i=2,x=2-> [0,1,1,2]

dp[amount=3] = 2

*/
