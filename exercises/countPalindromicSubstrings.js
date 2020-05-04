/**
 * @lc id=647 lang=javascript tag=dp,string,manacher
 *
 * [647] Count Palindromic Substrings
 * Top 100 Liked Questions
 *
 * Given a string, your task is to count how many
 * palindromic substrings in this string.
 *
 * The substrings with different start indexes or end indexes
 * are counted as different substrings even they consist of same characters.
 *
 * @constraints
 * - The input string length won't exceed 1000.
 *
 * @example
 * Input: "abc"
 * Output: 3
 * Explanation: Three palindromic strings: "a", "b", "c".
 *
 * @example
 * Input: "aaa"
 * Output: 6
 * Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 *
 * @complexity See corresponding solutions.
 */

/**
 * @param {string} s
 * @return {number}
 * @complexity
 *  - Time: O(N) -> repeated solutions are memoized to O(1) requiring 2N checks
 *  - Space: O(N^2) -> dp table
 * @see https://en.wikipedia.org/wiki/Longest_palindromic_substring#Manacher's_algorithm
 * @notes
 * - String with length 1 is always palindrome.
 * - String with length 2 is palindrome IFF first and last characters are equal.
 * - String with length 3+ is palindrome IFF first and last characters are equal and substring(1, len - 1 - except first and last characters) is palindrome.
 * - Answer whether string with length N is palindrome if s[0] == s[N] and we have memoized answer for previous step for substring 1 to N - 1.
 */
module.exports.default = function ( s ) {
  const n = s.length;

  if ( n <= 1 ) return n;

  let count = 0;

  const dp = Array( n ).fill( 0 )
    .map( () => Array( n ).fill( 0 ) );


  // each single letter is a palindrome
  for ( let i = 0; i < n; i++ ) {
    dp[i][i] = 1;
    count += 1;
  }

  // for lo + length = hi, str[lo, hi] will be palindromic
  // ie str[lo] == str[hi] and between them (str[lo + 1, hi - 1]) is palindromic
  for ( let lo = n - 2; lo >= 0; lo-- ) {
    for ( let hi = lo + 1; hi < n; hi++ ) {
      if ( s[lo] !== s[hi] ) continue;
      // two letters of same character or space between them is palindrome
      if ( hi === lo + 1 || dp[lo+1][hi-1] ) {
        dp[lo][hi] = 1;
        count += 1;
      }
    }
  }


  return count;
};

/**
 * Alternative solution expanding around the center of each index.
 */
module.exports.alternate = function ( s ) {
  if ( s.length <= 1 ) return s.length;

  // Each single letter is a palindrome
  let count = s.length;

  const expandAroundCenter = ( lo, hi ) => {
    while ( s[lo] === s[hi] && lo >= 0 && hi < s.length ) {
      count += 1;
      lo -= 1;
      hi += 1;
    }
  };

  for ( let i = 0; i < s.length; i++ ) {
    const [lo, hi] = [i-1, i+1];

    // checking using a center with single character (eg "*a*")
    expandAroundCenter( lo, hi );

    // check for cases where two characters (eg "*aa*")
    if ( s[i] === s[i+1] ) {
      count += 1;
      expandAroundCenter( lo, hi + 1 );
    }
  }

  return count;
};

/**
 * @param {string} s
 * @return {number}
 * @complexity
 *  - Time: O(n^2) where n is s.length
 *  - Space: O(1)
 */
module.exports.bruteForce = function ( s ) {
  let count = 0;

  for ( let i = 0; i < s.length; i++ ) {
    for ( let j = i; j < s.length; j++ ) {
      if ( isPalindrome( s, i, j ) ) {
        count += 1;
      }
    }
  }

  return count;
};

function isPalindrome( s, start, end ) {
  if ( start < 0 || end >= s.length ) return false;

  while ( start < end ) {
    if ( s[start] !== s[end] ) return false;
    start += 1;
    end -= 1;
  }

  return true;
}
