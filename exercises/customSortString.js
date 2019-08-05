/**
 * Custom Sort String
 *
 * `S` and `T` are strings composed of lowercase letters.
 * In `S`, no letters occurs more than once.
 *
 * `S` was sorted in some custom order previously.
 * We want to permute the characters of `T` to match the sort order of `S`.
 * I.e if 'x' occurs before 'y' in `S`,
 * then 'x' should occur before 'y' in the returned permutation.
 *
 * Return any permutation of `T` (as a string) that satisfies this property.
 *
 * @example
 * Input: S = 'cba', T = 'abcd'
 * Output: 'cbad'
 * Explanation:
 * 'a', 'b', and 'c' appear in S, so the order of 'a','b','c' should
 * match the order of S: 'c', 'b', 'a'.
 * Since 'd' does not appear in S, it can be in any position in T.
 * ie 'dcba', 'cdba', 'cbda' are also valid outputs.
 *
 * Constraints:
 * - `S` has at most length 26, and no character is repeated.
 * - `T` has length at most 200.
 * - `S` and `T` consist of lowercase letters only.
 *
 */

/**
 * @param {string} S
 * @param {string} T
 * @return {string}
 */
module.exports = function customSortString( S, T ) {
  const counts = {};

  for ( const char of T ) {
    counts[char] = counts[char]+1 || 1;
  }

  const perm = [];
  for ( const char of S ) {
    if ( char in counts ) {
      perm.push( char.repeat( counts[char] ) );
      delete counts[char];
    }
  }

  for ( const char in counts ) {
    perm.push( char.repeat( counts[char] ) );
  }

  return perm.join( '' );
};
