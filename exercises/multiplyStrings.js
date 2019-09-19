/**
 * Multiply Strings (FB)
 *
 * Given two non-negative integers num1 and num2 represented as strings,
 * return the product of num1 and num2, also represented as a string.
 *
 * @example
 * Input: num1 = "2", num2 = "3"
 * Output: "6"
 * @example
 * Input: num1 = "123", num2 = "456"
 * Output: "56088"
 *
 * Constraints:
 * 1. `1 <= num1.length, num2.length < 110`
 * 2. Both arguments contain only digits `0-9`
 * 3. Both `num1` and `num2` do not contain any leading zero, except number 0.
 * 4. You _may not_ use any built-in BigInt lib or convert entire args to ints.
 *
 * Analysis:
 * N = num1.length, M = num2.length
 * Time: O(N*M)
 * Space: O(N+M)
 *
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
module.exports = function multiply( num1, num2 ) {
  if ( !num1 || !num2 ) return '';
  if ( num1 === '0' || num2 === '0' ) return '0';
  if ( num1 === '1' ) return num2;
  if ( num2 === '1' ) return num1;

  const places = Array( num1.length + num2.length ).fill( 0 );

  for ( let i = num1.length-1; i >= 0; i-=1 ) {
    for ( let j = num2.length-1; j >= 0; j-=1 ) {
      const product = num1[i] * num2[j];  // Multiplication coerces str -> int
      const p = i + j;
      const carry = places[p + 1];
      const sum = product + carry;

      places[p] += sum / 10 | 0;  // Write Down
      places[p + 1] = sum % 10;  // Carry Over
    }
  }

  // Remove leading zeros for final answer
  // by marking as undefined to avoid shifting elements.
  // Undefined elements won't be included in joined string result.
  for ( let i = 0; places[i] === 0; i++ ) {
    places[i] = void 0;
  }

  return places.join( '' );
};
