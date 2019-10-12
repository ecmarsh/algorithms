/**
 * Subsets II (Powerset With Duplicates)
 *
 * Given a collection of integers that might contain duplicates,
 * return all possible subsets (the power set).
 *
 * Note: The solution set must not contain duplicate subsets.
 *
 * @example
 * Input: [1,2,2]
 * Output:
 * [
 *   [2],
 *   [1],
 *   [1,2,2],
 *   [2,2],
 *   [1,2],
 *   [],
 * ]
 *
 * _See solutions for complexity analysis._
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/**
 * Iterative with map solution: generate the powerset, but keep result as a set.
 * Since arrays can't be easily compared, use a map with unique keys for set.
 * Complexity:
 *   Time: nlogn sort + n*2^n + 2^n grab all subsets = n(2^n + logn)
 *   Space: worst case no dups -> 2^n keys + 2^n subsets of avg size n/2=O(2^n)
 */
function subsetsWithDups1( nums ) {
  const n = nums.length;
  const setLen = 1 << n; // Powerset size = 2^n
  const subsets = {}; // [setkey: string]: subset [number]

  nums.sort( ( a, b ) => a - b ); // To normalize keys

  for ( let i = 0; i < setLen; i++ ) {
    const subset = [];
    let key = '';
    for ( let j = 0; j < n; j++ ) {
      if ( i & ( 1 << j ) ) {
        key += nums[j];
        subset.push( nums[j] );
      }
    }
    subsets[key] = subset;
  }

  return Object.values( subsets );
}
module.exports.mapSolution = subsetsWithDups1;

/**
 * Recursive backtrack solution: generate powerset, but skip duplicates.
 * Complexity:
 *   Time: nlogn sort + n*2^n = n(2^n + logn) Same as powerset plus sort.
 *   Space: worst case no duplicates is same as powerset.
 *          stack space reaches max depth of n at any time = O(n)
 *          output would be 2^n sets average of n/2 = n * 2^n
 *          so total is n/2 * 2^n + n = O(n*2^n)
 */
function subsetsWithDups2( nums ) {
  nums.sort( ( a, b ) => a - b ); // Sort for duplicate checking

  const backtrack = ( subsets, partial, offset ) => {
    const completeSubset = Array.prototype.concat.call( partial );
    subsets.push( completeSubset );
    for ( let i = offset; i < nums.length; i++ ) {
      if ( i > offset && nums[i] === nums[i-1] ) {
        continue;
      }
      partial.push( nums[i] );
      backtrack( subsets, partial, i+1 );
      partial.pop();
    }
    return subsets;
  };

  return backtrack( [], [], 0 );
}
module.exports.backtrackSolution = subsetsWithDups2;

