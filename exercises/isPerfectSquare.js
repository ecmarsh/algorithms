/**
 * @lc id=367 lang=javascript tag=math,binarysearch,binsearch
 *
 * [367] Is Valid Perfect Square
 *
 * Given a positive integer x, write a function which
 * returns True if x is a perfect square else False.
 *
 * @constraints
 * - x > 0
 * - Do not use any built-in library function such as sqrt.
 *
 * @example
 * Input: 16
 * Output: true
 *
 * @example
 * Input: 14
 * Output: true
 *
 * @complexity
 * Time: O(log n) -> Binary search from (0..n/2]
 * Space: O(1)
 */

/**
 * @param {number} x
 * @return {boolean}
 */
module.exports = function isValidPerfectSquare( x ) {
  let lo = 1; // lowest square root of positive number
  let hi = ( x >> 1 ) + 1; // square root never greater than ceil(x/2)

  while ( lo <= hi ) {
    const mid = ( hi + lo ) >> 1;
    const sq = mid * mid;
    if ( sq === x ) {
      return true;
    }
    if ( sq > x ) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return false;
};

/**
 * @param {number} num
 * @return {boolean}
 * @complexity
 * Time: O(log n) -> practically fastest solution
 * Space: O(1)
 */
module.exports.newtons = function ( num ) {
  if ( num < 2 ) return true;

  let x = num / 2;
  while ( x * x > num ) {
    x = ( x + num / x ) / 2;
  }
  return ( x * x == num );
};

/*

Newton's method
f(x) = num - x^2 === 0

Use tangent line:

x2 = x1 - dx
slope(derivative/f'(x)) = f(x1) / dx
  - dx is difference of tangent line vs guess

dx = f(x1) / slope
dx = f(x1) / f'(x1)

x2 = x1 - dx

So...
x_(k+1) = x_k - dx
x_(k+1) = x_k - f(x_k) / f'(x_k)

f(x) = num - x^2 === 0
f'(x) = (f(x-dx) - f(x)) / dx
  f(x-dx) = num - (x-dx)^2 === 0
  f(x-dx) - f(x) =  num - (x-dx)^2 - (num - x^2)
  num - (x^2 - 2dx*x + dx^2) - (num - x^2)
  num - x^2 + 2dx*x + dx^2 - num + x^2
f'(x) = (2dx*x + dx^2) / dx
f'(x) = dx(2x+dx) / dx
f'(x) = 2x+dx -> as dx heads towards 0, we get 2x
f'(x) = 2x

Finding...
f(x) = num-x^2 = 0
f'(x) = 2x

Thus...
x_k+1 = x_k - f(x_k) / f'(x_k)
x_k+1 = x_k - (num - xk^2) / (2xk)
x_k+1 = x_k - 1/2*((num-xk^2)/x_k)

Then need to guess...
f(x) = num - x^2 is monotonous, so want to start with smallest seed -> num / 2

Keep incrementing k until x*x is less than or equal to the number. If it's less than, its not a valid square but if it equals, then we found the root.

So starting with num/2 up until the guess (x*x) is greater than the number,
keep guessing. Then it's true if the guess is the number.

Proof of O(log n) convering quadratically: https://en.wikipedia.org/wiki/Newton%27s_method#Proof_of_quadratic_convergence_for_Newton's_iterative_method

*/
