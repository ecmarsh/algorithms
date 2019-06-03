const { swap } = require( '../utils' );

/**
 * Rotate an array `k` places to the right
* @param {number[]} nums
* @param {number} k
* @return {void} Do not return anything, modify nums in-place instead.
*
* Example:
* Input: [1,2,3,4,5,6,7], k = 3
* Output: [5,6,7,1,2,3,4]
* Time: O(n)
* Space: O(1) <- "in place" rotation
*/

module.exports = function rotateArray( nums, k ) {
  const n = nums.length;

  if ( !n ) {
    return nums;
  }

  k %= nums.length; // if k > nums.length

  _reverse( nums, 0, n - 1 ); // reverse entire array
  _reverse( nums, 0, k - 1 ); // reverse idxs < k
  _reverse( nums, k, n - 1 );     // reverse idxs > k

  function _reverse( arr, start, end ) {
    if ( !arr.length || start < 0 || end < 0 || end >= arr.length || start >= arr.length ) {
      return;
    }

    while ( start < end ) {
      swap( arr, start++, end-- );
    }
  }
};
