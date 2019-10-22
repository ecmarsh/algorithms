/**
 * @=lc id=1007 lang=javascript
 *
 * [1007] Minimum Swaps for Equal Row
 *
 * Given two arrays, A and B, return the minimum number of swaps
 * to make all values in either A the same or all elements in B the same.
 * If no amount of swaps can make all elements in either arr equal, return -1.
 *
 * @constraints
 *  - `1 <= A[i], B[i] <= 6`
 *  - `2 <= A.length == B.length <= 20,000`
 *
 * @example
 * Input: A = [2,1,2,4,2,2], B = [5,2,6,2,3,2]
 * Output: 2
 * Explanation: Swap index 1 and 3 to make all elements of A equal to 2.
 *
 * @example
 * Input: A = [3,5,1,2,3], B = [3,6,3,3,4]
 * Output: -1
 * Explanation: No amount of swaps can make all values in either A or B equal.
 *
 * @complexity
 * N = A = A.length = B = B.length
 * Time: O(A+B) = O(2N) = O(N)
 * Space: O(1)
 */

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
module.exports = function minSwapsForEqualRow( A, B ) {
  // Pick arbitrary value in A and B to compare if can make equal.
  const [a, b] = [A[0], B[0]];
  // Check min rotations to make all elements equal in A
  const aMin = check( A, B, a );
  // If b is same value or we have an answer with A, no need to check with b.
  // NOTE: we don't need to check with A since we compare the min of moving
  // a to b and vice versa (which row has more of "a") in the check function.
  return a === b || aMin !== -1 ? aMin : check( A, B, b );
};

/**
 * Check checks that for each i, either A[i] or B[i] is
 * equal to `x`. Returns -1 if not, or the minimum indices
 * that are not equal to x; that is, min rotations needed.
 *
 * @param {number[]} A
 * @param {number[]} B
 * @param {number} x
 * @returns {number} -1 or the min rotations.
 */
const check = ( A, B, x ) => {
  let [aNotX, bNotX] = [0, 0];
  for ( let i = 0; i < A.length; i++ ) {
    if ( A[i] !== x && B[i] !== x ) {
      return -1;
    }
    // A[i] or B[i] or both must be equal to x
    // Count a rotation/swap for one, if any, not equal
    if ( A[i] !== x ) {
      aNotX++;
    } else if ( B[i] !== x ) {
      bNotX++;
    }
  }
  return Math.min( aNotX, bNotX );
};
