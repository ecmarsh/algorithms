/**
 * Alien Dictionary
 *
 * There is a new alien language which uses the latin alphabet.
 * However, the order among letters are unknown to you.
 * You receive a list of non-empty words from the dictionary,
 * where words are sorted lexicographically by the rules of this new language.
 * Derive the order of letters in this language.
 *
 * @example
 * Input: [
 *  'wrt',
 *  'wrf',
 *  'er',
 *  'ett',
 *  'rftt',
 * ]
 * Output: 'wertf'
 *
 * Input: [
 *  'z',
 *  'x'
 * ]
 * Output: 'zx'
 *
 * Input: [
 *  'z',
 *  'x',
 *  'y',
 * ]
 * Output: ''
 * Explanation: The order is invalid, so return empty string.
 *
 * Note:
 * 1. You may assume all letters are in lowercase.
 * 2. You may assume that if 'a' is 'a' prefix of 'b',
 *    then 'a' must appear before 'b' in the given dictionary.
 * 3. If the order is invalid, return an empty string.
 * 4. There may be multiple valid order of letters. Return any one of them.
 *
 */

/**
 * @param {string[]} words
 * @return {string}
 */
module.exports = function alienOrder( words ) {
  const graph = new Graph( words.join( '' ) );

  for ( let i = 0; i < words.length - 1; i++ ) {
    const word1 = words[i];
    const word2 = words[i+1];

    let c = 0;
    while ( c < word1.length && c < word2.length ) {
      if ( word1[c] !== word2[c] ) {
        graph.addEdge( word1[c], word2[c] );
        break;
      }
      c++;
    }
  }

  const queue = [];
  for ( const char in graph.edges ) {
    if ( !graph.inDegrees[char] ) {
      queue.push( char );
    }
  }

  const order = [];
  while ( queue.length ) {
    const char = queue.shift();

    if ( !graph.inDegrees[char] ) {
      order.push( char );
    }

    for ( const edge of graph.edges[char] ) {
      graph.inDegrees[edge] = graph.inDegrees[edge] - 1;
      if ( !graph.inDegrees[edge] ) {
        queue.push( edge );
      }
    }
  }

  return graph.size == order.length ? order.join( '' ) : '';
};

function Graph( str ) {
  this.edges = {};
  this.inDegrees = {};
  this.set = new Set( str.split( '' ) );
  this.size = this.set.size;
  this.set.forEach( c => this.edges[c] = [] );
}

Graph.prototype.addVertex = function( v ) {
  if ( !this.edges[v] ) {
    this.edges[v] = [];
    this.size++;
  }
};

Graph.prototype.addEdge = function( u, v ) {
  this.edges[u].push( v );
  this.inDegrees[v] = this.inDegrees[v] + 1 || 1;
};


/*

All letters lowercase.
If 'a' prefixes 'b', 'a' before 'b' in dict
  - not necessarily for array indices.
Invalid order - what does invalid order mean?
  - graph is cyclic -> vertex can reach itself on walk
May be multiple valid orders - return any one of them.

 t->f
 w->e
 r->t
 e->r
 t->f,f

so, linearly: w->e->r->t->f

*/
