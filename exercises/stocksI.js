/**
 * Best Time to Buy and Sell Stock 1
 *
 * Say you have an array for which the `i`th element
 * is the price of a given stock on day i.
 *
 * If you were only permitted to complete at
 * most one transaction (i.e., buy one and sell one share of the stock),
 * design an algorithm to find the maximum profit.
 *
 * Note that you cannot sell a stock before you buy one.
 *
 * @example
 * Input: [7,1,5,3,6,4]
 * Output: 5
 * Explanation:
 * Buy on day 2 (price = 1)
 * Sell on day 5 (price = 6)
 * profit = 6-1 = 5.
 * Not 7-1 = 6, as selling price needs to be larger than buying price.
 *
 * @example
 * Input: [7,6,4,3,1]
 * Output: 0
 * Explanation: In this case, no transaction is done, i.e. max profit = 0.
 *
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
module.exports = function maxProfit( prices ) {
  if ( prices.length < 2 ) {
    return 0;
  }

  let maxProfit = 0,
    minPrice = prices[0];

  for ( let i = 1; i < prices.length; i++ ) {
    const price = prices[i];

    if ( price < minPrice ) {
      minPrice = price;
    }

    const profit = price - minPrice;

    if ( profit > maxProfit ) {
      maxProfit = profit;
    }
  }

  return maxProfit;
};
