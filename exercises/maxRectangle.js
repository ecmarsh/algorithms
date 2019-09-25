/**
 * Maximum Rectangle
 *
 * Given a 2D binary matrix filled with 0's and 1's,
 * find the area of the largest rectangle containing only 1's.
 *
 * @example
 * Input:
 * [
 *   ["1","0","1","0","0"],
 *   ["1","0",*1*,*1*,*1*],
 *   ["1","1",*1*,*1*,*1*],
 *   ["1","0","0","1","0"]
 * ]
 * Output: 6
 *
 */

/**
 * Brute Force Analysis:
 * N = rows (matrix.length). M = cols (matrix[i].length) where 0 <= i < N
 * Time: O(N^2 * M) Standard matrix traversal with addition of second row pass
 * Space: O(N * M) DP table with max widths.
 */
module.exports.bruteForce = function maxRectangleBrute( matrix ) {
  if ( !matrix || !matrix.length || !matrix[0].length ) {
    return 0;
  }

  let maxArea = 0;
  const rows = matrix.length;
  const cols = matrix[0].length;
  const dp = Array( rows ).fill( 0 ).map( ( _ ) => Array( cols ).fill( 0 ) );

  for ( let r = 0; r < rows; r++ ) {
    for ( let c = 0; c < cols; c++ ) {
      if ( matrix[r][c] === '1' ) {
        let maxWidth = c > 0 ? dp[r][c-1] + 1 : 1;
        dp[r][c] = maxWidth;
        for ( let h = r; h >= 0; h-- ) {
          maxWidth = Math.min( maxWidth, dp[h][c] );
          if ( maxWidth === 0 ) break;
          const curHeight = r - h + 1;
          maxArea = Math.max( maxArea, maxWidth * curHeight );
        }
      }
    }
  }

  return maxArea;
};
