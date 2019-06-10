/**
 * Valid Parentheses/Brackets (Easy Collection)
 * Given a string containing just the characters:
 * '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 * An input string is valid if:
 * a. Open brackets must be closed by the same type of brackets.
 * b. Open brackets must be closed in the correct order.
 *
 * Note that an empty string is also considered valid.
 *
 * Example:
 * Input: "()[]{}"
 * Output: true
 * Input: "({)}"
 * Output: false
 *
 * @param {string} s
 * @return {boolean}
 */
module.exports = function validBrackets( s ) {
  if ( !s ) { return true; } // Empty string valid

  // Initialize a "stack"
  const stack = [];
  // Ignore empty strings
  s.replace( /\s/g, '' );
  // Push first item
  s = Array.from( s );
  let i = 0;
  if ( isOpener( s[i] ) ) {
    stack.push( s[i++] );
  } else {
    return false;
  }

  while ( i < s.length ) {
    if ( isOpener( s[i] ) ) {
      stack.push( s[i++] );
    } else {
      const opener = stack.pop();
      if ( !isCloseMatch( opener, s[i] ) ) {
        return false;
      }
      i++;
    }
  }

  return stack.length ? false : true;

  function isOpener( str ) {
    const opener = /[([{]/;
    return !!~str.search( opener );
  }
  function isCloseMatch( strOpen, strClose ) {
    let closer;
    switch ( strOpen ) {
      case '(':
        closer = ')';
        break;
      case '[':
        closer = ']';
        break;
      case '{':
        closer = '}';
        break;
      default:
        closer = '';
    }
    return closer === strClose;
  }
};
