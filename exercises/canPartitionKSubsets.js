/**
 * Partition to K Equal Sum Subsets
 *
 * Given an array of integers nums and a positive integer k,
 * find whether it's possible to divide this array into
 * k non-empty subsets whose sums are all equal.
 *
 * Constraints:
 *  - `1 <= k <= len(nums) <= 16`
 *  - `0 < nums[i] < 10,000`
 *
 * @example
 * Input: k=4, nums=[4, 3, 2, 3, 5, 2, 1]
 * Output: true
 * Explanation: It's possible to divide it into 4 subsets:
 *              (5), (1,4), (2,3), (2,3)
 *
 * @example
 * Input: k=4, nums=[5, 4, 3, 5, 3]
 * Ouput: false
 * Explanation: Nums cannot divided into 4 sum subsets.
 *
 * Analysis:
 * N is nums.length
 * Time: 2^N*N + N = O(N*2^N)
 * Space: 2*2^N = O(2^N)
 */

module.exports = function canPartitionKSubsets( nums, k ) {
  if ( !nums || nums.length < k ) return false;
  if ( k === 1 ) return true;

  let sum = 0;
  let max = 0;
  nums.forEach( ( num ) => {
    sum += num;
    max = Math.max( max, num );
  } );
  if ( sum % k !== 0 || max > sum / k ) {
    return false;
  }

  const targetSum = sum / k;
  const psetSize = 1 << nums.length;
  const subsetSum = Array( psetSize ).fill( 0 );
  const canPartition = [0, ...Array( psetSize ).fill( false )];

  subsetSum.forEach( ( curSum, curSet ) => {
    // If partial subset not valid, no reason to check with more
    if ( !canPartition[curSet] ) return;
    nums.every( ( num, i ) => {
      // If bit is already set, continue
      // Otherwise, check with j'th bit set
      if ( curSet & ( 1 << i ) ) return true;
      const newSet = curSet | 1 << i;
      // If number will not make lead to valid partition, break
      if ( num > targetSum - ( curSum % targetSum ) ) return false;
      // Otherwise it could be valid partition
      canPartition[newSet] = true;
      subsetSum[newSet] = curSum + num;
      return true;
    } );
  } );

  // We care if can partition all of nums (all bits set)
  return canPartition.pop();
};
