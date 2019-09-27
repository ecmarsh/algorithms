/**
 * 3Sum Closest
 *
 * Given an array nums of n integers and an integer target,
 * find three integers in nums such that the sum is closest to target.
 * Return the sum of the three integers.
 * You may assume that each input would have exactly one solution.
 *
 * @example
 * Input: nums=[-1,2,1-4] target=1
 * Output: 2
 * Explanation: The sum that is closest to target is 2. (-1 + 2 + 1 = 2).
 *
 *
 * Analysis:
 * n is len(nums)
 * Time: O(n^2) <--- nlogn(sort) + n^2(search)
 * Space: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
module.exports = function threeSumClosest( nums, target ) {
  nums.sort( ( a, b ) => a - b );

  let closestSum = 0;
  let bestDiff = Infinity;

  for ( let i = nums.length - 1; i >= 2; i -= 1 ) {
    let j = 0;
    let k = i - 1;
    let diff = target - nums[i] - nums[j] - nums[k];
    while ( j < k ) {
      if ( diff === 0 ) {
        return target;
      }
      if ( Math.abs( diff ) < bestDiff ) {
        bestDiff = Math.abs( diff );
        closestSum = target - diff;
      }
      // Skip duplicates then update 'rolling' diff
      if ( diff > 0 ) {
        while ( nums[j] === nums[j+1] && j < k ) {
          j += 1;
        }
        j += 1;
        diff += ( nums[j-1] - nums[j] );
      }
      else {
        while ( nums[k] === nums[k-1] && j < k ) {
          k -= 1;
        }
        k -= 1;
        diff += ( nums[k+1] - nums[k] );
      }
    }
  }

  return closestSum;
};

