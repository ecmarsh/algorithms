/**
 * @lc id=264 lang=javascript tag=math,dp,prime
 *
 * [264] Ugly Numbers II
 *
 * Ugly numbers are **positive** numbers whose prime factors
 * only include 2, 3, 5.
 *
 * Write a program to find the n-th ugly number.
 *
 * @constraints
 * - `1` is treated as an ugly number
 * - 1 <= n <= 1690
 *
 * @example
 * Input: n=10
 * Output: 12
 * Explanation: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence
 *  of the first 10 ugly numbers.
 *
 * @complexity
 * Time: O(1) since N never larger than 1690, but O(N) otherwise
 * Space: O(1) since N never larger than 1690, O(N) to store sequence otherwise
 */

/**
 * @param {number} n
 * @return {number} The nth ugly number
 */
module.exports = function nthUglyNumber( n ) {
  /*
    Idea is to compute the next ugly number in the sequence by keeping
    pointers to the last ugly number multiplied by the prime factor and
    determining the minimum of (n2 * 2, n3 * 3, n5 * 5).

    Since ugly numbers must only have prime factors of 2, 3, 5,
    we can generate larger ugly numbers by multiplying smaller
    ugly numbers by one of those prime factors.
  */

  // Our initial condition is 1 (see constraints)
  const uglies = [1];

  // Index pointers to last multiplied by 2,3,5
  let i2 = 0;
  let i3 = 0;
  let i5 = 0;

  while ( uglies.length < n ) {

    const opt2 = uglies[i2] * 2;
    const opt3 = uglies[i3] * 3;
    const opt5 = uglies[i5] * 5;

    // Determine the next number in the uglyNumber sequence
    const nextUgly = Math.min( opt2, opt3, opt5 );
    uglies.push( nextUgly );

    // NOTE: Don't use if else, if condition satisfies both,
    // increment both to avoid against repeat numbers.
    // For example, at 2*5 = 10, we increment both i2 and i5.
    if ( nextUgly === opt2 ) i2 += 1;
    if ( nextUgly === opt3 ) i3 += 1;
    if ( nextUgly === opt5 ) i5 += 1;
  }

  return uglies[n-1]; // the nth ugly number in sequence
};
