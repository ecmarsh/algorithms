/**
 * @lc id=402 lang=javascript tag=stack,greedy,numberphilia,oracle
 *
 * [402] Remove K Digits
 *
 * Given a non-negative integer num represented as a string,
 * remove k digits from the number so that the new number
 * is the smallest possible.
 *
 * Note that the output should not contain any leading zeros.
 *
 * @constraints
 * - The length of num is less than 10002 and will be ≥ k.
 * - The given num does not contain any leading zero.
 *
 * @example
 * Input: num = "1432219", k = 3
 * Output: "1219"
 * Explanation: Remove the three digits 4, 3, and 2
 *              to form the new number 1219 which is the smallest.
 *
 * @example
 * Input: num = "10200", k = 1
 * Output: "200"
 * Explanation: Remove the leading 1 and the number is 200.
 *              Note that the output must not contain leading zeroes.
 *
 * @example
 * Input: num = "10", k = 2
 * Output: "0"
 * Explanation: Remove all the digits from the number and
 *              it is left with nothing which is 0.
 *
 * @complexity
 * Time: O(N) where N is num.length
 * Space: O(N) to hold stack
 */

/*

If two sequences of digit are same length,
the leftmost distinct digits determine superior of two numbers:
    - A = 1axxx, B = 1bxxx
    -> if a > b, then A > B

Given [D1,D2,D3,...Dn] if D2 < D1 then we should remove D1 to
obtain the minimum result.

PSUEDO:

Greedy w/ stack:

- Use stck to hold digits we keep at end
- If digit is less than top of stack (eg left neighbor), pop the stack
  to remove the left neighbor. At the end push digit to stack.
- Repeat above until stack is empty (no more digits left or already removed k digits).

Corner cases:
1) After main loop, removed m digits, but m < k (eg m ==0), remove
   additional k-m digits from tail sequence.
2) After removing k digits, there are leading zeros needed to strip.
3) Might end up removing all numbers from sequence -> return 0 instead of empty string.

Example:
Input: [1,2,3,4,5,2,6,4], k = 4
Rule triggered first at 5 since 2 < 5, then at 4, then at 3, then 6
    -> 1224

*/

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
module.exports = function removeKDigits( num, k ) {
  if ( num.length === k ) return '0';
  if ( k === 0 ) return num;

  const stack = [];

  num.split( '' ).forEach( ( digit ) => {
    // We remove a digit if the left digit (top of stack) is greater
    // than the current digit. (eg not monotonically increasing).
    while ( stack.length && k > 0 && stack[stack.length-1] > digit ) {
      stack.pop();
      k -= 1;
    }
    stack.push( digit );
  } );

  // If removed less than k digits, remove remaining needed from tail
  // then trim any leading zeros.
  while ( k-- > 0 ) {
    stack.pop();
  }

  // Trim leading zeros
  return stack.join( '' ).replace( /^0+/, '' ) || '0'; // in case num is '0' -> empty string
};
