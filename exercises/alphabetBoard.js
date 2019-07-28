/**
 * Alphabet Board Path
 * Weekly Contentest 147
 * Runtime: 49ms | Memory 33.9MB
 *
 * On an alphabet board, we start at position (0, 0),
 * corresponding to character board[0][0].
 * Here, board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"].
 *
 * We may make the following moves:
 *
 * 'U' moves our position up one row, if the square exists;
 * 'D' moves our position down one row, if the square exists;
 * 'L' moves our position left one column, if the square exists;
 * 'R' moves our position right one column, if the square exists;
 * '!' adds the character board[r][c] at our current position (r, c) to the answer.
 * Return a sequence of moves that makes our answer equal to target in the minimum number of moves. You may return any path that does so.
 *
 * @example
 * Input: target = "leet"
 * Output: "DDR!UURRR!!DDD!"
 *
 * @example
 * Input: target = "code"
 * Output: "RR!DDRR!UUL!R!
 *
 * @param {string} target
 * @return {string}
 *
 */

/**  12345
97  [abcde]
102 [fghij]
107 [klmno]
112 [pqrst]
117 [uwxyz]
122 [z]
*/

module.exports = function alphabetBoardPath( target ) {
  const res = [];
  const a = 'a'.charCodeAt( 0 );
  let prev = a, i = 0;

  for ( i; i < target.length; i++ ) {
    const cur = target.charCodeAt( i );

    if ( cur === prev ) {
      res.push( '!' );
      continue;
    }

    let r = '', horz, vert, cols, rows;

    const moveHorizontally = () => {
      cols = ( ( cur - a ) % 5 ) - ( ( prev - a ) % 5 );
      horz = cols > 0 ? 'R' : 'L';
      r += horz.repeat( Math.abs( cols ) );
    };

    const moveVertically = () => {
      rows = ( ( prev - a ) / 5 | 0 ) - ( ( cur - a ) / 5 | 0 );
      vert = cur - prev > 0 ? 'D' : 'U';
      r += vert.repeat( Math.abs( rows ) );
    };

    if ( cur === 'z'.charCodeAt( 0 ) ) {
      moveHorizontally();
      moveVertically();
    } else {
      moveVertically();
      moveHorizontally();
    }

    r += '!';
    res.push( r );

    prev = cur;
  }
  return res.join( '' );
};
