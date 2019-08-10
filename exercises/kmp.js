/**
 * Knuth-Morris-Pratt String Search (KMP)
 *
 * KMP algorithm returns _all_ indices where pattern is present. (global search)
 *
 * Searches for occurences of word, `W` with input text, `T`
 * using the information provided by a mismatch to know where
 * next match could begin. Previously matched characters can be skipped.
 *
 * Uses a prefix lookup to indicate how far to backtrack.
 * The KMP search iterates the string and the pattern to be searched
 * index by index. When there is a mismatch, it uses the prefix lookup
 * to determine the next index to try.
 *
 * If the pattern's index reaches length of the pattern,
 * this indicates the string is found.
 *
 * Pre-processing word of length W requires the time and space.
 * Time: O(W)
 * Space: O(W)
 *
 * To iterate the string, T, requires T.
 * Total time: O(W + T)
 *
 */

/**
 * KMP String Search
 *
 * @param {string} str The string to search in.
 * @param {pattern} pattern The pattern to search for.
 * @return {boolean} Whether string contains pattern.
 */
module.exports.KMP = function KMP( str, pattern ) {
  const [sLen, pLen] = [str.length, pattern.length];
  if ( !sLen || sLen < pLen ) {
    return false;
  }
  if ( sLen === pLen ) {
    return str === pattern;
  }
  if ( !pLen ) {
    return true;
  }


  const prefixTable = buildPrefixTable( pattern );

  let [s, p] = [0, 0];

  while ( s < sLen ) {
    const [sChar, pChar] = [str[s], pattern[p]];

    // No match
    if ( sChar !== pChar ) {
      if ( p ) {
        p = prefixTable[p - 1];
      }
      else {
        s++;
      }
      continue;
    }

    // Must be match
    s++; p++;

    // Check if at end of pattern
    // which means it is a complete match.
    if ( p === pLen ) {
      return true;
    }
  }

  return false;
};

/**
 * Builds a prefix array that indicates how many indices
 * to backtrack to get the same prefix.
 *
 * @param {string} s The string to build longest prefix table for.
 * @return {number[]} Prefix table.
 *
 * @example
 * Input: 'ababaca'
 * Output: [0, 0, 1, 2, 3, 0, 1]
 *
 */
function buildPrefixTable( s ) {
  const size = s.length;

  if ( !size ) {
    return [];
  }

  const prefix = Array( size );

  let maxPrefix = 0;
  prefix[0] = maxPrefix;

  for ( let i = 1; i < size; i++ ) {
    const isMismatch = () => maxPrefix  && s[i] !== s[maxPrefix];
    while ( isMismatch() ) {
      maxPrefix = prefix[maxPrefix - 1];
    }

    if ( s[i] === s[maxPrefix] ) {
      maxPrefix++;
    }

    prefix[i] = maxPrefix;
  }
  return prefix;
}

module.exports.buildPrefixTable = buildPrefixTable;
