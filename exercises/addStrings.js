/**
 * Add Strings
 *
 * Given two non-negative integers num1 and num2 represented as string,
 * return the sum of num1 and num2.
 * Note:
 * - The length of both num1 and num2 is < 5100.
 * - Both num1 and num2 contains only digits 0-9.
 * - Both num1 and num2 does not contain any leading zero.
 * - You must not convert the inputs to integer directly.
 *
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
module.exports = function addStrings( num1, num2 ) {
  if ( num1.length !== num2.length ) {
    const numZeros = Math.abs( num1.length - num2.length );
    const padStartZeros = numStr => '0'.repeat( numZeros ) + numStr;

    if ( num1.length > num2.length ) {
      num2 = padStartZeros( num2 );
    }
    else {
      num1 = padStartZeros( num1 );
    }
  }

  let sum = '',
    carry = 0;

  for ( let i = num1.length-1; i >= 0 ; i-- ) {
    let placeSum = +num1[i] + +num2[i] + carry;

    if ( placeSum > 9 ) {
      placeSum -= 10;
      carry = 1;
    }
    else {
      carry = 0;
    }

    sum = placeSum.toString() + sum;
  }

  return carry ? `${carry}${sum}` : sum;
};
