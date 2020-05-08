/**
 * @lc id=309 lang=javascript tag=dp,greedy,state machine
 *
 * [309] Best Time to Buy/Sell Stocks with Cooldown
 *
 * Say you have an array for which the ith element is the price
 * of a given stock on day i.
 *
 * Design an algorithm to find the maximum profit. You may complete
 * as many transactions as you like (ie, buy one and sell one
 * share of the stock multiple times) with the following restrictions:
 *   - You may not engage in multiple transactions at the same time
 *    (ie, you must sell the stock before you buy again).
 *   - After you sell your stock, you cannot buy stock on next day.
 *     (ie, cooldown 1 day)
 *
 * @example
 * Input: [1,2,3,0,2]
 * Output: 3
 * Explanation: transactions = [buy, sell, cooldown, buy, sell]
 *
 * @complexity
 * Time: O(N) where N is number of prices. One iteration
 * through with constant time in each loop.
 * Space: O(1) -> Only the 3 constants are stored since we only
 * require intermediate states for each transaction.
 */

/*

State machine
-------------
Actions:
- sell: sell stock -> transition to sold state
- buy: acquire stock -> transition to held state
- rest: no transaction -> state remains the same

Goal: determine path through states at each price that gains maximum profit


Implementation
---------
Use 3 arrays to calculate values for the state arrays,
where each element in the array represents the maximal profit
that we could gain at the specific price point `i` for the given state.
ie sold[2] = maximal profit gained if sell stock at price point price[2]

sold[i] = held[i-1] + price[i]
 ... since prev state of sold can only be held, max profit of state is
     max profit of previous state plus revenue of selling stock now
held[i] = max(held[i-1], reset[i-1] - price[i])
 ... since prev state could be held or reset, determine if more profitable
     to hold or to acquire a stock at current price
reset[i] = max(reset[i-1], sold[i-1])
 ... prev states could be reset or sold, so just take the max of whichever
     state is more profitable

max profit: max(sold[n], reset[n]) at the last price point
(note held is not included since buying on last day only reduces profit)

Initial state: 'reset' -> we dont own any stocks
sold[-1] and held[-1] should be -Infinity or min value as a baseline

NOTE: we only need intermediate values at exactly one step before
the current step, so instead of using 3 arrays to store everything,
we only need a sliding window of size 1 to calculate the final (sold[n], reset[n])

Example
-------
prices=[1, 2, 3, 0, 2]

day0: 1, sold: -Infinity, held: -1, reset:0
day1: 2, sold: 1, held: -1, reset:0
day2: 3, sold: 2, held: -1, reset:1
day3: 0, sold: -1, held: 1, reset:2
day4: 2, sold: 3, held: 1, reset:2

*/

/**
 * @param {number[]} prices
 * @return {number}
 */
module.exports = function maxProfit( prices ) {
  // The max profit if we are at corresponding state at prices[i]
  let sold = -Infinity;
  let held = -Infinity;
  let reset = 0;

  prices.forEach( price => {
    // Store value before updating sold
    const preSold = sold;

    // Sold is price if held stock was sold on this day
    // If we don't own anything, it will remain at -Infinity
    sold = held + price;

    // Is it more profitable to hold our stock, or buy the stock
    // on the current day, on which price must be from reset
    // since a one day cooldown is required.
    held = Math.max( held, reset - price );

    // More profitable to use today as a reset day or
    // dont do the sale and take the price before sale.
    reset = Math.max( reset, preSold );
  } );

  return Math.max( sold, reset );
};
