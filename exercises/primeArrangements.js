/**
 * Prime Arrangements
 * _Weekly Contest 152_
 *
 * Return the number of permutations of 1 to n so that
 * prime numbers are at prime indices (1-indexed.)
 *
 * Recall that an integer is prime if and only if it is greater than 1,
 * and cannot be written as a product of two positive integers
 * both smaller than it.
 *
 * Since the answer may be large, return the answer _modulo 10^9 + 7_.
 *
 * @example
 * Input: n = 5
 * Output: 12
 * Explanation: For example [1,2,5,4,3] is a valid permutation,
 *              but [5,2,3,4,1] is not because the prime number 5 is at index 1.
 *
 * Input: n = 100
 * Output: 682289015
 *
 * Constraints:
 * - `1 <= n <= 100`
 *
 * Analysis:
 * Time: O(n log log n) = O(n + n log log n) = (factorial + countPrimes)
 * Space: O(max(#primes, #composites))
 */

/**
 * @param {number} n
 * @return {number}
 */
module.exports = function primeArrangements( n ) {
  const primes = countPrimes( n ),
    composites = n - primes,
    factorials = new Map( [[0,1n],[1,1n],[2,2n],[3,6n],[4,24n]] );

  factorial( Math.max( primes, composites ), factorials );

  return  factorials.get( primes ) * factorials.get( composites ) % MOD;
};

const factorial = ( n, mem ) => {
  if ( !mem.has( n ) ) {
    mem.set( n, BigInt( BigInt( n ) * factorial( n - 1, mem ) ) );
  }
  return mem.get( n );
};

const countPrimes = n => {
  if ( n < 2 ) {
    return 0;
  }

  const size = ( n - 3 >> 1 ) + 1,
    primes = [2],
    isPrime = Array( size ).fill( true );

  isPrime.forEach( ( _, i, isPrime ) => {
    if ( isPrime[i] ) {
      const p = ( i << 1 ) + 3;
      primes.push( p );
      for ( let j = 2 * i**2 + 6 * i + 3; j < size; j+= p ) {
        isPrime[j] = false;
      }
    }
  } );

  return primes.length;
};

const MOD = 1000000007n;
