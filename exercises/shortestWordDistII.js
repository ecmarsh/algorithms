/**
 * Shortest Word Distance II
 *
 * Design a class which receives a list of words in the constructor,
 * and implements a method that takes two words word1 and word2
 * and return the shortest distance between these two words in the list.
 * Your method will be called repeatedly many times with different parameters.
 *
 * You may assume that word1 does not equal to word2, and
 * word1 and word2 are both in the list.
 *
 * @example
 * Input:
 * words = ["practice", "makes", "perfect", "coding", "makes"]
 * word1 = "makes"
 * word2 = "coding"
 *
 * Output: 1
 */

/**
 * @param {string[]} words
 */
const WordDistance = function( words ) {
  const wordMap = {};

  for ( let i = 0; i < words.length; i++ ) {
    const word = words[i];

    if ( word in wordMap ) {
      wordMap[word].push( i );
    }
    else {
      wordMap[word] = [i];
    }
  }

  this.words = wordMap;
  this.len = words.length;
  this.mem = {};
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
WordDistance.prototype.shortest = function( word1, word2 ) {
  if ( this.mem[word1+word2] || this.mem[word2+word1] ) {
    return this.mem[word1+word2] || this.mem[word2+word1];
  }

  const list1 = this.words[word1];
  const list2 = this.words[word2];

  let globalMin = this.len,
    i1 = 0,
    i2 = 0;

  while ( i1 < list1.length && i2 < list2.length ) {
    globalMin = Math.min(
      Math.abs( list1[i1] - list2[i2] ),
      globalMin
    );

    list1[i1] < list2[i2] ? i1++ : i2++;
  }

  this.mem[ word1+word2 ] = globalMin;

  return globalMin;
};

/**
 * Your WordDistance object will be instantiated and called as such:
 * var obj = new WordDistance(words)
 * var param_1 = obj.shortest(word1,word2)
 */

module.exports = WordDistance;

