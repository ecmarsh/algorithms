/**
 * Combination Sum
 *
 * Given a set of candidate numbers (candidates) (without duplicates)
 * and a target number (target),
 * find all unique combinations in candidates where
 * the candidate numbers sums to target.
 *
 * The same repeated number may be chosen from
 * candidates unlimited number of times.
 *
 * Note:
 * -All numbers (including target) will be positive integers.
 * -The solution set must not contain duplicate combinations.
 *
 * @example
 * Input: candidates = [2,3,6,7], target = 7,
 * A solution set is:
 * [
 *  [7],
 *  [2,2,3]
 * ]
 *
 * Input: candidates = [2,3,5], target = 8,
 * A solution set is:
 * [
 *  [2,2,2,2],
 *  [2,3,3],
 *  [3,5]
 * ]
 *
 * Analysis:
 * N length of array
 * Time: O(N^target), worst case (2^N). Each number can be on or off (subset).
 * Space: O(target) (worst case call stack for all ones to get target)
 *
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
module.exports = function combinationSum( nums, target ) {
  if ( !nums || !nums.length ) {
    return [];
  }

  const res = [];

  const dfs = ( i, sum, inProgress ) => {
    if ( sum === target ) {
      res.push( [...inProgress] );
    }
    else {
      for ( i; i < nums.length; i++ ) {
        if ( sum + nums[i] <= target ) {
          inProgress.push( nums[i] );
          dfs( i, sum + nums[i], inProgress );
          inProgress.pop();
        }
      }
    }
  };

  dfs( 0, 0, [] );
  return res;
};

/*

i > 0 for candidates[i]
target > 0
Solution must be a set
sum(...solution[i]) = target

- sorted? doesnt matter

8,[2,3,5]
{2,2,2,2}
{2,3,3}
{3,5}

Have to try and then backtrack if no go


psuedo(A,target):
  edge cases:
    missing args

  recursive fn:
    fn args:( curIdx, curSum, inProgressSolutionSet )
      base case sum=target:
        add target to solution set

      for all in (curIdx, Alen-1)
        case curSum + A[curIdx] <= sum:
          add curIdx to solution set
          ->fn( curIdx, curSum + A[curIdx], inProgress )
          bt: remove from solution set
        else:
          continue loop to try with next as start

  recurse( 0, 0, [])
  return

*/
