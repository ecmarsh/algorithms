/**
 * Game Of Life (Dropbox)
 *
 * Given a board with m by n cells, each cell has an initial state:
 * live (1) or dead (0).
 *
 * Each cell interacts with its eight neighbors (horizontal, vertical, diagonal)
 * using the following four rules:
 * 1. Any live cell with fewer than two live neighbors dies.
 * 2. Any live cell with two or three live neighbors lives.
 * 3. Any live cell with more than three live neighbors dies.
 * 4. Any dead cell with exactly three live neighbors becomes a live cell.
 *
 * Write a function to compute the next state (after one update)
 * of the board given its current state.
 * The next state is created by applying the above rules
 * _simultaneously_ to every cell in the current state.
 *
 * @example
 * Input:
 * [
 *  [0,1,0],
 *  [0,0,1],
 *  [1,1,1],
 *  [0,0,0]
 * ]
 * Output: [
 *   [0,0,0],
 *   [1,0,1],
 *   [0,1,1],
 *   [0,1,0]
 * ]
 *
 *
 * **Follow up**
 * 1. Could you solve it in-place? (ie O(1) space).
 * Remember that the board needs to be updated at the same time:
 * You must use cell's original values to other cells.
 *
 * Ans:
 * Done by using a different way to identify original state.
 * Still requires 2 iterations.
 *
 * 2. In this question, we represent the board using a 2D array.
 * In principle, the board is infinite, which would cause problems
 * when the active area encroaches the border of the array.
 * _How would you address these problems?_
 *
 * Ans:
 * It would be impossible to iterate a matrix that large
 * and impossible to store that matrix in memory.
 * The only way we could do this is if there were a finite state
 * of live cells, and we could keep space storage to (2 * col size)
 * at a time and keeping a reference to first live cell.
 * Then when applying updates we can check live cell and affected neighbors.
 * Storing the rest of matrix, especially if mostly dead would be a waste.
 *
 */

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
module.exports = function gameOfLife( board ) {
  const rows = board.length,
    cols = board[0].length;

  // Avoid the double iteration and neighbor checks
  // if there is absolutely NO chance any will live
  if ( cols * rows < 3 ) {
    for ( let r = 0; r < rows; r++ ) {
      for ( let c = 0; c < cols; c++ ) {
        board[r][c] = 0;
      }
    }
    return;
  }

  // Determine updates and mark accordingly
  for ( let r = 0; r < rows; r++ ) {
    for ( let c = 0; c < cols; c++ ) {
      const liveNeighbors = countLiveNeighbors( board, r, c ),
        isLive = checkIsLive( board, r, c );

      if ( !isLive && liveNeighbors === 3 ) {
        board[r][c] += 2; // was dead, now live = 2
      }
      else if ( isLive && ( liveNeighbors < 2 || liveNeighbors > 3 ) ) {
        board[r][c] -= 2; // was live, now dead = -1
      }
    }
  }

  // Apply the updates based on markings
  for ( let r = 0; r < rows; r++ ) {
    for ( let c = 0; c < cols; c++ ) {
      if ( board[r][c] > 0 ) {
        board[r][c] = 1;
      }
      else {
        board[r][c] = 0;
      }
    }
  }

  /*
     No need to return anything
     since modifying in place
   */
};

/**
 * Counts the number of alive neighbors up to 4.
 */
const countLiveNeighbors = ( board, r, c ) => {
  let liveNeighbors = 0;

  for ( const [i, j] of getMoves( r, c ) ) {
    if ( checkIsLive( board, i, j ) ) {
      liveNeighbors++;
      // Once we pass 3, no need to check anymore
      if ( liveNeighbors === 4 ) {
        return liveNeighbors;
      }
    }
  }

  return liveNeighbors;
};

/**
 * Returns boolean on whether cell is alive.
 * If it is off the board, it is dead.
 */
/* eslint-disable arrow-body-style */
const checkIsLive = ( board, i, j ) => {
  return i >= 0 && i < board.length
      && j >= 0 && j < board[0].length
      && Math.abs( board[i][j] ) === 1;
};

/**
 * Calculates coordinates of
 * a cell's 8 neighbors on board.
 */
const getMoves = ( r, c ) => {
  /* eslint-disable array-bracket-spacing */
  return [
    [ r-1, c-1 ],
    [ r-1, c   ],
    [ r-1, c+1 ],
    [ r,   c-1 ],
    [ r,   c+1 ],
    [ r+1, c-1 ],
    [ r+1, c   ],
    [ r+1, c+1 ],
  ];
};

/*

Choices:
  (0) dead
  (1) live

- Neighbors include diagonal (8 total)

Rules:
  - if live && (< 2)liveNeighbors || (>3liveNeighbors)
      live->dead -> -1 = (-2)
  - ie if live && (2 || 3) liveNeighbors
       live->live (do nothing);
  - if dead && (=3), liveNeighbors,
       dead->live -> +2=2 (+2)

...i.e only way you live is 3 neighbors or live already and 2

Updated rules with set cells:
  - Live if: | +-val | === 1

Second iteration updates:
  - > 0 = 1
  - <= (else) = 0

Goal:
  - Compute next state of the board given current state
    - **After ONE update**
  - To create next state,
      apply rules **simultaneously** to every cell in
      current state, (births/deaths simultaneous)

Board:
   m*[n*[]]

Initial
----------
 0 1 0
 0 0 1
 1 1 1
 0 0 0

Live Count
----------
 1 1 2
 3 5 3
 1 3 2
 2 3 2

After Marking
------------
 0-1 0
 2 0 2
-1 1 1
 0 2 0

After Updates
(>0 ? 1 : 0)
------------
 0 0 0
 1 0 1
 0 1 1
 0 1 0

*/
