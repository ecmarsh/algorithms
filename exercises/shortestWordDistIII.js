/**
 * Shortest Word Distance III
 *
 * Given a list of words and two words word1 and word2,
 * return the shortest distance between these two words in the list.
 *
 * word1 and word2 may be the same, but
 * they represent two individual words in the list.
 *
 * @example
 * Input:
 * words = ["practice", "makes", "perfect", "coding", "makes"]
 * word1 = "makes"
 * word2 = "makes"
 *
 * Output: 4
 */

/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

module.exports = function shortestWordDistanceIII( words, word1, word2 ) {
  let shortest = words.length,
    i1 = -1,
    i2 = -1,
    turn = 1;

  for ( let i = 0; i < words.length; i++ ) {
    const word = words[i];

    if ( word === word1 && turn === 1 ) {
      i1 = i;

      if ( i2 >= 0 && i1 - i2 < shortest ) {
        shortest = i1 - i2;
      }
    }

    if ( word === word2 && i1 !== i ) {
      i2 = i;

      if ( i1 >= 0 && i2 - i1 < shortest ) {
        shortest = i2 - i1;
      }
    }

    if ( word === word1 && word1 === word2 ) {
      turn = turn === 1 ? 2 : 1;
    }
  }

  return shortest;
};
