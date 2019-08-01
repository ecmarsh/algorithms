/**
 * 36. Valid Sudoku
 *
 * Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be
 * validated according to the following rules:
 *
 * Each row must contain the digits 1-9 w/o repetition.
 * Each column must contain the digits 1-9 w/o repetition.
 * Each of the 9 3x3 sub-boxes of the grid must contain 1-9 w/o repetition.
 *
 * The Sudoku board could be partially filled, 
 * where empty cells are filled with the character '.'.
 *
 * @example
 *
 * Input:
 * [
 *  ["5","3",".",".","7",".",".",".","."],
 *    ["6",".",".","1","9","5",".",".","."],
 *    [".","9","8",".",".",".",".","6","."],
 *    ["8",".",".",".","6",".",".",".","3"],
 *    ["4",".",".","8",".","3",".",".","1"],
 *    ["7",".",".",".","2",".",".",".","6"],
 *    [".","6",".",".",".",".","2","8","."],
 *    [".",".",".","4","1","9",".",".","5"],
 *    [".",".",".",".","8",".",".","7","9"]
 * ]
 * Output: true
 *
 * Input: Same as above, but [0][0] is 8.
 * Output: false
 * Explanation: Since there are two 8's in the top left sub-box, it is invalid.
 *
 */


/**
 * @param {character[][]} board
 * @return {boolean}
 */
module.exports = function isValidSudoku( board ) {
  const size = board.length,
    rows = makeMap( size ),
    cols = makeMap( size ),
    boxes = makeMap( size );

  for ( let r = 0; r < size; r++ ) {
    for ( let c = 0; c < size; c++ ) {
      const num = board[r][c];

      if ( num === '.' ) {
        continue;
      }

      const sqrt = Math.sqrt( board.size );
      const b = ( r / sqrt | 0 ) + sqrt * ( c / sqrt | 0 );

      if ( num in boxes[ b ] ) {
        return false;
      }
      if ( num in rows[ r ] ) {
        return false;
      }
      if ( num in cols[ c ] ) {
        return false;
      }

      rows[r][num] = true;
      cols[c][num] = true;
      boxes[b][num] = true;
    }
  }

  return true;
};

function makeMap( size ) {
  return Array( size ).fill( 0 ).map( () => ( {} ) );
}
