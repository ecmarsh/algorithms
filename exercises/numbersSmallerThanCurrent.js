/**
 * @lc id=1365 lang=javascript tags=presum
 *
 * [1365] How Many Numbers Are Smaller Than the Current Number
 * _Weekly Contest 178_
 *
 * Given the array nums, for each nums[i] find out how many numbers
 * in the array are smaller than it. That is, for each
 * nums[i] you have to count the number of valid j's
 * such that j != i and nums[j] < nums[i].
 * Return the answer in an array.
 *
 * @constraints
 * - `2 <= nums.length <= 500`
 * - `0 <= nums[i] <= 100`
 *
 * @example
 * Input: nums = [8,1,2,2,3]
 * Output: [4,0,1,1,3]
 * Explanation:
 * For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3).
 * For nums[1]=1 does not exist any smaller number than it.
 * For nums[2]=2 there exist one smaller number than it (1).
 * For nums[3]=2 there exist one smaller number than it (1).
 * For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).
 *
 * @example
 * Input: nums = [6,5,4,8]
 * Output: [2,1,0,3]
 *
 * @example
 * Input: nums = [7,7,7,7]
 * Output: [0,0,0,0]
 */

/**
 * Brute force solution: compare each pair.
 * @param {number[]} nums
 * @return {number[]}
 *
 * @complexity
 * Let: n = nums.length
 * Time: O(n^2)
 * Space: O(n): Output
 */
module.exports.bruteForce = function ( nums ) {

  const res = Array( nums.length ).fill( 0 );

  nums.forEach( ( n, i ) => {
    for ( let j = i + 1; j < nums.length; j++ ) {
      const m = nums[j];
      if ( n === m ) {
        continue;
      }
      if ( n < m ) {
        res[j] += 1;
      } else {
        res[i] += 1;
      }
    }
  } );

  return res;
};


/**
 * Optimal solution:
 * @param {number[]} nums
 * @return {number[]}
 *
 * @complexity
 * Let: n = nums.length
 * Time: O(n): Never more than 101 for count, limited by return of n
 *   - Could also argue O(1) since nums length is never more than 500
 * Space: O(2n) ~= O(n): Counts + output array
 *   - Note we could overwrite nums res if needed to n space
 */
module.exports.default = function ( nums ) {
  // NOTE: using example nums=[5,1,2,2,3]

  // nums[i] is between 0 and  100, inclusive
  const count = Array( 101 ).fill( 0 );

  // 1. record the occurences of each number in nums
  nums.forEach( n => {
    count[n] += 1;
  } );
  // count = [ 0, 1, 2, 1, 0, 1 ]

  // 2. the cumulative sum at each n is the count of
  //    occurences of numbers smaller than the current number
  count.forEach( ( _, i ) => {
    count[i] += count[i-1] || 0;
  } );
  // count = [ 0, 1, 3, 4, 4, 5 ]

  // if n is zero, no numbers are greater
  // otherwise, it is the number of smaller occurences in count
  return nums.map( n => n && count[n-1] );
  // nums =     [ 5, 1, 2, 2, 3 ]
  // res =      [ 4, 0, 1, 1, 3 ]
};
