/**
 * Number of Islands: Land & Water
 *
 * Given a 2d grid map of '1's (land) and '0's (water),
 * count the number of islands. An island is surrounded by water
 * and is formed by connecting adjacent lands horizontally or vertically.
 * You may assume all four edges of the grid are all surrounded by water.
 *
 * @example
 * Input:
 * 11110
 * 11010
 * 11000
 * 00000
 *
 * Output: 1
 *
 * @example
 * Input:
 * 11000
 * 11000
 * 00100
 * 00011
 *
 * Output: 3
 *
 */


/**
 * @param {character[][]} grid
 * @return {number}
 */
module.exports = function numIslands( grid ) {
  if ( !grid || !grid.length ) {
    return 0;
  }

  const rows = grid.length,
    cols = grid[0].length,
    land = '1';
  let numIslands = 0;

  for ( let r = 0; r < rows; ++r ) {
    for ( let c = 0; c < cols; ++c ) {
      if ( grid[r][c] === land ) {
        ++numIslands;
        markLandNeighborsAsWater( grid, r, c );
      }
    }
  }

  return numIslands;
};

function markLandNeighborsAsWater( grid, r, c ) {
  const rows = grid.length,
    cols = grid[0].length,
    water = '0',
    isWater = r < 0 || c < 0
        || r >= rows || c >= cols
        || grid[r][c] === water;

  if ( isWater ) {
    return;
  }

  grid[r][c] = water;

  markLandNeighborsAsWater( grid, r-1, c ); // UP
  markLandNeighborsAsWater( grid, r+1, c ); // DOWN
  markLandNeighborsAsWater( grid, r, c-1 ); // LEFT
  markLandNeighborsAsWater( grid, r, c+1 ); // RIGHT
}
