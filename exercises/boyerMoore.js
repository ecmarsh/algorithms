/**
 * Boyer-Moore String Search Algorithm
 *
 * Allows linear time in search by skipping indices when
 * searching inside of a string for a pattern.
 *
 * 1. Build bad match table that indicates indices ok to skip.
 * 2. When scanning string, use bmt value or 1.
 *
 * Best case: All characters in pattern are same so can shift by pattern length.
 * Time: O(W/T) where W=length of string being searched, T=pattern length
 * Space: O(1) since only one value stored in BMT.
 *
 * Worst Case: String has pattern at end of string and preceding all not in BMT.
 * Time: O(T*W) (essentially comparing every match).
 * Space: O(T) since pattern could have all unique characters.
 *
 */

/**
 * Scans string `s`  for pattern.
 * If pattern exists in s, returns the index where pattern starts.
 * If s does not contain pattern, returns -1.
 */
function boyerMoore( s, pattern ) {
  const BMT = buildBadMatchTable( pattern ),
    patternEnd = pattern.length - 1,
    maxOffset = s.length - pattern.length;

  let offset = 0;

  while ( offset <= maxOffset ) {
    let scanIdx = 0;

    // Try scanning for entire match
    while ( pattern[scanIdx] == s[scanIdx + offset] ) {
      if ( scanIdx === patternEnd ) {
        // pattern found at offset
        return offset;
      }
      scanIdx++;
    }

    // Increment by skip amount if exists
    const badMatchChar = s[offset+ patternEnd];
    offset += BMT[badMatchChar] || 1;
  }

  // Not found
  return -1;
}

/**
 * Indicates how many characters to skip
 * for a given character of a pattern.
 *
 * @param {string} s The pattern to build bad match table for.
 * @return {Object} The bad match table.
 *
 * @example
 * Input: 'jam'
 * Output: {j: 2, a: 1, m: 3}
 *
 * @example
 * Input: 'data'
 * Output: {d: 3, a: 2, t: 1}
 */
function buildBadMatchTable( s ) {
  const table = {},
    len = s.length,
    end = len - 1,
    lastChar = s[end];

  for ( let i = 0; i < end; i++ ) {
    const char = s[i],
      skip = end - i;

    table[char] = skip;
  }

  table[lastChar] = table[lastChar] || len;

  return table;
}

module.exports = { boyerMoore, buildBadMatchTable };
