/**
 * @lc id=1062 lang=javascript tag=string,binary search
 *
 * [1062] Longest Repeating Substring
 *
 * Given a string, `str`, find the length of the longest repeating
 * substring(s). Return `0` if no repeating substring exists.
 *
 * @constraints
 * - The string S consists of only lowercase English letters
 *   from 'a' - 'z'.
 * - `1 <= S.length <= 1500`
 *
 *
 * @examples
 * Input: "abcd"
 * Output: 0
 * Explanation: No repeating substring.
 *
 * Input: "abbaba"
 * Ouput: 2
 * Explanation: The longest repeating substrings are "ab" and "ba",
 *              each of which occurs twice.
 *
 * Input: "aaaaa"
 * Ouput: 4
 * Explanation: The longest repeating substring is "aaaa", which occurs twice.
 *
 *
 * @complexity
 * Vars: n = str.length
 * Time: O(n log n) avg case, O(n^2) worst case for small n (close to n/2)
 *       - log n checks and n for each length
 * Space: O(n^2) for hashset worst case with late duplicates or no duplicates.
 */


/**
 * @param {string} str
 * @return {number}
 */
module.exports = function longestRepeatingSubstring( str ) {
  const len = str.length;

  // search str for repeating substring of length n
  const hasDuplicate = ( n ) => {
    const seen = new Set();
    for ( let i = 0; i < ( len - n + 1 ); i++ ) {
      const sub = str.slice( i, i + n );
      if ( seen.has( sub ) ) {
        return true;
      }
      seen.add( sub );
    }
    return false;
  };

  // binary search for repeating substrings from lo, hi
  let [lo, hi] = [0, len];

  while ( lo <= hi ) {
    const subLen = hi + lo >> 1;
    if ( hasDuplicate( subLen ) ) {
      lo = subLen + 1;
    } else {
      hi = subLen - 1;
    }
  }

  return lo - 1;
};
