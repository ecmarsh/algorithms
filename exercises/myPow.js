/**
 * Math.pow(x,n) in O(log n) time
 * Implement pow(x, n), which calculates x raised to the power n (x^n)
 *
 *
 * @param {number} x -100.0 < x < 100.0
 * @param {number} n 32-bit signed integer within [−2^31, 2^31 − 1]
 * @return {number}
 *
 * Using Fast Power Iterative solution
 *
 * Examples
 * Input: x=2.00000, n=10
 * Output: 1024.00000
 * Input: x=2.00000, n=-2
 * Output: 0.25000
 */

module.exports = function myPow( x, n ) {
  if ( n < 0 ) {
    x = 1 / x;
    n *= -1;
  }

  let ans = 1,
    currentProduct = x,
    i = n;

  for ( ; i > 0; i /= 2 ) {
    if ( i & 1 ) {
      ans *= currentProduct;
    }
    currentProduct *= currentProduct;
  }

  return ans;
};
