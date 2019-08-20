/**
 * Palindrome Paritioning
 *
 * Given a string s, partition s such that
 * every substring of the partition is a palindrome.
 *
 * Return all possible palindrome partitioning of s.
 *
 * @example
 * Input: 'aab'
 * Output: [
 *  ['aa', 'b'],
 *  ['a', 'a', 'b']
 * ]
 *
 * Analysis:
 * Time: O(n * 2^n) <-- if all same char 'aaaa', explore max depth each time.
 * Space: O(n) <- call stack with each single char on it. (not incl output)
 *
 */

/**
 * @param {string} s
 * @return {string[][]}
 */
module.exports = function partition( s ) {
  const sLen = s.length;

  if ( !s ) {
    return [];
  }
  if ( sLen === 1 ) {
    return [[s]];
  }

  const validGroups = [];

  const decomposeToPalindromes = ( start, partialGroup, ) => {
    // If pointer has made its way to end of string
    // this means all decompositions are palindromes
    // ie the partial group is now a complete group.
    // We can safely add it to the output array.
    if ( start >= sLen ) {
      const completeGroup = Array.prototype.slice.call( partialGroup );
      validGroups.push( completeGroup );
      return;
    }

    for ( let end = start; end < sLen; end++ ) {
      if ( isPalindrome( s, start, end ) )  {
        // 1. Update our in progress group.
        partialGroup.push( s.slice( start, end + 1 ) );
        // 2. Check other portion of `s`
        decomposeToPalindromes( end + 1, partialGroup );
        // 3. Backtrack: removing this iterations
        //    palindrome substring after checking the rest
        partialGroup.length--;
      }
    }
  };

  // Initialize the partioning from beginning of `s`
  decomposeToPalindromes( 0, [] );

  return validGroups;
};

const isPalindrome = ( str, start, end ) => {
  while ( start <= end ) {
    if ( str[start] !== str[end] ) {
      return false;
    }

    start++; end--;
  }

  return true;
};

/*
------ Psuedocode -------

VARS:
- output array
- possible palindromes (in progress)
- start, end pointers / current substring


0. Handle edge cases
     - no string
     - len == 1 <-- early return

1. Decompose string ( startIndex ):
       1a. if i > len (decomposition made it to end = all palindromes):
           i. add the valid ones (non removed) to final output

       1b. for end in range(startIndex, len(s)-1):
           i. if substring(startIndex, endIndex) is palindrome
              - add the substring to group
              - check rest of word for palindrome ( nextStart = thisEnd + 1 )
              - backtrack -> remove

       - otherwise no further work needed

2. Return decompositions made to final output


------ Scratchpad --------

Goal:
Split string into substrings so each substring is a palindrome.

What's a palindrome?
s[i] = s[len(s)-i]

s='aab'

Need **all** possible options (recursion).


Possible brute force:
Check all possible substrings for palindrome requirements.
String, length n
All subsets/strings will be 2^n time


Can we do better with some constraints...maybe n^2?
Which substring do we take?

- No need to continue decomposition if not palindrome
- Reach end means all groups in stored group are valid

'aab'

'a' -> true, store 'a', repeat for next char to end
'a' -> true, store 'a', repeat for next char to end
'b' -> true, store 'b', repeat for next char to end
out of bounds -> good -> add stored group ['a','a','b'] to output

'b' backtracks -> ['a', 'a']
'b' ends since longer than len

second 'a' backtracks -> ['a'] -> next iteration

'ab' is not palindrome -> do nothing -> second 'a' ends longer than len

back to first 'a' which finishes iter with backtrack cur group -> []

next iter -> 'aa' is palindrome -> check rest
'b' is palindrome -> check rest
longer than len -> push ['aa', 'b'] and return
'b' backtracks and ends -> ['aa']

'aa' finsihes iter and backtracks -> ['aab']
back to first caller
'aab' is not palindrome -> do nothing -> finishes since longer than len

stack empty...return the stored valid groups

*/
