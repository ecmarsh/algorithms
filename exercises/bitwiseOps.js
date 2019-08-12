/**
 * Adds two integers using bit operations.
 *
 * @param {number} x Augend
 * @param {number} y Addend
 * @return {number} Sum
 *
 * @example
 * 5 + 3 = 101 + 011
 *
 * 1. carry: 101&011=1, x: 101^11=110, y: 1<<1=10
 * 2. carry: 110&10=10, x: 110^10=100, y: 10<<1=100
 * 3. carry: 100&100=100, x: 100^100=000, y: 100<<1=1000
 * 4. carry: 100&1000=0, x: 000^1000=1000, y: 0<<1=0 *break*
 *
 * x = 1000 = 8
 *
 */
function bitwiseAdd( x, y ) {
  while ( y ) {
    const carry = x & y; // Account for 1+1
    x = x ^ y; // Add
    y = carry << 1; // Shift
  }

  return x;
}
module.exports.add = bitwiseAdd;

/**
 * Get inverse of int.
 *
 * @param {number} x
 * @return {number} x * -1
 */
function bitwiseNegate( x ) {
  return bitwiseAdd( ~x, 1 );
}
module.exports.negate = bitwiseNegate;

/**
 * Subtracts two integers using bit operations.
 *
 * @param {number} x Minuend
 * @param {number} y Subtrahend
 * @return {number} Difference
 */
function bitwiseSubtract( x, y ) {
  return bitwiseAdd( x, bitwiseNegate( y ) );
}
module.exports.subtract = bitwiseSubtract;

/**
 * Multiplies two integers using shift and add (peasant).
 *
 * @param {number} x Multiplier
 * @param {number} y Multiplicand
 * @return {number} Product
 *
 * @example
 * 11 x 3 = 3 x (1 x 2^0 + 1 x 2^1 + 0 x 2^2 + 1 x 2^3)
 *
 * Decimal:
 * 11   3
 * 5    6
 * 2   ~12~  // 2 is even
 * 1    24
 * -------
 *     *33* := 3+6+24
 *
 * Binary:
 * 1011  11
 * 101  110
 * 10 ~1100~ // 10 is even
 * 1  11000
 */
function bitwiseMultiply( x, y ) {
  // Ensure always positive multiplier
  // while retaining sign of operation.
  // If x is negative, we just move the
  // negative to the y since 1*-1 = -1*1.
  if ( x < 0 ) {
    x = bitwiseNegate( x );
    y = bitwiseNegate( y );
  }

  let acc = 0;

  while ( x ) {
    if ( x & 1 ) // If even
      acc = bitwiseAdd( acc, y );

    y = y << 1; // Double y
    x = x >> 1; // Half x
  }

  return acc;
}
module.exports.multiply = bitwiseMultiply;

/**
 * Divides two integers using bit operations.
 *
 * ie. The number of times you can subtract y from x"
 * 4/2 = 2 because 4 - 2 - 2 = 0
 *
 * @param {number} x Dividend
 * @param {number} y Divisor
 * @return {number} Quotient
 */
function bitwiseDivide( x, y ) {
  if ( y == 0 )
    return NaN;

  let isNegative = 0;
  // Use absolute values for division
  // keeping track of sign for return value.
  // x > 0 && y > 0 = +
  // x < 0 && y > 0 = -
  // x > 0 && y < 0 = -
  // x < 0 && y < 0 = +
  if ( x < 0 ) {
    x = bitwiseNegate( x );
    isNegative = !isNegative;
  }
  if ( y < 0 ) {
    y = bitwiseNegate( y );
    isNegative = !isNegative;
  }

  let counter = 0;
  while ( x >= y ) {
    x = bitwiseSubtract( x, y );
    counter = bitwiseAdd( counter, 1 );
  }

  return isNegative ? bitwiseNegate( counter ) : counter;
}
module.exports.divide = bitwiseDivide;


/**
 * Finds remainder of two integers using bit operations.
 *
 * Same method as division, but to find remainder.
 *
 * @param {number} x Dividend
 * @param {number} y Divisor
 * @return {number} Quotient
 */
function bitwiseModulo( x, y ) {
  if ( !y )
    return NaN;

  // Use absolute values
  if ( x < 0 )
    x = bitwiseNegate( x );
  if ( y < 0 )
    y = bitwiseNegate( y );

  while ( x >= y ) {
    x = bitwiseSubtract( x, y );
  }

  return x;
}
module.exports.modulo = bitwiseModulo;
