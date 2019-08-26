const { swap } = require( '../utils' );
/**
 * Sort Colors (AKA Dutch National Flag)
 *
 * Given an array with n objects colored red, white or blue,
 * sort them in-place so that objects of the same color are adjacent,
 * with the colors in the order red, white and blue.
 *
 * Here, we will use the integers 0, 1, and 2 to represent
 * the color red, white, and blue respectively.
 *
 * Note: You are not supposed to use the sort function for this problem.
 *
 * @example
 * Input: [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 *
 * Analysis:
 * Time: O(N)
 * Space: O(1)
 *
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
module.exports = function sortColors( nums ) {
  if ( !nums || !nums.length ) {
    return;
  }

  let red = 0, // '0'
    i = 0, // curr, '1'
    blue = nums.length - 1; // '2'

  while ( i <= blue ) {
    if ( nums[i] === 0 ) {
      swap( nums, i, red );
      red++;
      i++;
    }
    else if ( nums[i] === 2 ) {
      swap( nums, i, blue );
      blue--;
    }
    else {
      i++;
    }
  }
};
