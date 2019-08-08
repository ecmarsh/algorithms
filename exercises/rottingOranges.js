/**
 * Rotting Oranges (Amazon)
 *
 * In a given grid, each cell can have one of three values:
 * 0. the value 0 representing an empty cell;
 * 1. the value 1 representing a fresh orange;
 * 2. the value 2 representing a rotten orange.
 *
 * Every minute, any fresh orange that is adjacent (4-directionally)
 * to a rotten orange becomes rotten.
 *
 * Return the minimum number of minutes that must elapse
 * until no cell has a fresh orange.
 *
 * If this is impossible, return -1 instead.
 *
 * @example
 * Input: [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 *
 * Input: [[2,1,1],[0,1,1],[1,0,1]]
 * Output: -1
 * Explanation: Orange in bottom left corner never rots.
 *
 * Input: [[0,2]]
 * Output: 0
 * Explanation: Since already no fresh, answer is just 0.
 *
 *
 * Constraints:
 * - 1 <= grid.length <= 10
 * - 1 <= grid[0].length <= 10
 * - grid[i][j] is only 0, 1, or 2
 *
 */

/**
 * @param {number[][]} grid
 * @return {number} min# of minutes until no fresh orange || -1
 */
module.exports = function orangesRotting( grid ) {
  const rows = grid.length,
    cols = grid[0].length,
    cameRotted = [];

  for ( let r = 0; r < rows; r++ ) {
    for ( let c = 0; c < cols; c++ ) {
      const orange = grid[r][c];
      isRotten( orange ) && offerFreshNeighbors( cameRotted, r, c );
    }
  }

  let minutes = 0,
    queue = cameRotted.length ? [cameRotted] : [];

  while ( queue.length ) {
    const currMinute = queue[0],
      nextMinute = [];

    for ( const {r, c} of currMinute ) {
      rot( {r,c} );
    }

    for ( const {r, c} of currMinute ) {
      offerFreshNeighbors( nextMinute, r, c );
    }

    minutes++;
    queue = nextMinute.length ? [nextMinute] : nextMinute;
  }

  for ( let r = 0; r < rows; r++ ) {
    for ( let c = 0; c < cols; c++ ) {
      if ( isFresh( {r,c} ) ) {
        return -1;
      }
    }
  }

  return minutes;

  function offerFreshNeighbors( arr, r, c ) {
    const left = {r, c: c-1},
      right = {r, c: c+1},
      up = {r: r-1, c},
      down = {r: r+1, c};

    isFresh( left ) && arr.push( left );
    isFresh( right ) && arr.push( right );
    isFresh( up ) && arr.push( up );
    isFresh( down ) && arr.push( down );
  }

  function isFresh( {r, c} ) {
    return grid[r] && grid[r][c] === 1;
  }

  function isRotten( val ) {
    return val === 2;
  }

  function rot( {r, c} ) {
    grid[r][c] = 2;
  }
};

/*
PSUEDO/NOTES

0: EMPTY
1: FRESH
2: ROTTEN

Each minute, NESW of rotten all rot.
If still fresh left, -1.

2 1 1
1 1 0
0 1 2

1 min

2 2 1
2 1 0
0 2 2

2 min

2 2 2
2 2 0
0 2 2

All Rotten -> 2 Mins
*/
/*
2 2
1 1
0 0
2 0

0 min

2 2
2 2
0 0
2 0
*/
