/**
 * Squares of a Sorted Array
 *
 * Given an array of integers `A` sorted in non-decreasing order,
 * return an array of the squares of each number,
 * also sorted in non-decreasing order.
 *
 * @example
 * Input: [-4, -1, 0, 3, 10]
 * Output: [0, 1, 9, 16, 100]
 *
 * @example
 * Input: [-7, -3, 2, 3, 11]
 * Output: [4, 9, 9, 49, 121]
 *
 * Note:
 * 1. 1 <= `A.length` <= 10000
 * 2. -10000 <= `A[i]` <= 10000
 * 3. `A` is sorted in non-decreasing order.
 */

/**
 * @param {number[]} A
 * @return {number[]}
 */
module.exports = function sortedSquares( A ) {
  const len = A.length,
    sortedSquares = Array( len );

  let [l, r] = [0, len-1];

  while ( l <= r ) {
    const [left, right] = [Math.abs( A[l] ), Math.abs( A[r] )];

    if ( left > right ) {
      sortedSquares[r-l] = left * left;
      l++;
    }
    else {
      sortedSquares[r-l] = right * right;
      r--;
    }
  }

  return sortedSquares;
};
