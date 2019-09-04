/* eslint-disable no-undef */
/**
 * Word Ladder
 *
 * Given two words (beginWord and endWord), and a dictionary's word list,
 * find the length of shortest transformation sequence from beginWord to
 * endWord, such that:
 * 1. Only one letter can be changed at a time.
 * 2. Each transformed word must exist in the word list.
 *    Note that beginWord is not a transformed word.
 *
 * _Notes_:
 * - Return 0 if there is no such transformation sequence.
 * - All words have the same length.
 * - All words contain only lowercase alphabetic characters.
 * - You may assume no duplicates in the word list.
 * - You may assume beginWord and endWord are non-empty and are not the same.
 *
 * @example
 * Input:
 * beginWord = "hit",
 * endWord = "cog",
 * wordList = ["hot","dot","dog","lot","log","cog"]
 * Output: 5
 * Explanation: As one shortest transformation is
 *              "hit" -> "hot" -> "dot" -> "dog" -> "cog",
 *              return its length 5.
 *
 * Input:
 * beginWord = "hit"
 * endWord = "cog"
 * wordList = ["hot","dot","dog","lot","log"]
 * Output: 0
 * Explanation: The endWord "cog" is not in wordList,
 *              therefore no possible transformation.
 *
 * _Analysis_:
 * M is len(word), N is len(wordList)
 * Time: O( M x N ), to build word map, and worst case on search.
 * Space: O( M x N ), to store the word combinations
 * Note: Using bidirectional search from begin word and end word reduces
 *       practical space in time (approx half), but big O is the same
 *       as if we were just searching from the beginning.
 *
 */

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
module.exports  = function ladderLength( beginWord, endWord, wordList ) {
  if ( !wordList || !wordList.length || !beginWord || !endWord ) {
    return 0;
  }

  // Ensure end word is in list in first iteration.
  let hasEndWord = false;

  // Build word combo map with intermediate state as key,
  // and value as list of words that have intermediate state.
  const dict = new Map();
  for ( let i = 0; i < wordList.length; i++ ) {
    const word = wordList[i];
    if ( word == beginWord ) {
      continue;
    }
    if ( word == endWord ) {
      hasEndWord = true;
    }
    for ( let j = 0; j < word.length; j++ ) {
      const start = word.slice( 0, j ),
        end = word.slice( j + 1 ),
        wordState = `${start}_${end}`,
        list = dict.get( wordState ) || [];
      word !== beginWord && list.push( word );
      dict.set( wordState, list );
    }
  }

  if ( !hasEndWord ) {
    return 0;
  }

  // Check from beginning and end, respectively,
  // until they meet on a word, or all possible words visited.
  const beginQueue = [new WordNode( beginWord, 1 )],
    endQueue = [new WordNode( endWord, 1 )];
  const beginVisited = new Map(),
    endVisited = new Map();

  beginQueue.target = endWord;
  endQueue.target = beginWord;

  while ( beginQueue.length && endQueue.length ) {
    let res = visit( dict, beginQueue, beginVisited, endVisited );
    if ( res ) {
      return res;
    }
    res = visit( dict, endQueue, endVisited, beginVisited );
    if ( res ) {
      return res;
    }
  }

  return 0;
};

const visit = ( dict, currQueue, visited, otherVisited ) => {
  const { word, level } = currQueue.shift();

  for ( let i = 0; i < word.length; i++ ) {
    const start = word.slice( 0, i ),
      end = word.slice( i + 1 ),
      wordState = `${start}_${end}`;

    const nextWords = dict.get( wordState ) || [];
    for ( const nextWord of nextWords ) {
      // Termination conditions:
      // 1. One direction reaches target first or
      // 2. Other direction previously visited word.
      if ( nextWord === currQueue.target ) {
        return level + 1;
      }
      if ( otherVisited.has( nextWord ) ) {
        return level + otherVisited.get( nextWord );
      }

      if ( !visited.has( nextWord ) ) {
        visited.set( nextWord, level + 1 );
        currQueue.push( new WordNode( nextWord, level + 1 ) );
      }
    }
  }
};

/**
 * Defines an item in queue.
 * @param {string} word
 * @param {number} level
 */
function WordNode( word, level ) {
  this.word = word;
  this.level = level;
}
