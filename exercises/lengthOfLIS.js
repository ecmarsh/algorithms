/**
 * @=lc id=300 lang=javascript tag=binsearch,dp
 *
 *
 * [300] Longest Increasing Subsequence
 *
 *
 * Given an unsroted array of integers, find the length
 * of the longest strictly increasing subsequence.
 *
 * @example
 * Input: [10,9,2,5,3,7,101,18]
 * Output: 4
 * Explanation: The longest increasing subsequence is [2,3,7,101].
 *
 *
 * @complexity
 * n is len(nums)
 * Time: O(n log n) n searches taking worst case log n time
 * Space: O(n) worst case if entire array is subsequence
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
module.exports = function lengthOfLIS( nums ) {
  if ( !nums || !nums.length ) return 0;

  // tails stores lowest num of decreasing subsequences in order
  // which together represent the longest increasing subsequence
  const tails = [];
  let lis = 0;

  nums.forEach( ( num ) => {
    const i = bisect( tails, 0, lis, num );
    tails[i] = num;
    i === lis && lis++;
  } );

  return lis;
};

const bisect = function( A, lo, hi, x ) {
  while ( lo < hi ) {
    const mid = ( hi + lo ) >> 1;
    if ( A[mid] < x ) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
};

/*

PATIENCE SORTING:

https://www.cs.princeton.edu/courses/archive/spring13/cos423/lectures/LongestIncreasingSubsequence.pdf

Maintain candidates of of decreasing subsequence list, "piles" by:

Case 1. If A[i] is smallest among all end
   candidates (tails) of active lists, start new one with A[i].

Case 2. If A[i] is largest among all end candidates of
  active lists, push A[i].

Case 3. If A[i] is in between, find a list with
  largest end element that is smaller than A[i].
  Clone and extend this list by A[i] (or keep pointer to other list).
  Discard all other lists of same length as that of this modified list.

The LIS is the number of active lists in the end.

*/
