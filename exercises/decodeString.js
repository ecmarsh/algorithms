/**
 * Decode String
 *
 * Given an encoded string, return its decoded string.
 *
 * The encoding rule is: k[encoded_string], where the encoded_string
 * inside the square brackets is being repeated exactly k times.
 * Note that k is guaranteed to be a positive integer.
 *
 * You may assume that the input string is always valid;
 * No extra white spaces, square brackets are well-formed, etc.
 *
 * Furthermore, you may assume that the original data does not
 * contain any digits and that digits are only for those repeat numbers, k.
 * For example, there won't be input like 3a or 2[4].
 *
 * @example
 * Input: '3[a]2[bc]'
 * Output: 'aaabcbc'
 *
 * Input: '3[a2[c]]'
 * Output: 'accaccacc'
 *
 * Input: '2[abc]3[cd]ef'
 * Output: 'abcabccdcdcdef'
 *
 * Analysis:
 * Time: O(N) <- where n is len of string, steps through each char of s.
 * Space: O(N) <- worst case if every character is nested for call stack.
 *
 */

/**
 * @param {string} str
 * @return {string}
 */
module.exports = function decodeString( s ) {
  if ( !s ) {
    return '';
  }

  const explore = ( start ) => {
    let decoded = '';

    while ( start < s.length && !/\]/.test( s[start] ) ) {
      // If it's not a digit or bracket, just take the char.
      if ( /[^[\d]/.test( s[start] ) ) {
        decoded += s[start];
      }
      // If it is a digit, start a new exploration.
      else if ( /\d/.test( s[start] ) ) {
        const rpt = parseInt( s.slice( start ) ).toString();
        start += rpt.length + 1; // Skip numLen + '['

        const exploredResult = explore( start );
        start = exploredResult.endIndex;
        decoded += exploredResult.decodedStr.repeat( +rpt );
      }

      start++;
    }

    return new ExploredResult( decoded, start );
  };

  return explore( 0 ).decodedStr;
};


/**
 * Defines result for exploring encoded string within brackets.
 * @param {string} decodedStr The decoded string itself.
 * @param {number} endIndex The index of the string explored til.
 */
function ExploredResult( decodedStr, endIndex ) {
  this.decodedStr = decodedStr;
  this.endIndex = endIndex;
}
