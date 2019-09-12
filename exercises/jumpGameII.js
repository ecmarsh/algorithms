/**
 * Jump Game II
 *
 * Variant of: https://github.com/ecmarsh/algorithms-py/jump_game_I.py
 *
 * Given an array of non-negative integers,
 * you are initially positioned at the first index of the array.
 *
 * Each element in the array is your maximum jump length from that position.
 *
 * Your goal is to reach the last index in the minimum number of jumps.
 *
 *
 * @example
 * Input: [2,3,1,1,4]
 * Output: 2
 * Explanation: The minimum number of jumps to reach last index is 2.
 *              Jump 1 step from 0 to 1 then 3 steps to index 4, which is last.
 *
 *
 * Analysis:
 * N is len(nums)
 * Time: O(N)
 * Space: O(1)
 * ... much better than brute force of N^2 to calc all possible jumps to end.
 *
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
module.exports = function jumpGameII( nums ) {
  nums.pop(); // We don't care about last index

  const n = nums.length;

  if ( n <= 1 ) return n;

  let jumpCount = 0;
  let jumpTo = 0;
  let farthest = 0;

  const jump = () => {
    jumpCount += 1;
    jumpTo = farthest;
  };

  // A slight improvement is to break out (with diff iter method)
  // as soon as farthest >= nums.length - 1 (or len after pop)
  nums.forEach( ( num, i ) => {
    farthest = Math.max( farthest, i + nums[i] );
    i === jumpTo && jump();
  } );

  return jumpCount;
};
