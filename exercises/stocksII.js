/**
 * Buy and Sell Stocks II
 *
 * Say you have an array for which the i-th element
 * is the price of a given stock on day i.
 *
 * Design an algorithm to find the maximum profit.
 * You may complete at most two transactions.
 *
 * Note: You may not engage in multiple transactions at the same time
 * (i.e., you must sell the stock before you buy again).
 *
 * @example
 * Input: [3,3,5,0,0,3,1,4]
 * Output: 6
 * Explanation:
 * 1st. Buy on day 4 (price=0) and sell on day 6 (price=3). Profit=3.
 * 2nd. Buy on day 7 (price=1) and sell on day 8 (price=4). Profit=3.
 * Max total profit = 3+3=6.
 *
 * @example
 * Input: [1,2,3,4,5]
 * Output: 4
 * Explanation:
 * 1st: Buy on day 1 (price=1), sell on day 5 (price=5). Profit=4.
 * 2nd. None. You cannot engage in multiple transactions at the same time.
 * Max Total profit = 4+0=4.
 *
 * @example
 * Input: [7,6,4,3,1]
 * Output: 0
 * Explanation: No transaction is done. i.e max profit = 0.
 *
 * Analysis:
 * Time: O(n) <-- n is number of prices. Iterate prices twice.
 * Space: O(n) <-- Store first transaction max total profit.
 *
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
module.exports = function maxProfit( prices ) {
  const days = prices.length;
  let maxTotalProfit = 0;

  let greedyMinPrice = prices[0];
  const firstBuySellProfits = [maxTotalProfit];
  // Iterate forward, recording max profit for sell on that day.
  for ( let day = 1; day < days; day++ ) {
    greedyMinPrice = Math.min( greedyMinPrice, prices[day] );

    const profitIfSoldToday = prices[day] - greedyMinPrice;
    maxTotalProfit = Math.max( maxTotalProfit, profitIfSoldToday );
    firstBuySellProfits[day] = maxTotalProfit;
  }

  let greedyMaxPrice = -Infinity;
  // Iterate backward, finding max profit if sold on that day.
  for ( let day = days - 1; day > 0; day-- ) {
    greedyMaxPrice = Math.max( greedyMaxPrice, prices[day] );

    const profitIfSoldToday = greedyMaxPrice - prices[day],
      totalProfitIfSoldToday = profitIfSoldToday + firstBuySellProfits[day-1];
    maxTotalProfit = Math.max( maxTotalProfit, totalProfitIfSoldToday );
  }

  return maxTotalProfit;
};

/**
 * Follow-Up: Can you do it on O(1) space?
 */
module.exports.maxProfitVariant = function maxProfitVariant( prices ) {
  let firstBuy = Infinity,
    firstProfit = 0,
    secondBuy = Infinity,
    totalProfit = 0;

  for ( const price of prices ) {
    firstBuy = Math.min( firstBuy, price );
    firstProfit = Math.max( firstProfit, price - firstBuy );
    secondBuy = Math.min( secondBuy, price - firstProfit );
    totalProfit = Math.max( totalProfit, price - secondBuy );
  }

  return totalProfit;
};
