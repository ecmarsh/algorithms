/* eslint-disable no-undef */
/**
 * Word Break II
 *
 * Variant of Word Break I, except we must find all valid decompositions.
 * See ./wordbreak.js first.
 *
 * Given a non-empty string s and a dictionary wordDict containing a list
 * of non-empty words, add spaces in s to construct a sentence where each word
 * is a valid dictionary word. Return all such possible sentences.
 *
 * Note:
 * The same word in the dictionary may be reused multiple times.
 * You may assume the dictionary does not contain duplicate words.
 *
 * @example
 * Input:
 * s = "catsanddog", wordDict = ["cat", "cats", "and", "sand", "dog"]
 * Output:
 * [
 *  "cats and dog",
 *  "cat sand dog"
 * ]
 *
 * @example
 * Input:
 *  s = "pineapplepenapple",
 *  wordDict = ["pine", "apple", "pen", "applepen", "pineapple"]
 * Output:
 * [
 *  "pine apple pen apple",
 *  "pineapple pen apple",
 *  "pine applepen apple"
 * ]
 * Explanation: Note that you are allowed to reuse a dictionary word.
 *
 * @example
 * Input:
 * s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 * Output: []
 *
 * Analysis: TODO
 *
 */

/**
 * @param {string} str
 * @param {string[]} wordDict
 * @return {string[]}
 */
module.exports = function wordBreak( str, wordDict ) {
  const s = str.length;
  const dict = new Map();
  let maxWordLen = 1;
  wordDict.forEach( ( word ) => {
    dict.set( word, true );
    if ( word.length <= s && word.length > maxWordLen ) {
      maxWordLen = word.length;
    }
  } );

  const lastLen = Array( s );
  for ( let i = 0; i < s; i+=1 ) {
    lastLen[i] = [];
    if ( i <= maxWordLen && dict.has( str.slice( 0, i + 1 ) ) ) {
      lastLen[i].push( i + 1 );
    }
    const lowerBound = Math.max( 0, i - maxWordLen );
    for ( let j = i - 1; j >= lowerBound; j -= 1 ) {
      if ( lastLen[j].length && dict.has( str.slice( j + 1, i + 1 ) ) ) {
        lastLen[i].push( i - j );
      }
    }
  }

  // No valid decompositions
  if ( !lastLen[s-1] ) {
    return [];
  }

  const decompositions = [];

  const decompose = ( i, j, decomposed ) => {
    if ( i < 0 ) {
      decompositions.push( decomposed.trimEnd() );
      return;
    }
    for ( j; j < lastLen[i].length; j += 1 ) {
      const updated = `${str.slice( i - lastLen[i][j] + 1, i + 1 )} ${decomposed}`;
      decompose( i - lastLen[i][j], 0, updated );
    }
  };

  decompose( s - 1, 0, '' );

  return decompositions;
};
