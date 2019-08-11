/**
 * Word Search II
 *
 * Given a 2D board and a list of words from the dictionary,
 * find all words in the board. (crossword)
 *
 * Each word must be constructed from letters of sequentially adjacent cell,
 * where "adjacent" cells are those horizontally or vertically neighboring.
 * The same letter cell may not be used more than once in a word.
 *
 * @example
 * Input:
 * board = [
 *  [*o*,*a*,'a','n'],
 *  ['e',*t*,*a*,*e*],
 *  ['i',*h*,'k','r'],
 *  ['i','f','l','v']
 * ]
 * words = ["oath","pea","eat","rain"]
 *
 * Output: ["oath", "eat"]
 *
 * Time: O( rows * cols * words * maxWord )
 * Space: Trie + DFS Stack
 *
 */

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
module.exports = function findWords( board, words ) {
  const rows = board.length,
    cols = board[0].length,
    foundWords = [];

  if ( !( rows * cols ) || !words.length  ) {
    return foundWords;
  }

  // O( words.length * maxWord.length )
  const root = buildTrie( words );

  // O( rows * cols )
  for ( let r = 0; r < rows; r++ ) {
    for ( let c = 0; c < board[0].length; c++ ) {
      checkNeighborsForWordMatches( board, r, c, root, foundWords );
    }
  }

  return foundWords;
};

function checkNeighborsForWordMatches( board, r, c, node, foundWords ) {
  const char = board[r][c];

  if ( !node.children[char] ) {
    return;
  }

  node = node.children[char];

  if ( node.word ) {
    foundWords.push( node.word );
    node.word = null;  // Ensure no duplicates in answer
  }

  // Ensure char not reused
  board[r][c] = '.';

  /**
   * Check all existing adjacent cells.
   * ~ up, left, down, right ~
   */
  if ( r > 0 ) {
    checkNeighborsForWordMatches( board, r-1, c, node, foundWords );
  }
  if ( c > 0 ) {
    checkNeighborsForWordMatches( board, r, c-1, node, foundWords );
  }
  if ( r < board.length-1 ) {
    checkNeighborsForWordMatches( board, r+1, c, node, foundWords );
  }
  if ( c < board[0].length-1 ) {
    checkNeighborsForWordMatches( board, r, c+1, node, foundWords );
  }

  // Not found, reset to original
  board[r][c] = char;
}

function buildTrie( words ) {
  const root = TrieNode();

  for ( const word of words ) {
    let node = root;

    for ( const char of word ) {
      node.children[char] = node.children[char] || TrieNode();
      node = node.children[char];
    }

    node.word = word;
  }

  return root;
}

function TrieNode() {
  return {
    word: null,
    children: {},
  };
}
