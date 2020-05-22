/**
 * @lc id=451 lang=javascript tag=string,count,sort
 *
 * [451] Sort Characters By Frequency
 *
 * Given a string, sort it in decreasing order
 * based on the frequency of characters.
 *
 * @example
 * Input: "tree"
 * Output: "eert"
 * Explanation: 'e' appears twice while 'r' and 't' both appear once.
 * So 'e' must appear before both 'r' and 't'. Therefore "eetr"
 * is also a valid answer.
 *
 * @example
 * Input: "cccaaa"
 * Output: "cccaaa"
 * Explanation: Both 'c' and 'a' appear three times, so "aaaccc"
 * is also a valid answer. Note that "cacaca" is incorrect, as the
 * same characters must be together.
 *
 * @complexity
 * Let N = s.length;
 * Time: 2N -> O(N)
 *  - One loop through s for each char to to build freqs
 *  - k time to reduce s/k chars res (s * s/k -> s)
 * Space: 4N -> O(N)
 *  - Map will be at most N if all unique characters
 *  - Ordered freq can only grow as large as length of S
 *  - String builder array is N size
 *  - Final string output is N size
 */

/**
 * @param {string} s
 * @return {string}
 */
module.exports = function frequencySort( s ) {
  if ( !s || s.length <= 2 ) {
    return s;
  }

  const orderedFreq = []; // []Set<char>
  const freq = new Map(); // { char => freq }

  // Fill ordered freqs and freq
  // Ordered freqs maintains the order of their count
  // and freq keeps a reference to where the character is in order.
  // When we increment a letter, we shift it up in ordered freq
  // and update the char count in freq.
  for ( let i = 0; i < s.length; i++ ) {
    const char = s[i];
    let count = 0;
    if ( freq.has( char ) ) {
      count = freq.get( char );
      orderedFreq[count].delete( char );
    }
    count += 1;
    freq.set( char, count );
    orderedFreq[count] = orderedFreq[count] || new Set();
    orderedFreq[count].add( char );
  }

  return Array.prototype.reduceRight.call( orderedFreq, buildRes, [] ).join( '' );
};

/** Builds the final string by building count in desc count order */
function buildRes( res, set, cnt ) {
  set.forEach( ( char ) => {
    // Note that cnt is the index
    res.push( char.repeat( cnt ) );
  } );
  return res;
}
