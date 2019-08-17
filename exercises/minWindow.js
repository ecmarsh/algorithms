/**
 * Minimum Window Substring
 *
 * Given a string S and a string T, find the minimum window
 * in S which will contain all the characters in T in complexity O(n).
 *
 * @example
 * Input: S = 'ADOBECODEBANCA'
 * Ouput: 'BANC'
 *
 * Constraints:
 *  - If there is no such window in S that covers all characters in T,
 *    return the empty string `""`.
 * - If there is such a window, you are guaranteed that there
 *   will always be only one unique minimum window in S.
 *
 * Analysis:
 * Time : O(S+T)
 * We make a small impact on practical time by using filteredS.
 * Big O is same but can have maximum impacts of many no-go chars in T.
 * We do 2*filteredS + S + T iterations vs 2*S + T iterations w/o.
 * Space: O(S + T) to store character mappings.
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
module.exports = function minWindow( s, t ) {
  if ( !t || !s ) {
    return s;
  }
  if ( t.length > s.length ) {
    return '';
  }

  // Build the target character counts and
  // store the number of unique characters.
  const target = {
    size: 0,
  };
  for ( const char of t ) {
    if ( char in target ) {
      target[char] = target[char] + 1;
    }
    else {
      target[char] = 1;
      target.size = target.size + 1;
    }
  }

  // Filter s chars to only those occurencing in t.
  const sFiltered = [];
  for ( let index = 0; index < s.length; index++ ) {
    const char = s.charAt( index );
    if ( char in target ) {
      sFiltered.push( { index, char } );
    }
  }

  // Linear search through filtered list with sliding window.
  // Store shortest window size and boundaries
  // while in satisfactory window.
  const window = {
    matched: 0,
    start: 0,
    end: 0,
    shortest: -1,
  };

  let [left, right] = [0, 0];
  while ( right < sFiltered.length ) {
    const { index: rightIndex, char: rightChar } = sFiltered[right];

    if ( target[rightChar] ) {
      window[rightChar] = window[rightChar] + 1 || 1;
      if ( window[rightChar] === target[rightChar] ) {
        window.matched = window.matched + 1;
      }
    }

    while ( window.matched === target.size && left <= right ) {
      const { index: leftIndex, char: leftChar } = sFiltered[left],
        { shortest } = window,
        currWindowSize =  ( rightIndex + 1 ) - leftIndex;

      if ( currWindowSize < shortest || shortest == -1 ) {
        window.shortest = currWindowSize;
        window.start = leftIndex;
        window.end = rightIndex + 1;
      }

      if ( target[leftChar] ) {
        window[leftChar] = window[leftChar] - 1;
        if ( window[leftChar] < target[leftChar] ) {
          window.matched = window.matched - 1;
        }
      }

      left++;
    }

    right++;
  }

  return window.shortest ? s.slice( window.start, window.end ) : '';
};
