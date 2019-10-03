/**
 * Partition Equal Subset Sum
 *
 * Given a non-empty array containing only positive integers,
 * find if the array can be partitioned into two subsets such that
 * the sum of elements in both subsets is equal.
 *
 * Constraints:
 *   - Each of the array element will not exceed 100.
 *   - The array size will not exceed 200.
 *
 * @example
 * Input: [1,5,11,5]
 * Output: true
 * Explanation: Can be partitioned as [1,5,5] and [11].
 *
 * @example
 * Input: [1,2,3,5]
 * Output: false
 * Explanation: The array cannot be partitioned into equal sum subsets.
 *
 * Analysis:
 * N is len(arr)
 * Time: O(N*(total sum/2)) => max target sum is 10^4 = O(N)
 * Space: O(200 * 100 / 2) = O(10^4) = O(1) won't exceed sum / 2
 */

module.exports = function canPartitionEqualSubset( nums ) {
  if ( !nums || nums.length < 2 ) return false;

  const sum = nums.reduce( ( acc, cur ) => acc + cur, 0 );

  if ( sum & 1 > 0 ) return false;

  const target = sum >> 1;
  const dp = [true]; // [0...target]

  for ( let i = 1; i < nums.length; i += 1 ) {
    for ( let j = target; j >= nums[i]; j -= 1 ) {
      dp[j] = dp[j] || dp[j-nums[i]];
    }
  }

  return dp[target];
};
