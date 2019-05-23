/**
 * Common "factorial algorithm"
 * w / TCO recursion (allows possible reuse of stackframe)
 *
 * @param :: `n`, the number (int) we want the factorial of
 * @returns :: factorial number of n
 *
 * @example :: factorial(5) // 120
 */

module.exports = function factorial( n ) {
  if ( !Number.isSafeInteger( n ) ) {
    throw TypeError( `Must provide positive integer` );
  }
  // Both inner `fact` calls
  // are in tail position
  function fact( n, res = 1 ) {
    if ( n < 2 ) {
      return res;
    }

    return fact( n - 1, n * res );
  }

  return fact( n );
};
