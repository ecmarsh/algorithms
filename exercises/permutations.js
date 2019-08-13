/**
 * Permutations
 *
 * Given a collection of distinct integers,
 * return all possible permutations.
 *
 * @example
 * Input: [1,2,3]
 * Output:
 * [
 *  [1,2,3],
 *  [1,3,2],
 *  [2,1,3],
 *  [2,3,1],
 *  [3,1,2],
 *  [3,2,1],
 * ]
 *
 * Implemented using Heap's algorithm.
 * Time:
 *  k permutations of N -> O(N!/(N-k)!)
 *  Slightly better than O(N * N!), slightly slower than O(N!);
 * Space: O(N!) <- output array
 *
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
module.exports = function permute( nums ) {
  const len = nums.length,
    permutations = [];

  if ( len ) {
    backtrack( len, 0, nums, permutations );
  }

  return permutations;
};

function backtrack( k, first, cur, all ) {
  if ( k === first ) {
    all.push( [...cur] );
  }

  for ( let i = first; i < k; ++i ) {
    // 1. Place `i`th integer first in cur
    swap( cur, first, i );
    // 2. Complete permutations with rest
    backtrack( k, first + 1, cur, all );
    // 3. Backtrack by using new first
    swap( cur, first, i );
  }
}

function swap( arr, i, j ) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
