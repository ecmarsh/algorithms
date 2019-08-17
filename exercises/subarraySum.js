/**
 * Subarray Sum Equals K
 *
 * Given an array of integers and an integer k,
 * find the total number of contiguous subarrays
 * whose sum equals k.
 *
 * @example
 * Input: [1,1,1], k=2
 * Output: 2
 *
 * Constraints:
 * - `-1000 <= nums[i] <= 1000`, and `1 <= i <= 20000`
 * - `-1e7 <= k <= 1e7`
 *
 */

/**
 * Constant space solution. Time is O(n^2).
 * Look for matching sum through all subarrays of nums.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
module.exports.subarraySumBrute = function subarraySumBrute( nums, k ) {
  let subarrayCount = 0;

  for ( let i = 0; i < nums.length; i++ ) {
    let sum = 0;

    for ( let j = i; j < nums.length; j++ ) {
      sum += nums[j];

      if ( sum === k ) {
        subarrayCount++;
      }
    }
  }

  return subarrayCount;
};


/**
 * Linear time solution with O(n) with O(n) space.
 * See notes following function for inductions, and
 * cumulative sum function for step solution.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
module.exports.subarraySumOptimal = function subarraySumOptimal( nums, k ) {
  let subarrayCount = 0;

  // Initialize map with ( {preSum,occurences} )
  // If sum-k = 0, sum=k. This satisfies and
  // we increment one to numArrays.
  const preSums = {
    0: 1,
  };

  nums.reduce( ( acc, num ) => {
    // Update cumulative sum
    acc += num;

    // If there is a sum in subarray
    // increment count by number of subarrays.
    if ( preSums[acc - k] )
      subarrayCount += preSums[acc - k];

    // Increment the previous occurences of presum
    // or create the first presum occurence.
    preSums[acc] = preSums[acc] + 1 || 1;

    return acc;
  }, 0 );

  return subarrayCount;
};

/*

- If cumulative sum up to two indices is the same,
  then sum of elements between those indices is 0.
- If cumulative sum up to two indices, i & j has a
  difference of k, the sum of elements between
  i and j is k.
- Create presum map with interface:
  { [sumAti: number], numOccurencesTili }

[1,1,1,0,2] k=2 -> 5

map:    // sum-k   ->                 numArrays
{
  0: 1,
  1: 1, // 1-2 = -1
  2: 2, // 2-2 = 0 -> numArrays += map(0) -> 1
  3: 3, // 3-2 = 1 -> numArrays += map(1) -> 2
  3: 4, // 3-2 = 1 -> numArrays += map(1) -> 3
  4: 6, // 5-2 = 2 -> numArrays += map(2) -> 5
}

Time: O(n)
Space: O(n)
*/

/**
 * This optimal solution is one step away from this solution
 * that uses the difference of cumulative sums at each i.
 *
 * Below we use cumulativeSum[hi] - cumulativeSum[lo] for subarray sum.
 *
 * In optimal solution we defer to cumSum[lo] in preSum map,
 * and after some algebra, use cumSum[hi] - k == cumSum[lo]
 */
/* eslint-disable no-unused-vars */
function subarraySumsWithCumulativeSum( nums, k ) {
  const len = nums.length,
    cumSum = [0];

  let count = 0;

  // Build cumulative sums at each i
  for ( let i = 1; i < len; i++ )
    cumSum[i] = cumSum[i-1] + nums[i-1];

  // Check cumSums[i:j] for match to sum.
  // ie: sum(nums[i:j]) = cumSum[j+1] - cumSum[i]
  for ( let i = 0; i < len; i++ )
    for ( let j = i + 1; j < len; j++ )
      count += +( cumSum[j] - cumSum[i] === k );

  return count;
}
