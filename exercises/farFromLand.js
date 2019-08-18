/**
 * As Far From Land As Possible
 * _Weekly Contest 150 Submission_
 *
 * Given an N x N grid containing only values 0 and 1,
 * where 0 represents water and 1 represents land,
 * find a water cell such that its distance
 * to the nearest land cell is maximized and return the distance.
 *
 * The distance used in this problem is the Manhattan distance:
 * the distance between two cells (x0, y0) and (x1, y1)
 * is |x0 - x1| + |y0 - y1|.
 *
 * If no land or water exists in the grid, return -1.
 *
 * @example
 * Input: 101
 *        000
 *        101
 * Output: 2
 * Explanation: (1,1) is as far from land with dist of 2
 *
 * @example
 * Input: 100
 *        000
 *        000
 * Output: 4
 * Explanation: (1,2)
 *
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
module.exports = function maxDistance( grid ) {
  const rows = grid.length,
    cols = grid[0].length,
    size = rows * cols,
    q = [];

  if ( size === 1 )
    return -1;

  for ( let r = 0; r < rows; r++ )
    for ( let c = 0; c < cols; c++ )
      if ( grid[r][c] == '1' ) {
        grid[r][c] = -1;
        q.push( [r, c] );
      }

  if ( q.length === size || !q.length )
    return -1;

  let globalMax = -1,
    localMax = 1;
  while ( q.length ) {
    const size = q.length;
    for ( let i = 0; i < size; i++ ) {
      const [r, c] = q.shift();
      for ( const [x, y] of getWaterNeighbors( grid, r, c ) ) {
        grid[x][y] = localMax;
        q.push( [x, y] );
        globalMax = Math.max( localMax, globalMax );
      }
    }
    localMax++;
  }

  return globalMax;
};

const getWaterNeighbors = ( grid, r, c ) => {
  const moves = [];
  r > 0 && grid[r-1][c] === 0 && moves.push( [r-1,c] );
  c > 0 && grid[r][c-1] === 0 && moves.push( [r,c-1] );
  r < grid.length-1 && grid[r+1][c] === 0 && moves.push( [r+1,c] );
  c < grid[0].length-1 && grid[r][c+1] === 0 && moves.push( [r,c+1] );
  return moves;
};


/*
Goal: find max distance from land that water can be on cell.
Land = 1, water = 0
no land -> return -1
distance = |x1-x2| + |y1-y2|
grid is a square

1. Loop and store land in order
2. For each land
   2a. explore water neighbors one level at a time and mark farthest
   (farthest will always go one level deeper so get higher)
   2b take global max at each 0
3. Return global max

*/
