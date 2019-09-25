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
 * Analysis (Optimal Solution)
 * N = rows (matrix.length). M = cols (matrix[i].length) where 0 <= i < N
 * Time: O(N * (M + M)) = O(N * M)
 * Space: O(M) Heights histogram for each col.
 *
 */

/**
 * @param {string[][]} matrix
 * @return {number}
 */
module.exports.optimal = function maxRectangle( matrix ) {
  if ( !matrix || !matrix.length || !matrix[0].length ) {
    return 0;
  }

  const dp = Array( matrix[0].length ).fill( 0 );
  let maxArea = 0;

  for ( let r = 0; r < matrix.length; r++ ) {
    for ( let c = 0; c < matrix[0].length; c++ ) {
      dp[c] = matrix[r][c] === '1' ? dp[c] + 1 : 0;
    }
    maxArea = Math.max( maxArea, getMaxFromHistogram( dp ) );
  }

  return maxArea;
};

/**
 * See https://leetcode.com/problems/largest-rectangle-in-histogram/
 * @param {number[]} heights
 * @return {number}
 */
function getMaxFromHistogram( heights ) {
  const s = [-1];
  s.peek = () => s[s.length -1];

  let maxArea = 0;
  const updateMaxArea = ( col ) => {
    const height = heights[s.pop()];
    const width = col - s.peek() - 1;
    maxArea = Math.max( maxArea, width * height );
  };

  heights.forEach( ( height, i ) => {
    while ( s.peek() !== -1 && heights[s.peek()] >= height ) {
      updateMaxArea( i );
    }
    s.push( i );
  } );

  // Repeat for final row
  while ( s.peek() !== -1 ) {
    updateMaxArea( heights.length );
  }

  return maxArea;
}

/**
 * Brute Force Analysis:
 * _See optimal analysis variable definitions_
 * Time: O(N^2 * M) Standard matrix traversal with addition of second row pass
 * Space: O(N * M) DP table with max widths.
 */
module.exports.bruteForce = function maxRectangleBrute( matrix ) {
  if ( !matrix || !matrix.length || !matrix[0].length ) {
    return 0;
  }

  const rows = matrix.length;
  const cols = matrix[0].length;
  const dp = Array( rows ).fill( 0 ).map( ( _ ) => Array( cols ).fill( 0 ) );
  let maxArea = 0;

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
