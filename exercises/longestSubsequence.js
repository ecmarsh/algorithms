/**
 * Longest Common Subsequence
 *
 * Given two strings s1 and s2,return the length of their longest common subseq.
 *
 * A subsequence of a string is a new string generated from the original string
 * with some characters(can be none) deleted without changing the relative
 * order of the remaining characters.
 * (eg, "ace" is a subsequence of "abcde" while "aec" is not).
 * A common subsequence of two strings is a
 * subsequence that is common to both strings.
 *
 * If there is no common subsequence, return 0.
 *
 * @example
 * Input: 'abcde', 'ace'
 * Output: 3
 * Explanation: Longest subsequence is "ace" with length 3
 *
 * @example
 * Input: 'abc', 'def'
 * Output: 0
 * Explanation: There is no common subsequence
 */

module.exports = function longestCommonSubsequence( s1, s2 ) {
  const [rows, cols] = [s1.length + 1, s2.length + 1]; // +1 for ""
  const matrix = makeMatrix( rows, cols );

  for ( let r = 1; r < rows; r++ ) {
    for ( let c = 1; c < cols; c++ ) {
      const currChar = {
        s1: s1[r-1],
        s2: s2[c-1],
      };
      const cellValue = {
        upLeft: matrix[r-1][c-1],
        left: matrix[r-1][c],
        up: matrix[r][c-1],
      };

      if ( currChar.s1 === currChar.s2 ) {
        setCellValue( matrix, r, c, 1 + cellValue.upLeft );
      }
      else {
        const currLongest = Math.max( cellValue.left, cellValue.up );
        setCellValue( matrix, r, c, currLongest );
      }
    }
  }

  const lcsLength = matrix[rows - 1][cols - 1];
  return lcsLength;
};

function makeMatrix( r, c ) {
  return Array( r ).fill( 0 ).map( rows => Array( c ).fill( 0 ) );
}

function setCellValue( matrix, r, c, val ) {
  matrix[r][c] = val;
}

/*

     'abcde' <--> 'ace'
 ---------------------------

    | '' | 'a' | 'c' | 'e'
    -----------------------
''  | 0  |  0  |  0  |  0
'a' | 0  |  1  |  0  |  0
'b' | 0  |  0  |  1  |  0
'c' | 0  |  0  |  2  |  2
'd' | 0  |  0  |  2  |  2
'e' | 0  |  0  |  2  | *3* <--LCS

 ---------------------------
currCell =
  char[row] === char[col]
    ? 1 + upperLeftCell
    : max(leftCell, upCell)

Note: Can save some memory by only storing prev row & prev col for lookups.
*/
