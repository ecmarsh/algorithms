const isUndefined = require( 'lodash/isUndefined' );

/**
 * Trie (Prefix)
 * Use for storing words and searching str matches
 *
 * Time: O(W), where `W` is length of word
 * Space: O(N*M) where ...W, N is # of words in Trie
 * NOTE: Only efficient if many similar prefixes (e.g dictionary)
 */

const validate = arg => {
  if ( isUndefined( arg ) ) {
    throw Error( `Invalid argument(s)` );
  }
};
// Represents a node in Trie
function Node() {
  const children = {}; // node*children[char]
  const isWord = false; // indicates end of word

  return {
    children,
    isWord,
  };
}

function Trie() {
  const root = new Node();

  return {
    root,
    insert( word ) {
      validate( word );
      // Traverse trie by children for each char
      // If a character is not there, create a new node as child
      // Indicate there is a word on the final char node
      let currNode = this.root;
      for ( let i = 0; i < word.length; i++ ) {
        const c = word[i];
        currNode.children[c] = currNode.children[c] || new Node();
        currNode = currNode.children[c];
      }
      currNode.isWord = true;
    },
    check( word ) {
      validate( word );
      // Traverse to last letter and check
      // if it is marked as end of word
      let currNode = this.root, i = -1;
      while ( i < word.length - 1 ) {
        const c = word[++i];
        if ( !currNode.children[c] ) {
          return false;
        }
        currNode = currNode.children[c];
      }
      return currNode.isWord;
    },
    delete( word ) {
      validate( word );
      const hasChildren = obj => Object.keys( obj.children ).length == 0;
      return deleteRecursively( this.root, 0 );

      function deleteRecursively( currNode, i ) {
        // Base case -> last letter of word
        const isLast = i === word.length;
        const isNotEndWord = currNode.isWord == false;
        if ( isLast ) {
          if ( isNotEndWord ) {
            return false;
          }
          // Check if children nodes
          currNode.isWord = false;
          return hasChildren( currNode );
        }

        const c = word[i],
          nextNode = currNode.children[c];
        if ( nextNode == null ) {
          return false;
        }
        // Traverse from last letter and delete if passes
        if ( deleteRecursively( nextNode, i++ ) ) {
          delete currNode.children[c];
          return hasChildren( currNode );
        }

        return false;
      }
    },
  };
}

module.exports = { Trie, Node };
