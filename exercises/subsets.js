/**
 * Subsets
 *
 * Given a set of _distinct_ integers, `nums`,
 * return all possible subsets (the power set).
 *
 * _Note_: The solution must not contain duplicate subsets.
 *
 * @example
 * Input: nums = [1,2,3]
 * Output:
 * [
 *  [3],
 *  [1],
 *  [1,2,3],
 *  [1,3],
 *  [2,3],
 *  [1,2],
 *  []
 * ]
 *
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
module.exports = function subsets( nums ) {
  const setLen = nums.length,
    subsetLen = 2**setLen,
    subsets = [];

  for ( let i = 0; i < subsetLen; i++ ) {
    const subset = [];

    for ( let j = 0; j < setLen; j++ ) {
      if ( i & ( 1 << j ) ) {
        subset.push( nums[j] );
      }
    }

    subsets.push( subset );
  }

  return subsets;
};
