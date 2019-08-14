/**
 * Letter Combinations of a Phone Number
 *
 * Given a string containing digits from 2-9 inclusive,
 * return all possible letter combinations that the number could represent.
 *
 * A mapping of digit to letters (just like on the telephone buttons)
 * is given below. Note that 1 does not map to any letters.
 *
 * The Phone Image
 * 1: null 2: abc  3: def
 * 4: ghi  5: jkl  6. mno
 * 7: pqrs 8: tuv  9. yxz
 *
 * @example
 * Input: '23'
 * Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]. (any order)
 *
 * Analysis
 * N = # of 3 letter digit mappings, M = # of 4, where N+M=total digits.
 * Time: O(N^3 * M^4) to list all combinations of permutations.
 * Space: O(N^3 * M^4) for output array.
 *
 */

/**
 * @param {string} digits
 * @return {string[]}
 */
module.exports = function letterCombinations( digits ) {
  if ( !digits ) {
    return [];
  }

  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };


  const letters = [],
    output = [];

  for ( const digit of digits ) {
    letters.push( map[digit] );
  }

  const combine = ( mapping, combo ) => {
    if ( combo.length === digits.length ) {
      output.push( combo );
    }
    else {
      for ( let i = 0; i < mapping.length; i++ ) {
        combine(
          letters[combo.length+1],
          combo + letters[combo.length][i]
        );
      }
    }
  };

  combine( letters[0], '' );

  return output;
};


/*

'567'
({ghi}{jkl}{mnop})
({3^1}{3^1}{4^1})
=3!/1!*3!/1!*4!/1! = 36

VISUAL

             0
         /   |   \
        0    1     2
      /      |      \
0 1 2 3   0 1 2 3   0 1 2 3
-----------------------------
  0 0 0    0 1 0     0 2 0
  0 0 1    0 1 1     0 2 1
  0 0 2    0 1 2     0 2 2
  0 0 3    0 1 3     0 2 3

     ... for 1 @ root
     ... for 2 @ root

*/
