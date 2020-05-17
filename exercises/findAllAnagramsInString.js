/**
 * @lc id=438 lang=javascript tag=sliding,window,string
 *
 * [438] Find All Anagrams in a String
 *
 * Given a string s and a non-empty string p, find all the
 * start indices of p's anagrams in s.
 *
 * @constraints
 * - Both `p` and `s` consist of lowercase english letters only.
 * - 1 <= s.length, p.length <= 20,100
 * - The order of output does not matter
 *
 * @example
 * Input: s: "cbaebabacd" p: "abc"
 * Output: [0, 6]
 * Explanation:
 *  The substring with start index = 0 is "cba", which is an anagram of "abc".
 *  The substring with start index = 6 is "bac", which is an anagram of "abc".
 *
 * @example
 * Input: s: "abab" p: "ab"
 * Output: * [0, 1, 2]
 * Explanation:
 *   The substring with start index = 0 is "ab", which is an anagram of "ab".
 *   The substring with start index = 1 is "ba", which is an anagram of "ab".
 *   The substring with start index = 2 is "ab", which is an anagram of "ab".
 *
 * @complexity
 * Let S = s.length, P = p.length
 * Time: O(S + P) -> O(P) to build counts map, O(S) for sliding window
 * Space: O(1) -> even though map of P, never more than 26 of size
 */

/*

PSUEDO/PLANNING/NOTES

build map of a, b, c

use sliding window of length of `p` to check if counts satisfied, incrementing and decrementing based on letter
- could loop through map to check all the counts
- keep a sum of the amount of chars matching zero,
  when one of letter changes from/to zero, update that sum
  when sum is pLen then we have a complete match

if counts are satisfied, add left (start of window to) to result array

s: "cbaaebabacd"
p: "cbaebabacd" p: "abc"

0: cba counts: Map { 'a' => 0, 'b' => 0, 'c' => 0 } matchesRemaining: 0 (add left of 0)
1: baa counts: Map { 'a' => -1, 'b' => 0, 'c' => 1 } matchesRemaining: 1
2: aae counts: Map { 'a' => -1, 'b' => 1, 'c' => 1 } matchesRemaining: 2
3: aeb counts: Map { 'a' => 0, 'b' => 0, 'c' => 1 } matchesRemaining: 1
4: eba counts: Map { 'a' => 0, 'b' => 0, 'c' => 1 } matchesRemaining: 1
5: bab counts: Map { 'a' => 0, 'b' => -1, 'c' => 1 } matchesRemaining: 1
6: aba counts: Map { 'a' => -1, 'b' => 0, 'c' => 1 } matchesRemaining: 1
7: bac counts: Map { 'a' => 0, 'b' => 0, 'c' => 0 } matchesRemaining: 0 (add left at 7)
8: acd counts: Map { 'a' => 0, 'b' => 1, 'c' => 0 } matchesRemaining: 1

*/


/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
module.exports = function findAnagrams( s, p ) {
  // 0. edge cases/ early returns
  const sLen = s.length;
  const pLen = p.length;
  if ( sLen < pLen ) {
    return [];
  }

  // 1. build counts
  const counts = new Map();
  for ( let i = 0; i < pLen; i++ ) {
    const char = p.charAt( i );
    counts.set( char, counts.get( char ) + 1 || 1 );
  }

  // 2. use sliding window of length of p on s
  // when match (that char count satisfied), update count of matches
  const startIndices = [];
  let matchesRemaining = counts.size;
  let left = 0;
  let right = 0;

  // Move the sliding window up to length s
  while ( right < pLen - 1 ) {
    const char = s[right];
    if ( counts.has( char ) ) {
      const newCount = counts.get( char ) - 1;
      if ( newCount === 0 ) {
        matchesRemaining -= 1;
      }
      counts.set( char, newCount );
    }
    right += 1;
  }

  // Check with sliding window of length p to end of s.
  while ( right < sLen ) {
    const rightChar = s[right];
    if ( counts.has( rightChar ) ) {
      const newCount = counts.get( rightChar ) - 1;
      counts.set( rightChar, newCount );
      if ( newCount === 0 ) {
        matchesRemaining -= 1;
        if ( matchesRemaining === 0 ) {
          startIndices.push( left );
        }
      }
    }
    right += 1;

    // Move the left side of window
    const leftChar = s[left];
    if ( counts.has( leftChar ) ) {
      const preCount = counts.get( leftChar );
      if ( preCount === 0 ) {
        matchesRemaining += 1;
      }
      counts.set( leftChar, preCount + 1 );
    }
    left += 1;
  }

  // 3. Return the matching start indices
  return startIndices;
};
