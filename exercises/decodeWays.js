/**
 * Decode Ways
 *
 * A message containing letters from A-Z is being
 * encoded to numbers using the following mapping:
 * '1'=A
 * '2'=B
 * ...
 * '26'=Z
 *
 * Given a non-empty string containing only digits,
 * determine the total number of ways to decode it.
 *
 * @example
 * Input: "12"
 * Output: 2
 * Explanation: It could be decoded as "AB" (1 2) or "L" (12).
 *
 * Input: "226"
 * Output: 3
 * Explanation: It could be decoded as "BZ" (2 26),
 *              "VF" (22 6), or "BBF" (2 2 6).
 *
 * Analysis:
 * Time: O(N)
 * Space: O(1) (Can be O(N) if do full dp, but only need to look two back)
 *
 */

/**
 * @param {string} s
 * @return {number}
 */
module.exports = function numDecodings( s ) {
  let count = 0,
    cur = 1,
    prev = 1;

  for ( let i = 0; i < s.length; i++ ) {
    if ( +s[i] ) {
      count += cur;
    }

    const twoDigitNum = +( s[i-1] + s[i] );
    if ( twoDigitNum >= 10 && twoDigitNum <= 26 ) {
      count += prev;
    }

    prev = cur;
    cur = count;
    count = 0;
  }

  return cur;
};

// Recursively (much slower, but more explicit):
module.exports.numDecodingsRecurisve = function( s ) {
  let ways = 0;

  const decode = i => {
    if ( i === s.length ) {
      ways++;
    }
    else {
      if ( +s[i] ) {
        decode( i + 1 );
      }
      if ( i < s.length - 1 && +s[i] && +( s[i] + s[i+1] ) <= 26 ) {
        decode( i + 2 );
      }
    }
  };

  decode( 0 );
  return ways;
};

/*

Choices:
1. Just digit ( always true if digit not 0 since 1-9 <= 26)
And 2. Is digit plus next digit < 26? -> Check perms from there.

*/
