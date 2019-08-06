/**
 * Product Except Self
 *
 * Given an array nums of n integers where n > 1,
 * return an array output such that output[i]
 * is equal to the product of all the elements of nums except nums[i].
 *
 * @example
 * Input: [1,2,3,4]
 * Output: [24,12,8,6]
 *
 * Notes:
 * - Division is not allowed
 * - Runtime must be linear.
 * - Space must be constant, excluding output array.
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
module.exports = function productExceptSelf( nums ) {
  const n = nums.length,
    output = Array( n );

  output[0] = 1;
  for ( let i = 1; i < n; i++ ) {
    output[i] = output[i-1] * nums[i-1];
  }

  let r = 1;
  for ( let i = n-1; i >= 0; i-- ) {
    output[i] = output[i] * r;
    r = r * nums[i];
  }

  return output;
};
