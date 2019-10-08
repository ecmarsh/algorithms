/**
 * Play With Chips
 * _Weekly Contest 157_
 *
 * There are some chips, and the i-th chip is at position chips[i].
 * There can be two or more chips at the same position initially.
 *
 * You can perform any of the two following types of moves
 * any number of times (possibly zero) on any chip:
 * - Move the i-th chip by 2 units to the left or to the right for cost 0
 * - Move the i-th chip by 1 unit to the left or to the right for cost 1
 *
 * Return the minimum cost needed to move all the chips to the same position (any position).
 *
 * Constraints:
 * - `1 <= chips.length <= 100`
 * - `1 <= chips[i] <= 10^9`
 *
 * @example
 * Input: chips = [1,2,3]
 * Output: 1
 * Explanation: Second chip will be moved to positon 3 with cost 1.
 *              First chip will be moved to position 3 with cost 0.
 *              Total cost is 1+0=1.
 * @example
 * Input: chips = [2,2,2,3,3]
 * Output: 2
 * Explanation: Both fourth and fifth chip will be moved to
 *              position two with cost 1.
 *              Total minimum cost will be 2.
 *
 * Analysis:
 * N is len(chips)
 * Time: O(N)
 * Space: O(1)
 */

/**
 * @param {number[]} chips
 * @return {number}
 */
module.exports = function minCostToMoveChips( chips ) {
  const odds = chips.reduce( ( acc, cur ) => acc + ( cur & 1 ), 0 );
  const evens = chips.length - odds;
  return Math.min( odds, evens );
};
