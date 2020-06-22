/**
 * @lc id=137 lang=javascript tag=bit,hashmap
 *
 * [137] Single Number II
 * _Find Unique Number Variant_
 *
 * Given a non-empty array of integers, every element appears three times
 * except for one, which appears exactly once. Find that single one.
 *
 * @example
 * Input: [2,2,3,2]
 * Output: 3
 *
 * @example
 * Input: [0,1,0,1,0,1,99]
 * Output: 99
 *
 * @complexity
 * Let N = nums.length
 * Brute force comparing all: O(N^2) time, O(1) space
 * With hashmap: O(N) time and O(N/3) -> O(N) space
 * Optimal w/ bit shifting: O(N) time, O(1) space
 *
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
module.exports = function singleNumber( nums ) {
  let seen1x = 0;
  let seen2x = 0;

  nums.forEach( ( num ) => {
    seen1x = ~seen2x & ( seen1x ^ num );
    seen2x = ~seen1x & ( seen2x ^ num );
  } );

  return seen1x;
};

/*

Need to bitmasks to separate 3x from 1x:
bitmask1, bitmask2

1x Appearance:
  - adds num to bitmask1
  - does NOT add to bitmask2 because of presence in bitmask1

2x Apperance:
  - removes num from bitmask1
  - adds num to bitmask2

3x Appearance:
  - does NOT add to bitmask1 because its in bitmask2
  - removes num from bitmask2

Since 2x apperance removes from bitmask 1,
and 3x appearance does NOT add it back,
bitmask1 will be only those that did not make it to 2x appearance.

Key properties:
  0 ^ x = x
  x ^ x = 0
  x & x = x
 ~x & x = 0
  x & 0 = 0
 ~0 & x = x

*/

/**
 * Suboptimal solution with hashmap.
 * @param {number[]} nums
 * @return {number}
 * @complexity T(N) = O(N), S(N) = O(N)
 */
module.exports.subOptimal = function singleNumberSubOptimal( nums ) {
  const counter = new Map; // { num -> count }
  nums.forEach( ( num ) => {
    counter.set( num, counter.get( num ) + 1 || 1 );
  } );
  for ( const [num, count] of counter ) {
    if ( count === 1 ) {
      return num;
    }
  }
  return -1;
};
