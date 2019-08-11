/**
 * Swap for Longest Repeated Character Substring
 * _Weekly Contest 149 Submission_
 *
 *
 * Given a string text, we are allowed one swap of two of the characters.
 * Find the length of the longest substring with repeated characters.
 *
 * @example
 * Input: 'ababa'
 * Output: 3
 * Explanation: Swap first 'b' with last 'a' or last 'b' with first 'a'.
 *
 * @example
 * Input: 'aaabaaa'
 * Output: 6
 * Explanation: Swap 'b' with first or last 'a'.
 *
 * @example
 * Input: 'aaabbaaa'
 * Output: 4
 *
 * @example
 * Input: 'aaaaa'
 * Output: 5
 * Explanation: No need to swap, longest repeated character is 'aaaaa'
 *
 * @example
 * Input: 'abcdef'
 * Output: 1
 *
 */

/**
 * @param {string} text
 * @return {number}
 */
module.exports = function maxRepOpt1( text ) {
  let longest = 0;
  const n = text.length,
    start = String.prototype.charCodeAt.call( 'a', 0 ),
    end = String.prototype.charCodeAt.call( 'z', 0 );


  for ( let c = start; c <= end; c++ ) {
    let count = 0;
    const char = String.fromCharCode( c );

    for ( let i = 0; i < n; i++ ) {
      if ( text[i] == char ) {
        count++;
      }
    }

    if ( count === n ) {
      return count;
    }

    for ( let i = 0; i < n; i++ ) {
      if ( text[i] === char ) {
        continue;
      }

      let left = i, right = i;

      while ( left > 0 && text[left - 1] === char ) {
        left--;
      }
      while ( right < n - 1 && text[right + 1] === char ) {
        right++;
      }

      const maxWithSwap = right - left;

      longest = maxWithSwap === count
        ? Math.max( longest, count )
        : Math.max( longest, maxWithSwap + 1 );
    }
  }

  return longest;
};
