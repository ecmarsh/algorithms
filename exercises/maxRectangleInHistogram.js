/**
 * Largest Rectangle in a Histogram
 *
 * Given n non-negative integers representing the histogram's bar height
 * where the width of each bar is 1, find the area of largest rectangle.
 *
 * @example
 * Input: [2,1,5,6,2,3]
 * Output: 10
 * https://assets.leetcode.com/uploads/2018/10/12/histogram_area.png
 *
 * Analysis:
 * N is width of histogram (heights.length)
 * Time: O(2(N + 1)) N numbers pushed and popped from stack = O(N)
 * Space: O(N) worst case for stack.
 *
 */

/**
 * @param {number[]} heights
 * @return {number}
 */
module.exports = function largestRectangleArea( heights ) {
  if ( !heights || !heights.length ) return 0;

  const stack = [-1];
  stack.peek = () => stack[stack.length - 1];

  let maxArea = 0;
  const updateMaxArea = ( x ) => {
    const height = heights[stack.pop()];
    const width = x - stack.peek() - 1;
    maxArea = Math.max( maxArea, height * width );
  };

  heights.forEach( ( height, i ) => {
    while ( stack.peek() !== -1 && heights[stack.peek()] >= height ) {
      updateMaxArea( i );
    }
    stack.push( i );
  } );

  while ( stack.peek() !== -1 ) {
    updateMaxArea( heights.length );
  }

  return maxArea;
};

