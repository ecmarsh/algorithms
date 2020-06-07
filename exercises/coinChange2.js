/**
 * @lc id=518 lang=javascript tag=dp
 *
 * [518] Coin Change 2
 *
 * You are given coins of different denominations and a total amount
 * of money. Write a function to compute the number of combinations that
 * make up that amount. You may assume you have infinite number of each
 * kind of coin.
 *
 * @constraints
 * - 0 <= amount <= 5000
 * - 1 <= coin <= 5000
 * - the number of coins is less than 500
 * - the answer is guaranteed to fit into signed 32-bit integer
 *
 * @example
 * Input: amount = 5, coins = [1, 2, 5]
 * Output: 4
 * Explanation: there are four ways to make up the amount:
 * 5=5
 * 5=2+2+1
 * 5=2+1+1+1
 * 5=1+1+1+1+1
 *
 * @example
 * Input: amount = 3, coins = [2]
 * Output: 0
 * Explanation: the amount of 3 cannot be made up just with coins of 2.
 *
 * @example
 * Input: amount = 10, coins = [10]
 * Output: 1
 *
 * @complexity
 * Let: N = number of coins (coins.length), A = amount
 * Time: O(N * Amount)
 * Space: O(amount)
 */

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
module.exports = function coinChange( amount, coins ) {
  // NOTE: doesn't matter if coins are sorted because we are going
  // to loop through all of them anyway.

  const ways = Array( amount + 1 ).fill( 0 );
  ways[0] = 1;

  for ( let i = 0; i < coins.length; i++ ) {
    const coin = coins[i];
    // We work upwards to avoid duplicate combinations.
    // See recursive tree showing duplicates.
    for ( let curAmt = coin; curAmt <= amount; curAmt += 1 ) {
      ways[curAmt] += ways[curAmt - coin];
    }
  }

  return ways[amount];
};


// Recursive Solution (TLE)
// sort + O(coins.length ^ 2) ?
module.exports.recursive = function changeRecursive( amount, coins ) {
  let ways = 0;
  // Ensure coins in ascending order
  coins.sort( ( a, b ) => a - b );

  function count( remain, i ) {
    // Base case, we've found a way to make our amount
    if ( remain === 0 ) return ++ways;
    // Starting from current coin, work backwards and get counts
    // We need to maintain an order to avoid duplicate combo orders.
    for ( i; i >= 0; i-- )
      if ( remain - coins[i] >= 0 )
        count( remain - coins[i], i );
  }

  count( amount, coins.length - 1 );

  return ways;
};


/*

[1,2,5], 5

        5
    5/  2\  1\
   0    3    4
 +1   2/ 1\
      1    2
     1/   2| 1\
     0    0   1
     +1 . +1  +1 * we dup here, 3 should be 2
                   dont allow dups by not allowing numbers larger than cur

amt = 1,
[1,0,0,0,0]
[1,2,3,]


[0,1,2]

[1,2,5], 11
[]

*/

