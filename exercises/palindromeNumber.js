/**
 * Palindrome Number
 *
 * Determine whether an integer is a palindrome.
 * An integer is a palindrome when it reads the same backward as forward.
 * *You may not convert the integer to a string*.
 *
 * @example
 * Input: 121
 * Output: true
 *
 * @example
 * Input: -121
 * Output: false
 * Explanation: From left to right, it reads -121. From right to left, 121-.
 *
 * @example
 * Input: 10
 * Output: false
 * Explanation: Reads 01 from right to left.
 */

/**
 * @param {number} x
 * @return {boolean}
 */
module.exports = function isPalindrome( x ) {
  if ( x < 0 ) {
    return false;
  }

  // If last digit of x is 0,
  // can only be a palindrome if x is zero
  if ( x % 10 === 0 && x !== 0 ) {
    return false;
  }

  let firstHalf = x,
    secondHalf = 0;

  while ( firstHalf > secondHalf ) {
    secondHalf *= 10;
    secondHalf += firstHalf % 10;
    firstHalf = 0 | firstHalf / 10;
  }

  return firstHalf === secondHalf
     || firstHalf === ( secondHalf / 10 | 0 );
};
