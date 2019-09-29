/**
 * Remove All Adjacent K Duplicates In String (II)
 * __Weekly Contest 156__
 *
 * Given a string s, a k duplicate removal consists of choosing k adjacent
 * and equal letters from s and removing them causing the left and the right
 * side of the deleted substring to concatenate together.
 *
 * We repeatedly make k duplicate removals on s until we no longer can.
 *
 * Return the final string after all such duplicate removals have been made.
 *
 * It is guaranteed that the answer is unique.
 *
 * Constraints:
 * - `1 <= s.length <= 10^5`
 * - `2 <= k <= 10^4`
 * - `s` only contains lower case English letters.
 *
 * @example
 * Input: s = "abcd", k = 2
 * Output: "abcd"
 * Explanation: There's nothing to delete.
 * @example
 * Input: s = "deeedbbcccbdaa", k = 3
 * Output: "aa"
 * Explanation:
 *    First delete "eee" and "ccc", get "ddbbbdaa"
 *    Then delete "bbb", get "dddaa"
 *    Finally delete "ddd", get "aa"
 * @example
 * Input: s = "pbbcggttciiippooaais", k = 2
 * Output: "ps"
 *
 * Analysis for nonoptimal submission:
 * n is len(s), k is K
 * Worst case when all separated: e.g "abcddcba", k=2
 * T(n) = n + (n - k) + (n - 2k) ... + k = n^2/k
 * S(n) = n/k times * n/k substrings = n^2/k^2
 *  - Recursion, but TCO or eliminate with while loop.
 *
 * See better O(N)/ O(N) nested-stack solution after.
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
module.exports = function removeDuplicates( s, k ) {
  if ( k === 1 ) {
    return '';
  }
  return remove( s, k );
};

const remove = ( s, k ) => {
  if ( s.length < k ) {
    return s;
  }

  const res = [];
  let i = 0;

  while ( i < s.length ) {
    let j = i + 1;
    // Check ahead (k - 1) characters to see if k duplicates
    while ( i <= ( s.length - k )
             && j < ( i + k )
             && s.charAt( j ) === s[i]
    ) {
      j += 1;
    }
    // Skip "k" characters if "k" duplicates
    if ( j === ( i + k ) ) {
      i += k;
    } else {
      res.push( s[i] );
      i += 1;
    }
  }

  // If duplicates removed - we're done.
  // Else possible duplicates from combined portions so repeat.
  const strRes = res.join( '' );
  return strRes === s.length ? strRes : remove( strRes, k );
};

/**
 * O(N) solution with O(N) space
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
module.exports.optimized = function removeDuplicatesII( s, k ) {
  if ( k === 1 ) {
    return '';
  }

  const stack = [];
  const buffer = ['_', 0];
  stack.peek = function peek() {
    return stack.length === 0 ? buffer : stack[stack.length - 1];
  };

  for ( let i = 0; i < s.length; i += 1 ) {
    const curChar = s.charAt( i );
    const top = stack.peek();
    const [prevChar, prevCharCount] = top;
    if ( prevChar === curChar ) {
      if ( ( prevCharCount + 1 ) === k ) {
        stack.pop();
      } else {
        top[1] += 1;
      }
    } else {
      stack.push( [curChar, 1] );
    }
  }

  const sBuilder = stack.map( ( [char, count] ) => char.repeat( count ) );

  return sBuilder.join( '' );
};
