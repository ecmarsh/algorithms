/**
 * Container With Most Water
 *
 * Given n non-negative integers a1, a2, ..., an ,
 * where each represents a point at coordinate (i, ai).
 * n vertical lines are drawn such that the two endpoints
 * of line i is at (i, ai) and (i, 0).
 *
 * Find two lines, which together with x-axis forms a container,
 * such that the container contains the most water.
 *
 * Note: You may not slant the container and n is at least 2.
 *
 * @example
 * Input: [1, 8, 6, 2, 5, 4, 8, 7]
 * Output: 49
 * Explanation: ![Image](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)
 *
 */

/**
 * @param {number[]} heights
 * @return {number}
 */
module.exports = function maxArea( heights ) {
  let maxArea = 0,
    [l, r] = [0, heights.length-1];

  while ( l < r ) {
    maxArea = Math.max( maxArea, calcArea( heights, l, r ) );

    if ( heights[l] < heights[r] ) {
      l++;
    }
    else {
      r--;
    }
  }

  return maxArea;
};

function calcArea( arr, idx1, idx2 ) {
  return ( idx2 - idx1 ) * Math.min( arr[idx1], arr[idx2] );
}

