/**
 * @=lc id=713 lang=javascript tag=sliding-window
 *
 * [713] Subarray Product Less Than K
 *
 * You are given an array of positive integers nums.
 *
 * Count and print the number of (contiguous) subarrays where
 * the product of all the elements in the subarray is less than k.
 *
 * @constraints
 * - `0 < nums.length <= 50,000`
 * - `0 < nums[i] <= 1,000`
 * - `0 < k <= 1,000`
 *
 * @example
 * Input: nums = [10, 5, 2, 6], k = 100
 * Output: 8
 * Explanation: The 8 subarrays that have product less than 100 are:
 *              [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6].
 *              Note that [10, 5, 2] is _not_ included as the product
 *              of 100 is not strictly less than k.
 */
/**
 *-- Sliding Window Implementation --
 * Product is monotone increasing since all positive numbers.
 * Number of arrays is the length of lo to hi where lo
 * is longest subarray where product is still less than k.
 * We can increment lo without checking in between since product overlaps.
 * The total arrays is sum of arrays at each index, hi.
 *
 * Time: O(N) one pass with two pointers
 * Space: O(1) constant 4 variables used.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number} The number of subarrays where product < k.
 */
module.exports = function subarrayProductLessThanK( nums, k ) {
  if ( k <= 1 ) return 0;

  let ret = 0;
  let p = 1;
  let [lo, hi] = [0, 0];

  while ( hi < nums.length ) {
    p *= nums[hi];
    while ( p >= k ) {
      p /= nums[lo];
      lo++;
    }
    ret += hi-lo+1; // length is +1
    hi++;
  }

  return ret;
};

