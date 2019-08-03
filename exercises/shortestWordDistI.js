/**
 * Shortest Word Distance I
 *
 * Given a list of words and two words word1 and word2,
 * return the shortest distance between these two words in the list.
 *
 * You may assume that word1 does not equal to word2, and
 * word1 and word2 are both in the list.
 *
 * @example
 * Input:
 * words = ["practice", "makes", "perfect", "coding", "makes"]
 * word1 = "coding"
 * word2 = "practice"
 *
 * Output: 3
 */

/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

module.exports = function shortestWordDistanceIII( words, word1, word2 ) {
  let shortest = words.length,
    word1Idx = -1,
    word2Idx = -1;

  for ( let i = 0; i < words.length; i++ ) {
    const word = words[i];

    if ( word === word1 ) {
      word1Idx = i;

      if ( word2Idx > -1 && word1Idx - word2Idx < shortest ) {
        shortest = word1Idx - word2Idx;
      }
    }

    if ( word === word2 ) {
      word2Idx = i;

      if ( word1Idx > -1 && word2Idx - word1Idx < shortest ) {
        shortest = word2Idx - word1Idx;
      }
    }

  }

  return shortest;
};
