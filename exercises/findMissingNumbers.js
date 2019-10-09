/**
 * Find All Numbers Disappeared in an Array
 *
 * Given an array of integers where 1 ≤ A[i] ≤ n (n = size of array),
 * some elements appear twice and others appear once.
 *
 * Find all the elements of [1..n] inclusive that do not appear in this array.
 *
 * @example
 * Input: [4,3,2,7,8,2,3,1]
 * Output: [5,6]
 *
 * @param {number[]} A
 * @return {number[]}
 */

/**
 * Intuitive Solution:
 * Store seen numbers on one loop. Output missing on second.
 * Time: O(2N) = O(N), where N is len(nums)
 * Space: O(N) to store seen numbers. (64*N bits compared to below solution)
 */
module.exports.intuitive = function findMissingNumbersIntuitive( A ) {
  const seen = Array( A.length + 1 ).fill( false );
  seen[0] = true;

  A.forEach( ( x ) => {
    seen[x] = true;
  } );

  const ret = [];

  seen.forEach( ( wasSeen, i ) => {
    if ( !wasSeen ) {
      ret.push( i );
    }
  } );

  return ret;
};

/**
 * Slightly Improved Solution (space):
 * Use one 64-bit int as bitset to store seen numbers.
 * Time: O(2N) = O(N) where N is len(nums)
 * Space: O(1) 8 bytes for one number, and for JS capped at 64 bits.
 *        Bit accuracy will only work up to len 32. (2^n bits in python)
 * Better improve in python with relatively unlimited int/long precision.
 */
module.exports.better = function findMissingNumbersBetter( A ) {
  if ( A.length > 32 ) {
    return module.exports.intuitive( A );
  }

  let set = 0;

  A.forEach( ( n ) => {
    if ( !( set & ( 1 << ( n-1 ) ) ) ) {
      set += ( 1 << ( n-1 ) );
    }
  } );

  const ret = [];

  A.forEach( ( _, i ) => {
    if ( !( set & ( 1 << i ) ) ) {
      ret.push( i+1 );
    }
  } );

  return ret;
};


/**
  * _Follow Up_
  * Could you do it without extra space and in O(n) runtime?
  * You may assume the returned list does not count as extra space.
  *
  * Indicate seen numbers by updating nums at index Ai to negative.
  * Then output non-negative indexes as missing to result.
  *
  * Analysis:
  * N is len(nums)
  * Time: O(2N) = O(N)
  * Space: O(1) not including output. Nums modified in place.
  */
module.exports.optimal = function findMissingNumbersOptimal( A ) {
  A.forEach( ( x ) => {
    const i = Math.abs( x ) - 1; // Numbers are 1-indexed
    A[i] = -Math.abs( A[i] );
  } );

  const ret = [];

  A.forEach( ( x, i ) => {
    x > 0 && ret.push( i + 1 );
  } );

  return ret;
};

