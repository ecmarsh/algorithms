/**
 * Given an array of strings, find the
 * longest common prefix of the strings.
 *
 * @param {string[]} strs
 * @return {string}
 *
 * Example:
 * Input: ['flow','flower','fleeing']
 * Output: 'fl'
 *
 * Input: ['rabbit','racecar','car']
 * Output: ''
 */

module.exports = function longestCommonPrefix( strs ) {

  // 0. Handle bases
  let lcp = ''; // Initial longest common prefix
  if ( !strs.length ) { return lcp; }
  if ( strs.length === 1 ) { return strs[0]; }

  // 1. Find string with min length
  const minLen = Math.min( ...strs.map( s => s.length ) );

  // 2. Binary Search within bounds of minLen
  let left = 0,
    right = minLen - 1;

  while ( left <= right ) {
    const mid = 0 | ( ( left + right ) / 2 );

    if ( _isCommonPrefix( left, mid ) ) {
      lcp += strs[0].substring( left, mid + 1 );
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return lcp;

  // Helper function to compare prefixes in all strings
  function _isCommonPrefix( lo, hi ) {
    const baseStr = strs[0];

    for ( let i = 1; i < strs.length; i++ ) {
      const str = strs[i];
      for ( let j = lo; j <= hi; j++ ) {
        if ( baseStr[j] !== str[j] ) {
          return false;
        }
      }
    }
    return true;
  }
};
