/**
 * Implement an algorithm to
 * determine if a string has all unique characters.
 *
 * Assumptions:
 * ASCII (possibly extended) -> 128 - 256 characters
 */

module.exports = function isUnique( str ) {
  // ASCII extended only has 256 characters
  if ( str.length > 256 ) {
    return false;
  }

  // Initilize object w/ O(1) access to store
  const hash = {};
  // Loop through each character, checking if in hash
  for ( let i = 0; i < str.length; i++ ) {
    const currentChar = str.charAt( i );
    if ( hash[currentChar] ) {
      return false;
    }
    hash[currentChar] = true;
  }

  return true;
  // O(n) time
  // O(n) space
};
