/**
 * @lc id= lang=javascript tag=kadane,greedy,array
 *
 * [] Maximum Sum Circular Subarray
 *
 * Given a circular array C of integers represented by A,
 * find the maximum possible sum of a non-empty subarray of C.
 *
 * Here, a circular array means the end of the array connects to the
 * beginning of the array. (Formally, C[i] = A[i]
 * when 0 <= i < A.length, and C[i+A.length] = C[i] when i >= 0.)
 *
 * Also, a subarray may only include each element of the fixed buffer, A,
 * at most once. (Formally, for a subarray C[i], C[i+1], ..., C[j],
 * there does not exist i <= k1, k2 <= j with k1 % A.length = k2 % A.length.)
 *
 * @constraints
 * - `-30000 <= A[i] <= 30000`
 * - `1 <= A.length <= 30000`
 *
 * @example
 * Input: [1,-2,3,-2]
 * Output: 3
 * Explanation: Subarray [3] has maximum sum 3
 *
 * @example
 * Input: [5,-3,5]
 * Output: 10
 * Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10
 *
 * @example
 * Input: [3,-1,2,-1]
 * Output: 4
 * Explanation: Subarray [2,-1,3] has maximum sum 2 + (-1) + 3 = 4
 *
 * @example
 * Input: [3,-2,2,-3]
 * Output: 3
 * Explanation: Subarray [3] and [3,-2,2] both have maximum sum 3
 *
 * @example
 * Input: [-2,-3,-1]
 * Output: -1
 * Explanation: Subarray [-1] has maximum sum -1
 *
 * @complexity
 * Time: O(N)
 * Space: O(1)
 */

/*

NOTES:

2 Cases Trying to solve:
  1. [ .., |...maxSubArray...|, ..] <- A
  2. [0, 2N-1] and crossover [.., | maxSub|] + [|maxSub],...]

First case can be solved with kadane's ->
  - use localMax/globalMax and update local max if curr + localMax is >
  - update globalMax if greater
For second case, it's essentially removing some items from the
middle if there is an overlap.
  - Take the total sum of the whole array
  - Find the minimum sub array

At the end, the answer is the maximum of (total sum - minsub, maxSubNormal)

Edge case if all of the items are negative, then we can't use the circular sum as it could remove all items from middle. So just return the noncircular normal
max sum, which would be one item, the max. If we remove all the items, then the noncircular sum would be 0.

*/

/**
 * @param {number[]} A
 * @return {number}
 */
module.exports = function maxSubArrayCircular( A ) {
  let localMax = Number.MIN_SAFE_INTEGER;
  let globalMax = Number.MIN_SAFE_INTEGER; // non-circular sum
  let localMin = Number.MAX_SAFE_INTEGER;
  let globalMin = Number.MAX_SAFE_INTEGER;

  let sum = 0;

  A.forEach( ( x ) => {
    sum += x;
    localMax = Math.max( localMax + x, x );
    localMin = Math.min( localMin + x, x );
    globalMax = Math.max( localMax, globalMax );
    globalMin = Math.min( localMin, globalMin );
  } );

  const circularSum = sum - globalMin;

  if ( circularSum === 0 ) {
    return globalMax;
  }

  return Math.max( circularSum, globalMax );
};

