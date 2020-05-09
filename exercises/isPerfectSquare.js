/**
 * @lc id=367 lang=javascript tag=math,binarysearch,binsearch
 *
 * [367] Is Valid Perfect Square
 *
 * Given a positive integer x, write a function which
 * returns True if x is a perfect square else False.
 *
 * @constraints
 * - x > 0
 * - Do not use any built-in library function such as sqrt.
 *
 * @example
 * Input: 16
 * Output: true
 *
 * @example
 * Input: 14
 * Output: true
 *
 * @complexity
 * Time: O(log n) -> Binary search from (0..n/2]
 * Space: O(1)
 */

/**
 * @param {number} x
 * @return {boolean}
 */
module.exports = function isValidPerfectSquare( x ) {
  let lo = 1; // lowest square root of positive number
  let hi = ( x >> 1 ) + 1; // square root never greater than ceil(x/2)

  while ( lo <= hi ) {
    const mid = ( hi + lo ) >> 1;
    const sq = mid * mid;
    if ( sq === x ) {
      return true;
    }
    if ( sq > x ) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return false;
};

/**
 * @param {number} num
 * @return {boolean}
 * @complexity
 * Time: O(log n) -> practically fastest solution
 * Space: O(1)
 */
module.exports.newtons = function ( num ) {
  if ( num < 2 ) return true;

  let x = num / 2;
  while ( x * x > num ) {
    x = ( x + num / x ) / 2;
  }
  return ( x * x == num );
};
