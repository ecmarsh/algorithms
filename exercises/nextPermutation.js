/**
 * Next Permutation (General Problem-Solving Skills)
 *
 * Implement next permutation, which rearranges numbers into the
 * lexicographically next greater permutation of numbers.
 *
 * If such arrangement is not possible, it must rearrange it
 * as the lowest possible order (ie, sorted in ascending order).
 *
 * The replacement must be in-place and use only constant extra memory.
 *
 * @example
 *
 * Input: 1,2,3
 * Output: 1,3,2
 *
 * Input: 3,2,1
 * Output: 1,2,3
 *
 * Input: 1,1,5
 * Output: 1,5,1
 *
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
module.exports = function nextPermutation( nums ) {
  const len = nums.length;

  if ( len <= 2 ) {
    swap( nums, 0, len - 1 );
    return;
  }

  // Find last index where i-1 < i in nums
  let i = len - 2;
  while ( i >= 0 && nums[i] >= nums[i+1] ) {
    i--;
  }

  // Handle "not possible" case
  // It's in descending order, so reverse it to make it ascending.
  if ( i < 0 ) {
    reverse( nums, 0, len - 1 );
    return;
  }

  // Find next smallest index to swap with decreasing index
  let j = len - 1;
  while ( j >= 0 && nums[j] <= nums[i] ) {
    j--;
  }

  // Swap and reverse to generate next permutation
  swap( nums, i, j );
  reverse( nums, i + 1, len - 1 );
};

const reverse = ( nums, i, j ) => {
  while ( i < j ) {
    swap( nums, i, j );
    i++; j--;
  }
};

const swap = ( nums, i, j ) => {
  [nums[i], nums[j]] = [nums[j], nums[i]];
};


/*

PSUEDO (there's no math just a tricky number pattern)

1. Find the first decreasing element (R->L)

2. From first decreasing idx-> end (L->R),
    find next largest number to decreasing element.

3. Swap decreasing and just largest

4. Reverse from decreasing element to end.

*/
