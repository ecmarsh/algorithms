/**
 * __House Robber__
 *
 * You are a professional robber planning to rob houses along a street.
 * Each house has a certain amount of money stashed, the only constraint
 * stopping you from robbing each of them is that adjacent houses have
 * security system connected and it will automatically contact the police
 * if _two adjacent houses_ were broken into on the same night.
 *
 * Given a list of _non-negative_ integers representing the amount of money
 * of each house, determine the maximum amount of money you can rob tonight
 * _without alerting the police_.
 *
 *
 * @example
 * Input: [1, 2, 3, 1]
 * Output: 4
 * Explanation: Rob house 1 ($=1) and then house 3 ($=3). Total $ is 1+3=$4.
 * @example
 * Input: [2, 1, 1, 2]
 * Output: 4
 * Explanation: Rob house 1, skip 2 and 3, then rob house 4. Total is 2+2 = 4.
 *
 *
 * Analysis:
 * N is total houses.
 * Time: O(N), where N is total houses (nums.length).
 * Space: O(1)
 *
 */


/**
 * @param {number[]} houses
 * @return {number}
 */
module.exports.robMaxMoney = function robMaxMoney( nums ) {
  if ( !nums || !nums.length ) {
    return 0;
  }
  /**
   * _f(i) = MAX( f(i-2) + Ai, f(i-1) )_
   * At each index, we can either rob it or not rob it.
   * We use (i-2) as the previous max and (i-1) as the current max.
   * If we decide to rob it based on total $, we update i with current max,
   * or we skip it and just use the same current max for the next index.
   */
  nums[-1] = 0;
  nums[-2] = 0;

  nums.forEach( ( num, i ) => {
    if ( nums[i - 2] + num > nums[ i - 1 ] ) {
      nums[i] = nums[i - 2] + num;
    } else {
      nums[i] = nums[i - 1];
    }
  } );

  return nums[nums.length - 1];
};

/**
 * Shorter functional programming solution.
 * See first solution for more explicit clarificaiton.
 */
/* eslint-disable arrow-body-style */
module.exports.robFP = ( nums ) => {
  return nums.reduce( ( [prevMax, curMax], num ) => {
    return [curMax, Math.max( curMax, prevMax + num )];
  }, [0, 0] ).pop();
};
