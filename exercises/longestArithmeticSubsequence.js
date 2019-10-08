/**
 * Longest Arithmetic Subsequence of Given Difference
 * _Weekly Contest 157_
 *
 * Given an integer array arr and an integer difference,
 * return the length of the longest subsequence in arr which
 * is an arithmetic sequence such that the difference between
 * adjacent elements in the subsequence equals difference.
 *
 * Constraints:
 *  - `1 <= arr.length = 10^5`
 *  - `-10^4 <= arr[i], difference <= 10^4`
 *
 * @example
 * Input: arr = [1,2,3,4], difference = 1
 * Output: 4
 * Explanation: The longest arithmetic subsequence is [1,2,3,4].
 *
 * @example
 * Input: arr = [1,3,5,7], difference = 1
 * Output: 1
 * Explanation: The longest arithmetic subsequence is any single element.
 *
 * @example
 * Input: arr = [1,5,7,8,5,3,4,2,1], difference = -2
 * Output: 4
 * Explanation: The longest arithmetic subsequence is [7,5,3,1].
 *
 * Analysis:
 * N is len(arr)
 * Time: O(N)
 * Space: O(N) worst case if all elements different.
 */

/**
 * @param {number[]} arr
 * @param {number} d Target difference
 * @return {number}
 */
module.exports = function longestArithmeticSubsequence( arr, d ) {
  const dp = new Map(); // dp[arr[i]] = maxSubseqLen for arr[i] at i
  let best = 1;
  arr.forEach( ( x ) => {
    dp.set( x, dp.get( x-d ) + 1 || 1 );
    best = Math.max( dp.get( x ), best );
  } );
  return best;
};
