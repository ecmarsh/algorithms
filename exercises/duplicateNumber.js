/**
 * @lc id=287 lang=javascript tag=bit,floyd
 *
 * [287] Find the Duplicate Number
 *
 * Given an array `nums` containing `n+1` integers, where each integer
 * is between 1 and n, inclusive, find the duplicate number.
 *
 * @constraints
 * - The input array is read-only.
 * - Runtime complexity should be less than O(n^2)
 * - Only one duplicate in the array, but may be repeated more than once.
 * - Try to use O(1) extra space.
 *
 * @example
 * Input: [1,3,4,2,2]
 * Ouput: 2
 *
 * @example
 * Input: [3,1,3,4,2]
 * Output: 3
 *
 * @complexity See corresponding solutions
 */

/**
 * Floyd's Tortoise and Hair solution using List intersection
 * See https://leetcode.com/articles/find-the-duplicate-number/#approach-3-floyds-tortoise-and-hare-cycle-detection for explanation
 * @param {number[]} nums
 * @return {number}
 *
 * @complexity
 * Time: O(N)
 * Space: O(1)
 */
module.exports.optimal = function findDuplicateFloyd( nums ) {
  const start = nums[0];

  // Find the intersection point.
  // A cycle appears because the nums must contain duplicates.
  // Fast moves twice as fast as slow, so at some point, fast
  // catches up to slow, which gives us the intersection point.
  // Note the intersection point is not the same as the cycle
  // entrance, which is what this solution is looking for.

  let slow = start;
  let fast = start;
  fast = nums[fast];

  while ( slow !== fast ) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }

  // Now fast has traversed twice as many indexes as slow.
  // 2d(fast)=d(slow)
  // 2(F + a) = F + nC + a, where n is some integer
  // So the coordinate of intersection point is F + a = nC
  // Fast starts from zero, so its position after F steps is F
  // Slow starts from the intersection point F + a = nC, so position
  // after F steps is nC + f, which is the same point as F.
  // With both moving at the same speed, they meet at entrance of cycle.

  // Reset fast
  fast = 0;
  // Move slow and fast at the same speed to find cycle entrance.
  while ( slow !== fast ) {
    slow = nums[slow];
    fast = nums[fast];
  }

  // Slow === fast, so both are the cycle entrance. Return either one.
  return fast;
};

/**
 * Bit set solution
 * @param {number[]} nums
 * @return {number}
 *
 * @complexity
 * Time: O(N)
 * Space: O(2^N), but N is number of bits
 */
module.exports.suboptimal = function findDuplicateBitset( nums ) {
  const WORD_SIZE = 30;
  const words = Array( 5 ).fill( 0 ); // Accounts for up to length 150.
  for ( const num of nums ) {
    const word = 0 | num / WORD_SIZE;
    if ( ( words[word] & ( 1 << ( num % WORD_SIZE ) ) ) !== 0 ) {
      return num;
    }
    words[word] ^= ( 1 << ( num % WORD_SIZE ) );
  }
  return -1;
};

// NOTE: A third solution for O(N log N) time with constant space is to
// use binary search on set of numbers [1,..,n] and count how many
// elements of array are <= or >= that number then recurse as appropriate.
