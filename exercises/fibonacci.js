/**
 * Fibonacci (w/ memoization)
 *
 * @param {number} N
 * @return {number}
 */

module.exports = function fibonacci( N ) {
  // Mimic cache
  // for storing calculations
  const cache = {};

  return ( function fib( n ) {
    if ( `${n}` in cache ) {
      return cache[n];
    }
    // Store result and return
    cache[n] = n < 2 ? n : fib( n - 1 ) + fib( n - 2 );
    return cache[n];
  } )( N );
};
