/**
 * N-th Tribonacci Number
 * Weekly Contest 147
 * Runtime: 56ms | Memory: 33.8MB
 *
 * The Tribonacci sequence Tn is defined as follows:
 * T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.
 * Given n, return the value of Tn.
 *
 * @example
 * Input: n = 4
 * Output: 4
 * Explanation:
 * T_3 = 0 + 1 + 1 = 2
 * T_4 = 1 + 1 + 2 = 4
 *
 * @param {number} n
 * @return {number}
 *
 */

module.exports = function tribonacci( n ) {
  const mem = {0:0,1:1,2:1};
  return ( function fib( n ) {
    if ( mem[n] === undefined ) {
      mem[n] = fib( n-1 )+fib( n-2 )+fib( n-3 );
    }
    return mem[n];
  } )( n );
};
