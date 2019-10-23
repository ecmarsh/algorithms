/**
 * @=lc id=410 lang=javascript
 *
 * [410] Split Array Largest Sum
 *
 * Given an array which consists of non-negative integers and an integer `k`,
 * you can split the array into `k` non-empty contiguous subarrays.
 *
 * Write an algorithm to _minimize_ the largest sum among these `k` subarrays.
 *
 * @constraints:
 * If `n` is the length of the array:
 *    - `1 <= n <= 1000`
 *    - `1 <= k <= min(50,n)`
 *
 * @example
 * Input: nums=[7,2,5,10,8], k=2
 * Output: 18
 * Explanation: There are four ways to split nums into two (k=2) subarrays.
 *              The best way is to split it into [7,2,5] and [10,8], where
 *              the largest sum among the two subarrays is only 18.
 *
 * @complexity
 * n is nums.length, k is input k
 * Time:
 * Space:
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number} The minimized largest sub of split subarray.
 */
module.exports = function splitArray( nums, k ) {
  // max represents lowest amount it can be, total sum is highest
  const max = nums.reduce( ( acc, cur ) => Math.max( acc, cur ), nums[0] );
  const sum = nums.reduce( ( acc, cur ) => acc + cur, 0 );

  if ( k === 1 ) return sum;
  if ( k === nums.length ) return max;

  // Binary search in range[max..sum] for the minimum
  // subarray sum with k splits that fits all subarrays.
  let [lo, hi] = [max, sum];
  while ( lo < hi ) {
    const candidateLimit = ( lo+hi ) >> 1;
    const subarrayCount = subarraysNeeded( nums, candidateLimit );
    if ( subarrayCount > k ) {
      lo = candidateLimit + 1; // need larger limit to fit all
    } else {
      hi = candidateLimit; // it works, try with smaller limits
    }
  }
  // Note we've converged to one smallest optimal value
  // to fit all, so lo and hi are equal. Can return either.
  return lo;
};

/**
 * subarraysNeeded returns the amount of subarrays needed
 * so that no subarray sum is greater than limit.
 * @param {number[]} nums
 * @param {number} limit
 */
const subarraysNeeded = ( nums, limit ) => {
  let needed = 1; // initialize with at least one subarray
  nums.reduce( ( curSum, num ) => {
    curSum += num;
    if ( curSum > limit ) {
      needed++;   // need another subarray to fit
      return num; // start next subarray with num
    }
    return curSum; // else continue adding values until over limit
  }, 0 );
  return needed;
};

