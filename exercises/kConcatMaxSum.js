/**
 * K-Concatenation Maximum Sum
 * **Contest 154** 5-pts
 *
 * Given an integer array arr and an integer k,
 * modify the array by repeating it k times.
 *
 * For example, if arr = [1, 2] and k = 3,
 * then the modified array will be [1, 2, 1, 2, 1, 2].
 *
 * Return the maximum sub-array sum in the modified array.
 * Note that the length of the sub-array can be 0 and its sum in that case is 0.
 *
 * As the answer can be very large, return the answer modulo `10^9 + 7`.
 *
 * Constraints:
 * - `1 <= arr.length <= 10^5`
 * - `1 <= k <= 10^5`
 * - `-10^4 <= arr[i] <= 10^4`
 *
 * @examples
 * Input: arr=[1,2], k=3
 * Output: 9
 *
 * Input: arr=[1,-2,1], k=5
 * Output: 2
 *
 * Input: arr=[-1,-2], k=7
 * Output: 0
 *
 *
 * _Analysis_:
 * N is len(arr)
 * *Time*: Max O(2N) passes -> O(N)
 * *Space*: O(1)
 *
 */


/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
module.exports = function kConcatMaxSum( arr, k ) {
  const MOD = 1000000007;
  let totalSum = 0;
  let localMax = 0;
  let globalMax = 0;

  // First loop: do Kadane's algorithm for max subarray sum
  // with addition of calculating total sum for next steps.
  arr.forEach( ( num ) => {
    totalSum += num;
    localMax = Math.max( num, localMax + num );
    globalMax = Math.max( localMax, globalMax );
  } );

  // If k is 1, we don't need to check for second concat.
  // Or if globalMax is still 0, all numbers were negative,
  // so max sum will be subarray of length 0 = 0.
  if ( k === 1 || globalMax === 0 ) {
    return globalMax % MOD;
  }

  // Calculate max sum of concatenating twice for case [1, -2, 1]
  // where positives are on the end.
  arr.forEach( ( num ) => {
    localMax = Math.max( num, localMax + num );
    globalMax = Math.max( localMax, globalMax );
  } );

  // After 2x concatenations, the only increments we can gain
  // are from the total sum of the array, if total sum is positive.
  // Ex: [1,-2, 1, 1], k=4. Concat 2x max is 3, and totalSum is 1.
  // Max 2x concat will be 3, then each time, we gain totalSum 1.
  // i.e arr[]*2 + (k-2)*totalSum = 3 + (4-2) * 1 = 3+(2*1)=5
  if ( totalSum > 0 ) {
    globalMax += ( k - 2 ) * totalSum;
  }

  return globalMax % MOD;
};
