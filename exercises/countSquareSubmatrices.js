/**
 * @lc id=1277 lang=javascript tag=dp,matrix
 *
 * [1277] Count Square Submatrices With All Ones
 *
 * Given a m * n matrix of ones and zeros,
 * return how many square submatrices have all ones.
 *
 * @constraints
 * - `1 <= arr.length <= 300`
 * - `1 <= arr[0].length <= 300`
 * - `0 <= arr[i][j] <= 1`
 *
 * @example
 * Input: matrix =
 * [
 *  [0,1,1,1],
 *  [1,1,1,1],
 *  [0,1,1,1]
 * ]
 * Output: 15
 * Explanation:
 *  There are 10 squares of side 1.
 *  There are 4 squares of side 2.
 *  There is  1 square of side 3.
 *  Total number of squares = 10 + 4 + 1 = 15.
 *
 * @example
 * Input: matrix =
 * [
 *  [1,0,1],
 *  [1,1,0],
 *  [1,1,0]
 * ]
 * Output: 7
 * Explanation:
 *  - There are 6 squares of side 1.
 *  - There is 1 square of side 2.
 *  - Total number of squares = 6 + 1 = 7.
 *
 * @complexity
 * Time: O(m * n)
 * Space: O(1)
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
module.exports = function countSquares( matrix ) {
  let count = 0;

  const rows = matrix.length;
  const cols = matrix[0].length;

  // The max square at the bottom right corner is
  // the biggest square we can make left or right w diagagonal
  // Plus 1 to account for the current square.
  for ( let r = 0; r < rows; r++ ) {
    for ( let c = 0; c < cols; c++ ) {
      if ( matrix[r][c] > 0 && r > 0 && c > 0 ) {
        const maxX = matrix[r-1][c];
        const maxY =  matrix[r][c-1];
        const maxDiag = matrix[r-1][c-1];
        const maxSquare = 1 + Math.min(
          maxDiag,
          Math.min( maxX, maxY ),
        );
        matrix[r][c] = maxSquare;
      }
      count += matrix[r][c];
    }
  }

  return count;
};
