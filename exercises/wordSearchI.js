/**
 * Word Search I
 *
 * Given a 2D board and a word,
 * find if the word exists in the grid.
 *
 * The word can be constructed from letters of sequentially adjacent cell,
 * where 'adjacent' cells are those horizontally or vertically neighboring.
 * The same letter cell may not be used more than once.
 *
 * @example
 * board =
 * [
 *  ['A', 'B', 'C', 'E'],
 *  ['S', 'F', 'C', 'S'],
 *  ['A', 'D', 'E', 'E'],
 * ]
 *
 * Given word = 'ABCCED', return true
 * Given word = 'SEE', return true
 * Given word = 'ABCB', return false
 *
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
module.exports = function wordSearch( board, word ) {
  const rows = board.length,
    cols = board[0].length,
    boardSize = rows * cols,
    wordSize = word.length,
    firstChar = word[0];

  if ( boardSize < wordSize ) {
    return false;
  }

  for ( let r = 0; r < rows; r++ ) {
    for ( let c = 0; c < cols; c++ ) {
      const curChar = board[r][c];

      if ( curChar === firstChar && canWalk( r, c, 0 ) ) {
        return true;
      }

    }
  }

  return false;


  /**
   * Explore until no path or end of word reached.
   */
  function canWalk( R, C, i ) {
    if ( i === wordSize ) {
      return true;
    }

    if ( !isBoard( R, C ) || !isChar( i, R, C ) ) {
      return false;
    }

    // Ensure we don't reuse letter
    board[R][C] = null;

    // DFS each possible move
    // If any paths completed word, return true
    for ( const [r, c] of getMoves( R, C ) ) {
      if ( canWalk( r, c, i + 1 ) ) {
        return true;
      }
    }

    // Backtrack
    board[R][C] = word[i];
    return false;
  }

  /**
   * Validate row, column exists on board.
   */
  function isBoard( r, c ) {
    return r >= 0
      && c >= 0
      && r < rows
      && c < cols;
  }

  /**
   * Checks if char on board matches char at word position.
   */
  function isChar( i, r, c ) {
    return board[r][c] === word[i];
  }

  /**
   * Returns possible moves from position:
   * right, left, down, up
   */
  function getMoves( r, c ) {
    return [
      [r, c+1],
      [r, c-1],
      [r+1, c],
      [r-1, c],
    ];
  }

};

/*
    0 1 2
    -----
0 | C A A
1 | A A A
2 | B C D

'AAB'

i:0='A' -> 0,1 ['01', ]
i:1='A' -> 0,2 ['01', '02']
i:2='B' -> X ['01', ]
i:1='A' -> 1,1 ['01', '11']
i:2='B' -> X ['01',]
i:1='A' -> X [ ] -> next

-------
...0,2
-------

i:0='A' -> 1,0 ['10',]
i:1='A' -> 1,1 ['10', '11']
i:2='B' -> X ['10', ]
i:1='A' -> X [ ] -> next

-------

i:0='A' -> 1,1 ['11', ]
i:1='A' -> 1,2 ['11', '12',]
i:2='B' -> X ['11', ]
i:1='A' -> 0,1 ['11', '01']
i:2='B' -> 2,0 ['10', '01', '20']
i:3 -> return true

*/
