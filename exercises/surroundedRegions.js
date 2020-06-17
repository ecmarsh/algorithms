/**
 * @lc id=130 lang=javascript tag=dfs
 *
 * [130] Surrounded Regions
 *
 * Given a 2D board containing 'X' and 'O' (the letter O),
 * capture all regions surrounded by 'X'.
 *
 * A region is captured by flipping all 'O's into 'X's
 * in that surrounded region.
 *
 * @example
 * Board:
 *  X X X X
 *  X O O X
 *  X X O X
 *  X O X X
 * After running function, board should be:
 *  X X X X
 *  X X X X
 *  X X X X
 *  X O X X
 * Explanation:
 * Surrounded regions shouldn’t be on the border, which means that any
 * 'O' on the border of the board are not flipped to 'X'. Any 'O'
 * that is not on the border and it is not connected to an 'O'
 * on the border will be flipped to 'X'. Two cells are connected if they
 * are adjacent cells connected horizontally or vertically.
 *
 * @complexity
 * Time: O(M x N) -> limited by last loop through on board
 * Space: O(M x N) worst case recursive space if one O on border and everything
 * inside of the board is O, has to DFS through entire board.
 */

/**
 * @param {string[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
module.exports = function flipSurroundedRegions( board ) {
  if ( !board || !board.length || !board[0].length ) return;

  const rows = board.length;
  const cols = board[0].length;

  // Ensure consistent constants
  const val = {
    X: 'X',
    O: 'O',
    connectedO: 'o',
  };

  // Mark marks a cell as connected to a boarding 'O', so it should not be flipped.
  const mark = ( x, y ) => {
    // Outside of board or on edge
    if ( x <= 0 || x >= ( rows-1 ) || y <= 0 || y >= ( cols-1 ) ) return;

    // If previously marked or its an X, dont do anything
    if ( board[x][y] === val.X || board[x][y] === val.connectedO ) return;

    //  Cell must be 'O', and since its being called, its connected
    board[x][y] = val.connectedO;

    // Mark its neighbors
    markNeighbors( x, y );
  };

  const moves = [[-1,0], [1,0], [0,-1], [0,1]];

  const markNeighbors = ( x, y ) => {
    moves.forEach( ( [dx, dy] ) => {
      mark( x + dx, y + dy );
    } );
  };

  // Go through borders and mark anything connected to bordering 'O'

  // Row 1
  board[0].forEach( ( cell, c ) => {
    if ( cell === val.O ) {
      markNeighbors( 0, c );
    }
  } );

  // Last Row
  board[rows-1].forEach( ( cell, c ) => {
    if ( cell === val.O ) {
      markNeighbors( rows-1, c );
    }
  } );

  // First col and last call (note first row and last row handled already)
  for ( let r = 1; r < ( rows-1 ); r++ ) {
    if ( board[r][0] === val.O ) {
      markNeighbors( r, 0 );
    }
    if ( board[r][cols-1] === val.O ) {
      markNeighbors( r, cols-1 );
    }
  }

  // Leave anything labeled as connected to bordering 'O'
  // as 'O' and anything else as 'X'
  for ( let r = 1; ( r < board.length-1 ); r++ ) {
    for ( let c = 1; c < ( board[0].length -1 ); c++ ) {
      if ( board[r][c] === val.connectedO ) {
        board[r][c] = val.O;
      } else {
        board[r][c] = val.X;
      }
    }
  }
};
