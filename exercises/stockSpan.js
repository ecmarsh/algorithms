/**
 * @lc id=901 lang=javascript tag=stack,amazon
 *
 * [901] Online Stock Span
 *
 * Write a class StockSpanner which collects daily price quotes for
 * some stock, and returns the span of that stock's price for the current day.
 *
 * The span of the stock's price today is defined as the maximum number
 * of consecutive days (starting from today and going backwards) for
 * which the price of the stock was less than or equal to today's price.
 *
 * For example, if the price of a stock over the next 7 days were
 * [100, 80, 60, 70, 60, 75, 85], then the stock spans would be
 * [1, 1, 1, 2, 1, 4, 6].
 *
 * @constraints
 * - Calls to StockSpanner.next(int price) will have 1 <= price <= 10^5.
 * - There will be at most 10000 calls to StockSpanner.next per test case.
 * - There will be at most 150000 calls to StockSpanner.next across all
 *   test cases.
 *
 * @example
 * Input:
 * ["StockSpanner","next","next","next","next","next","next","next"]
 * [[],[100],[80],[60],[70],[60],[75],[85]]
 *
 * Output:
 * [null,1,1,1,2,1,4,6]
 *
 * Explanation:
 * First, S = StockSpanner() is initialized.  Then:
 * S.next(100) is called and returns 1,
 * S.next(80) is called and returns 1,
 * S.next(60) is called and returns 1,
 * S.next(70) is called and returns 2,
 * S.next(60) is called and returns 1,
 * S.next(75) is called and returns 4,
 * S.next(85) is called and returns 6.
 * - Note that (for example) S.next(75) returned 4, because the last 4
 * prices (including today's price of 75) were less than or equal to
 * today's price.
 *
 * @complexity
 * Let N = number of calls to stock spanner
 * Time: O(N) for each next call, worst case if decreasing except last call
 * Space: O(N) worst case if decreasing price calls
 */

/*

Example:

["StockSpanner","next","next","next","next","next","next","next","next","next","next","next"]
[[],[100],[80],[60],[70],[60],[75],[85],[70],[60],[90],[70]]

[ [ 100, 1 ] ]
[ [ 100, 1 ], [ 80, 1 ] ]
[ [ 100, 1 ], [ 80, 1 ], [ 60, 1 ] ]
[ [ 100, 1 ], [ 80, 1 ], [ 70, 2 ] ]
[ [ 100, 1 ], [ 80, 1 ], [ 70, 2 ], [ 60, 1 ] ]
[ [ 100, 1 ], [ 80, 1 ], [ 75, 4 ] ]
[ [ 100, 1 ], [ 85, 6 ] ]
[ [ 100, 1 ], [ 85, 6 ], [ 70, 1 ] ]
[ [ 100, 1 ], [ 85, 6 ], [ 70, 1 ], [ 60, 1 ] ]
[ [ 100, 1 ], [ 90, 9 ] ]
[ [ 100, 1 ], [ 90, 9 ], [ 70, 1 ] ]

*/


/**
 * @constructor
 */
function StockSpanner() {
  this.stack = [];
}

/**
* @param {number} price
* @return {number}
*/
StockSpanner.prototype.next = function ( price ) {
  // Maintain a decreasing stack, where we're essentially collapsing
  // the min values seen and keeping track of the days.
  // This works because even if number is in between, it is lower
  // than prev day, so it would be 1.
  let span = 1;
  let top = this.stack[this.stack.length-1];
  while ( this.stack.length && top[0] <= price ) {
    span += this.stack.pop()[1];
    top = this.stack[this.stack.length-1];
  }
  this.stack.push( [price, span] );
  return span;
};

/**
* Your StockSpanner object will be instantiated and called as such:
* var obj = new StockSpanner()
* var param_1 = obj.next(price)
*/

module.exports = StockSpanner;
