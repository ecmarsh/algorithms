/**
 * Trapping Water
 *
 * Given n non-negative integers representing
 * an elevation map where the width of each bar is 1,
 * compute how much water it is able to trap after raining.
 *
 * See: https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png
 *
 * @example
 * Input: [0,1,0,2,1,0,1,3,2,1,2,1];
 * Output: 6
 *
 */

/**
 * @param {number[]} height
 * @return {number}
 */
module.exports = function trap( heights ) {
  let water = 0;

  let l = 0,
    r = heights.length - 1;

  const max = { left: 0, right: 0 };

  while ( l < r ) {
    const left = heights[l],
      right = heights[r];

    if ( left < right ) {
      if ( left > max.left ) {
        max.left = left;
      }
      else {
        water += max.left - left;
      }

      l++;
      continue;
    }

    if ( right > max.right ) {
      max.right = right;
    }
    else {
      water += max.right - right;
    }
    r--;
  }

  return water;
};
