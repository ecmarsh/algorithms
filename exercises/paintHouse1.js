/**
 * @lc id=256 lang=javascript tag=dp
 *
 * [256] Paint House
 *
 * There are a row of n houses, each house can be painted with one of
 * the three colors: red, blue or green. The cost of painting each house
 * with a certain color is different. You have to paint all the houses
 * such that no two adjacent houses have the same color.
 *
 * The cost of painting each house with a certain color is represented by
 * a n x 3 cost matrix. For example, costs[0][0] is the cost of painting
 * house 0 with color red; costs[1][2] is the cost of painting house 1
 * with color green, and so on... Find the minimum cost to paint all houses.
 *
 * @constraints
 * - All costs are positive integers.
 *
 * @example
 * Input: [[17,2,17],[16,16,5],[14,3,19]]
 * Output: 10
 * Explanation:
 *  Paint house 0 into blue, paint house 1 into green, paint house 2 into blue.
 *  Minimum cost: 2 + 5 + 3 = 10.
 *
 * @analysis
 * Brute Force: generate all permutations of house colors then remove invalid ones that have two side by side. From there, find the one with the lowest cost. O(3^n) runtime.
 *
 * Brute Force w Recursion: Calculate the min cost at each level using a tree where root is the previous house that has two children, the other color combinations of the next house. At each level, take the min cost of its two children (bottom up). At the end, root node, is the answer. Time is O(2^n), the total number of permutations and O(n) space for run-time stack w recursion.
 *
 * Recursion with memoization: Recursive, but memoize the repeated calculations with a map, cutting down the time to O(n) since there are 3 colors -> 3*n sets of parameters so can't be more than 3*2*n searches in memoization. Paint cost run time is O(1) as a conditional, so 6*n -> O(n). Space becomes 3*2*n + n -> 12n -> O(n).
 *
 * Dynamic Programming: TODO
 */

const COLORS = [0, 1, 2];
// const [RED, GREEN, BLUE] = colors;

/**
 * @param {number[][]} costs
 * @return {number}
 */
module.exports = function minCost( costs ) {
  // TODO
};


/**
 * @param {number[][]} costs
 * @return {number}
 */
module.exports.recursiveWithMemo = function minCostRecursive( costs ) {
  if ( !costs || !costs.length ) return 0;

  // Houses where min cost with current color already calculated
  const memo = new Map();

  // Returns a stringed key from houseIndex and chosen color
  const houseColorKey = ( houseIndex, color ) => `${houseIndex}${color}`;

  const paintCost = function ( houseIndex, color ) {
    const k = houseColorKey( houseIndex, color );
    if ( memo.has( k ) ) return memo.get( k );

    let totalCost = costs[houseIndex][color];
    const isLastHouse = houseIndex === costs.length - 1;

    if ( !isLastHouse ) {
      // Colors that aren't the color of the previous house color
      const colorOptions = COLORS.filter( ( c ) => c !== color );
      const nextHouse = houseIndex + 1;
      totalCost += Math.min( ...colorOptions.map( ( c ) => paintCost( nextHouse, c ) ) );
    }

    memo.set( k, totalCost );
    return totalCost;
  };

  const startHouse = 0;
  return Math.min( ...COLORS.map( ( color ) => paintCost( startHouse, color ) ) );
};

