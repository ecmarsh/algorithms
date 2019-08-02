/**
 * Max Subarray
 *
 * Given an integer array nums, find the contiguous subarray
 * (containing at least one number) which has the
 * largest sum and return its sum.
 *
 * @example
 * Input: [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: [4,-1,2,1] has the largest sum = 6.
 *
 */

/**
 * Greedy solution: linear time, constant space.
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray( nums ) {
  let localMax = nums[0],
    globalMax = nums[0];

  for ( let i = 1; i < nums.length; i++ ) {
    localMax = Math.max( nums[i], localMax + nums[i] );
    globalMax = Math.max( globalMax, localMax );
  }

  return globalMax;
}

/**
  * Follow Up:
  * Use _divide and conquer_ to solve
  * in O(n log n) time and O(n log n ) space.
  */
function maxSubDivideConquer( nums, left=0, right=nums.length-1 ) {
  if ( left === right ) {
    return nums[left];
  }

  const middle = left + right >> 1,
    leftSum = maxSubDivideConquer( nums, left, middle ),
    rightSum = maxSubDivideConquer( nums, middle + 1, right ),
    leftRightMax = Math.max( leftSum, rightSum ),
    crossSum = maxCross( nums, left, right, middle );

  return Math.max( leftRightMax, crossSum );

  function maxCross( nums, left, right, middle ) {
    if ( left === right ) {
      return nums[left];
    }

    let leftSum = Number.MIN_SAFE_INTEGER,
      rightSum = Number.MIN_SAFE_INTEGER,
      leftIdx = middle + 1,
      rightIdx = middle,
      currSum = 0;

    while ( --leftIdx >= left ) {
      currSum += nums[leftIdx];
      leftSum = Math.max( currSum, leftSum );
    }

    currSum = 0;
    while ( ++rightIdx <= right ) {
      currSum += nums[rightIdx];
      rightSum = Math.max( currSum, rightSum );
    }

    return leftSum + rightSum;
  }
}

module.exports.maxSubArray = maxSubArray;
module.exports.maxSubDivideConquer = maxSubDivideConquer;
