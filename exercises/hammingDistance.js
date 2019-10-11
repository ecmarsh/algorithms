/**
 * Hamming Distance
 *
 * The Hamming distance between two integers is the number of
 * positions at which the corresponding bits are different.
 *
 * Given two integers x and y, calculate the Hamming Distance.
 *
 * Constraints:
 *  - `0 <= x, y <= 2^31`
 *
 *  @example
 *  Input: x=1, y=4
 *  Output: 2
 *  Explanation:
 *  1   (0 0 0 1)
 *  4   (0 1 0 0)
 *         ↑   ↑
 * The above arrows point to positions where the corresponding bits differ.
 *
 * Analysis:
 * Time: O(32) worst case if x is 2^31 and y is 0 -> O(1)
 * Space: O(1) XOR int z and hd are both 64 bit ints -> O(1)
 */

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
module.exports = function hammingDistance( x, y ) {
  /**
   * Initially, XOR (^) returns int where bits differ between x and y.
   * And z &= z-1 removes changes the least most '1' bit to 0
   */
  let hd = 0;
  for ( let z = x^y; z !== 0; z &= z-1 ) {
    hd += 1;
  }
  return hd;
};
