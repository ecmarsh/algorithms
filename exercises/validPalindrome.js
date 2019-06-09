/**
 * isValidPalindrome
 * Ignore non-alphanumerics
 *
 * @param {string} s
 * @return {boolean}
 */

module.exports = function isPalindrome( s ) {
  // Remove non alphanumerics and ignore case
  s = s.replace( /\W|_/g,'' ).toLowerCase();

  const len=s.length,
    mid=len>>1,
    end=len-1;

  let i=0;
  while ( i<=mid ) {
    if ( s[i] != s[end-i++] ) {
      return false;
    }
  }

  // All chars passed
  return true;
};
