/**
 * @lc id=238 lang=javascript tag=array,amz
 *
 * [238] Product Except Self
 *
 * Given an array nums of n integers where n > 1,
 * return an array output such that output[i]
 * is equal to the product of all the elements of nums except nums[i].
 *
 * @constraints
 * - Division is not allowed
 * - Runtime must be linear.
 * - Space must be constant, excluding output array.
 *
 * @example
 * Input: [1,2,3,4]
 * Output: [24,12,8,6]
 *
 * @complexity
 * Time: 2N -> O(N)
 * Space: O(N) -> Output
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
module.exports = function productExceptSelf( nums ) {
  const n = nums.length;
  const products = Array( n );

  // Multiply everything before the number
  // We use the previous index in products as accumulator
  // and multiply it by the index behind from nums.
  // 0. nums=[1,2,3,4], products=[1,_,_,_]
  // 1. i=1 -> [1,1,_,_]
  // 2. i=2 -> [1,1,2,_]
  // 3. i=3 -> [1,1,2,6]
  products[0] = 1;
  for ( let i = 1; i < n; i++ ) {
    products[i] = products[i-1] * nums[i-1];
  }

  // Multiply everything after the number,
  // using 'r' as the accumulator, initialized at 1.
  // 0. [1,1,2,6] r=1, nums=[1,2,3,4]
  // 1. [1,1,2,6] r*4=4
  // 2. [1,1,8,6] r*3=12
  // 3. [1,12,8,6] r*2=24
  // 4. [24,12,8,6] r*1=24, i < 0 => break
  let r = 1;
  for ( let i = n-1; i >= 0; i-- ) {
    products[i] *= r;
    r *= nums[i];
  }

  return products;
};
