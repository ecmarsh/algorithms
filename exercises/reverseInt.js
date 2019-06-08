/**
 * Reverse a 32-bit signed integer
 * If overflow, return 0
 * @param {number} x
 * @return {number} y
 *
 * Example:
 * Input: 123
 * Output: 321
 *
 * Input: -123
 * Output: -321
 *
 * Input: 123456789
 * Output: 0
 */

module.exports = function reverseInteger( x ) {
  const sign = x < 0 ? -1 : 1;
  x *= sign; // Math.abs

  let y = 0;
  do {
    y*=10; // Increase rvs base
    y+=x%10; // Add at current base
    x= 0|x/10; // Decrease x base
  } while ( x > 0 ); // Until all places handled

  // Handle overflow
  if ( y > 2**31 ) {
    return 0;
  }

  return y * sign;
};
