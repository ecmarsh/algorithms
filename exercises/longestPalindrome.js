/**
 * Longest Palindromic Substring
 *
 * Given a string s, find the longest palindromic substring in s.
 * You may assume that the maximum length of s is 1000.
 *
 * @example
 * Input: 'babad'
 * Output: 'bab'
 * Note: 'aba' is also a valid answer.
 *
 * @example
 * Input: 'cbbd'
 * Output: 'bb'
 *
 * Solution runtime:
 * O(n^2) since if entire string is palindrome, lookAround will be O(n)
 *
 */

/**
 * @param {string} str
 * @return {string}
 */
module.exports = function longestPalindrome( str ) {
  if ( !str ) {
    return '';
  }

  let start = 0,
    end = 0;

  for ( let i = 0; i < str.length; i++ ) {
    const singleCenterLen = lookAround( str, i, i ), // 'aBa'
      doubleCenterLen = lookAround( str, i, i+1 ), // 'aBBa'
      palinLen = Math.max( singleCenterLen, doubleCenterLen );

    if ( palinLen > end - start ) {
      start = Math.ceil( i - ( palinLen - 1 ) / 2 );
      end = i + palinLen / 2 | 0;
    }
  }

  return str.substring( start, end+1 );
};

function lookAround( str, left, right ) {
  let [L, R] = [left, right];

  const isPalindrome = () => str[L] === str[R];
  const isInBounds = () => L >= 0 && R < str.length;

  while ( isInBounds() && isPalindrome() ) {
    L--;
    R++;
  }

  const palindromeLength = R - L - 1;
  return palindromeLength;
}
