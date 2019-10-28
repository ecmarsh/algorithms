/**
 * @=lc id=89 lang=javascript tag=bit
 *
 * [89] Gray Code
 *
 * The gray code is a binary numeral system where two successive values
 * differ in only one bit.
 *
 * Given a non-negative integer `n` representing the total number
 * of bits in the code, print the sequence of gray code.
 * A gray code sequence must begin with 0.
 *
 * @example
 * Input: 2
 * Output: [0,1,3,2]
 * Explanation:
 * 	00 - 0
 * 	01 - 1
 * 	11 - 3
 * 	10 - 2
 * For a given n, a gray code sequence may not be uniquely defined.
 * For example, [0,2,3,1] is also a valid gray code sequence.
 * 	00 - 0
 * 	10 - 2
 * 	11 - 3
 * 	01 - 1
 *
 * @example
 * Input: 0
 * Output: [0]
 * Explanation: We define the gray code sequence to begin with 0.
 * A gray code sequence of n has size = 2n, which for n = 0 the
 * size is 20 = 1. Therefore, for n = 0 the gray code sequence is [0].
 *
 *
 * @complexity
 * T(n) = T(n-1)+O(2^(n-1) => O(2^n), assuming integers fit word size.
 * S(n) = O(2^n) for output array.
 */

/**
 * Improved solution (from backtracking below) using analytical approach.
 * Build up the gray code from 0...2^n bits.
 * To get around issue of code being violated from a leading 0 -> 1,
 * reverse the order when transitioning to build the gray code.
 * @param {number} n
 * @return {number[]}
 */
module.exports.optimal = function grayCode( n ) {
  const code = [0]; // First is always 0, and 2^0=1
  for ( let i = 0; i < n; i++ ) {
    // prepend one in reversed order
    const bit = 1 << i;
    for ( let j = code.length-1; j >= 0; j-- ) {
      code.push( code[j] + bit );
    }
  }
  return code;
};

/**
 * Back tracking solution (TLE/Stack overflow for n >=16)
 * Time is 2^(n^2) worst case trying all combinations for each bit.
 * Space is 2^n for output/stack.
 * @param {number} n
 * @return {number[]}
 */
module.exports.backtrack = function grayCodeBacktrack( n ) {
  const ret = [0];
  directedGrayCode( n, new Set( [0] ), ret );
  return ret;
};

// Directed gray code adds one bit diff using current codes.
const directedGrayCode = function( bits, set, ret ) {
  // If at target length, ensure first,last differ by one bit
  if ( ret.length === ( 1<<bits ) ) {
    return isOneBitDiff( ret[0], ret[ret.length-1] );
  }
  // The last added code is the last in result/ret.
  // Try each number that differs by one bit from prev,
  // backtracking if it doesn't work, until at target length.
  const prev = ret[ret.length-1];
  for ( let i = 0; i < bits; i++ ) {
    const curr = prev ^ ( 1<<i ); // toggle bit
    // try the current code if not yet in set
    if ( !set.has( curr ) ) {
      set.add( curr );
      ret.push( curr );
      if ( directedGrayCode( bits, set, ret ) ) {
        return true;
      }
      // curr code doesn't work here, backtrack
      ret.pop();
      set.delete( curr );
    }
  }
  return false;
};

const isOneBitDiff = function( x, y ) {
  const diff = x ^ y;
  return diff && !( diff & diff-1 );
};

