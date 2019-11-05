/**
 * @lc id=120 lang=javascript tag=dp
 *
 * [120] Triangle Minimum Path Sum
 *
 * Given a triangle, find the minimum path sum from top to bottom.
 * Each step, you may move to adjacent numbers on the row below.
 *
 * @example
 * Input: triangle=
 * [
 *     [2],
 *    [3,4],
 *   [6,5,7],
 *  [4,1,8,3]
 * ]
 * Output: 11
 * Explanation: Min path sum from top to bottom is 2+3+5+1=11.
 *
 * @complexity
 * n = rows in triangle (and also longest array in triangle)
 * Time: O(n^2) We check each value in each row of the triangle.
 * Space: O(n) We only store the previous row path sum to update current row.
 */

/**
 * @param {number[][]} triangle
 * @return {number}
 */
module.exports = function triangleMinPathSum( triangle ) {
  let minSumToCurrRow = triangle[0];

  for ( let i = 1; i < triangle.length; i++ ) {
    const n = i; // length of prev row
    const minSumAtCurrRow = triangle[i];
    // choose the min path to current row from prev row's
    // adjacent options, which hold their min path sum.
    // note that at end indices, there is only one option,
    // which we keep in bounds by using max(0, i-1), and min(i, prevLast)
    minSumAtCurrRow.forEach( ( val, i ) => {
      minSumAtCurrRow[i] += Math.min(
        minSumToCurrRow[i > 0 ? i-1 : 0],
        minSumToCurrRow[i < n ? i : n-1],
      );
    } );
    // update minPathSums for next row.
    minSumToCurrRow = minSumAtCurrRow;
  }

  // choose the minimum path to end row.
  return Math.min( ...minSumToCurrRow );
};

/*

Implementation:
For each row, store the minimum path sum to current
    Each val in row, can either take minimum of [j] or [j-1],
    corresponding to the previous row ajdacent indices.
Return the minimum sum of the last row

Note we don't need to store more than than the previous row,
since that row accounts for the minimum path sum to the current point.

Complexity:
For each row, for each value, O(1) to calculate min path sum (compare for min),
so 1 + 2 + ... + n = n(n+1)/2 elements --> O(n)^2 time
We hold the previous row and the current row at any time = 2n = O(N) space.

*/
