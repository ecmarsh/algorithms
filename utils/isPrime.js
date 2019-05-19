/**
 * Prime number
 * Positive integer with exactly two factors (itself & 1)
 *
 * [1,2*,3*,4,5*,6]
 * [7*,8,9,10,11*,12]
 * [13*,14,15,16,17*,18]
 * [19*,20,21,22,23*,24]
 * [25,26,27,28,29*,30]
 * [31*,32,33,34,35,36]
 * [37*,38,39,40,41*,42]
 *
 * Besides 2/3, primes multiples of 6 +||- 1
 * If no factors <= square root, not prime
 */

module.exports = function isPrime( n ) {
  // If it's not a number, NOT
  if ( typeof n !== 'number' ) {
    return false;
  }
  // If it's not an int, NOT
  if ( Math.round( n ) !== n ) {
    return false;
  }
  // If 0, negative, or 1, NOT
  if ( n <= 1 ) {
    return false;
  }
  // If it is 2 or 3, it IS
  // (Checking here to start loop from 5)
  if ( n <= 3 ) {
    return true;
  }
  // If it's divisible by 2 or 3, NOT
  // Eliminate many options here
  if ( n % 2 === 0 || n % 3 === 0 ) {
    return false;
  }

  // If no factor <= sqRoot (i**2), NOT
  // All primes are 6k (+ || -) 1
  for ( let i = 5; i ** 2 <= n; i += 6 ) {
    // start at (6-1), check (6-1 + 2)
    if ( n % i === 0 || n % ( i + 2 ) === 0 ) {
      return false;
    }
  }

  // Only two factors -> isPrime
  return true;
};
