/**
 * Smallest String With Swaps
 * __Weekly Contest 155__
 *
 * You are given a string s, and an array of pairs of indices in the string pairs
 * where pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.
 *
 * You can swap the characters at any pair of indices in the
 * given pairs __any number of times__.
 *
 * Return the lexicographically smallest string that `s` can
 * be changed to after using the swaps.
 *
 * Constraints:
 * - `1 <= s.length <= 10^5`
 * - `0 <= pairs.length <= 10^5`
 * - `0 <= pairs[i][0], pairs[i][1] < s.length`
 * - `s` only contains lowercase English letters.
 *
 * @example
 * Input: s = "dcab", pairs = [[0,3],[1,2]]
 * Output: "bacd"
 * Explaination:
 *   Swap s[0] and s[3], s = "bcad"
 *   Swap s[1] and s[2], s = "bacd"
 *
 * @example
 * Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
 * Output: "abcd"
 * Explaination:
 *   Swap s[0] and s[3], s = "bcad"
 *   Swap s[0] and s[2], s = "acbd"
 *   Swap s[1] and s[2], s = "abcd"
 *
 * @example
 * Input: s = "cba", pairs = [[0,1],[1,2]]
 * Output: "abc"
 * Explaination:
 *   Swap s[0] and s[1], s = "bca"
 *   Swap s[1] and s[2], s = "bac"
 *   Swap s[0] and s[1], s = "abc"
 *
 *
 * Analysis:
 * V = s.length, E = pairs.length
 * Time: O(V log V + V + E)
 *  - Initialize graph nodes: O(V)
 *  - Union join pairs: O(E + E lg E) = O(E) Tree flattens. lgE ~ O(1)
 *  - Group chars into descending order: O(V log V) worst case all same root
 *  - Build smallest str: O(V):
 *    - Find is O(1) amortized now. See inverse ackerman function.
 *    - Getting smallest char is O(1) due to reverse sort.
 *    - Repeat O(V) times.
 * Space: O(V)
 *  - Graph nodes: O(V)
 *  - At most, total of node chars: O(V)
 *  - Output/str builder: O(V)
 */


/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
module.exports = function smallestStringWithSwaps( s, pairs ) {
  if ( !pairs || !pairs.length || s.length === 1 ) {
    return s;
  }

  /**
   * 1. Union join the pair subsets.
   * https://en.wikipedia.org/wiki/Disjoint-set_data_structure#Union
   */
  const graph = new UnionFindGraph( s.length );
  pairs.forEach( ( [x, y] ) => {
    graph.union( x, y );
  } );

  /**
   * 2. Group characters by union.
   */
  for ( let i = 0; i < s.length; i += 1 ) {
    const root = graph.find( i );
    const char = s.charAt( i );
    root.reverseInsort( char );
  }

  /**
   * 3. Follow each index to its union index,
   *    which stores chararacterss of
   *    common sets in desc order.
   *    Build smallest string by placing
   *    smallest character at lowest possible index.
   */
  const smallestStrBuilder = [];
  for ( let i = 0; i < s.length; i += 1 ) {
    smallestStrBuilder[i] = graph.find( i ).chars.pop();
  }

  return smallestStrBuilder.join( '' );
};

/**
 * Union Find Graph Constructor
 * @param {number} n Count of subsets to create,
 *                 will be the strings length.
 */
const UnionFindGraph = function( n ) {
  this.nodes = Array( n );
  for ( let i = 0; i < n; i += 1 ) {
    this.nodes[i] = new Node();
  }
};

/**
 * Find a treenode's root, the union via path halving:
 * Flatten the path from node to root
 * by assigning every other node to grandparent.
 * The root is a node whose parent node its itself.
 * @param {number} i The index node is stored at.
 * @return {Node}
 */
UnionFindGraph.prototype.find = function( i ) {
  let node = this.nodes[i];
  while ( node.parent !== node ) {
    node.parent = node.parent.parent;
    node = node.parent;
  }
  return node;
};

/**
 * Union size join two treesets.
 * @param {Node} x
 * @param {Node} y
 * @return {void}
 */
UnionFindGraph.prototype.union = function( x, y ) {
  let xRoot = this.find( x );
  let yRoot = this.find( y );

  /** x and y already belong to the same set. */
  if ( xRoot === yRoot ) {
    return;
  }

  /**
   * Since x and y are cuurrently disjoint,
   * join treeset `x` and treeset `y` by merging
   * smaller tree `x` into larger tree `y`.
   * Size assured by swap comparison.
   */
  if ( xRoot.size < yRoot.size ) {
    [xRoot, yRoot] = [yRoot, xRoot];
  }
  yRoot.parent = xRoot;
  xRoot.size += yRoot.size;
};

/**
 * Constructor for a Graph Node
 * which represents an element of a union set.
 * Notice initially each node's parent is itself,
 * it is its own union set.
 */
const Node = function() {
  this.parent = this;
  this.size = 1;
  this.chars = [];
};

/**
 * Stores character set in order of descending char code.
 * @param {string} char
 * @return {void}
 */
Node.prototype.reverseInsort = function( char ) {
  let left = 0;
  let right = this.chars.length;
  while ( left < right ) {
    const mid = left + right >> 1;
    if ( char > this.chars[mid] ) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  this.chars.splice( left, 0, char );
};

