/**
 * Majority Element
 *
 * Given an array of size n, find the majority element.
 * The majority element is the element that appears more than ⌊ n/2 ⌋ times.
 * You may assume that the array is non-empty and the majority element
 * always exists in the array.
 *
 * @example
 * Input: [3,2,3]
 * Output: 3
 * @example
 * Input: [2,2,1,1,2,2]
 * Output: 2
 *
 * Could you solve it in O(1) space?
 *
 * Analysis:
 * N is len(nums)
 * Time: O(N) (See below)
 * Space: O(1)
 */
/**
 * https://en.wikipedia.org/wiki/Boyer-Moore_majority_vote_algorithm
 * Maintains a count and increments if count is current candidate
 * element. Whenever count is 0 we set it to the current candidate.
 * Since the majority element will occur more times than the others,
 * this ensures we'll have the majority candidate at the end.
 * Note that if we were not sure whether there was a majority element
 * in the array, we'd need to do another pass to double check.
 *
 * More intuitive solutions will either use O(N) space or have
 * greater time complexities (e.g sorting at NlogN).
 *
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
module.exports = function majorityElement( nums ) {
  let majorityEl;
  let count = 0;

  nums.forEach( ( num ) => {
    if ( count === 0 ) {
      majorityEl = num;
    }
    count += ( num === majorityEl ) ? 1 : -1;
  } );

  return majorityEl;
};

