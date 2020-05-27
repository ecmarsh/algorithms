/**
 * @lc id=886 lang=javascript tag=graph,bipartite,dfs
 *
 * [886] Possible Bipartition
 *
 * Given a set of N people (numbered 1, 2, ..., N),
 * we would like to split everyone into two groups of any size.
 *
 * Each person may dislike some other people, and they should
 * not go into the same group.
 *
 * Formally, if dislikes[i] = [a, b], it means it is not allowed
 * to put the people numbered a and b into the same group.
 *
 * Return true if and only if it is possible to split
 * everyone into two groups in this way.
 *
 * @constraints
 *  - 1 <= N <= 2000
 *  - 0 <= dislikes.length <= 10000
 *  - 1 <= dislikes[i][j] <= N
 *  - dislikes[i][0] < dislikes[i][1]
 *  - There does not exist i != j for which dislikes[i] == dislikes[j].
 *
 * @example
 * Input: N = 4, dislikes = [[1,2],[1,3],[2,4]]
 * Output: true
 * Explanation: group1 [1,4], group2 [2,3]
 *
 * @example
 * Input: N = 3, dislikes = [[1,2],[1,3],[2,3]]
 * Output: false
 *
 * @example
 * Input: N = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
 * Output: false
 *
 * @complexity
 * Time: O(E + N) -> E to build edge list, N to check all nodes
 * Space: O(E + N) -> E for edge list, N for colors
 *                    (and N worst case recurisve stack space)
 */

/**
 * @param {number} N
 * @param {number[][]} dislikes
 * @return {boolean}
 * https://www.geeksforgeeks.org/check-if-a-given-graph-is-bipartite-using-dfs/
 */
module.exports.dfs = function isPossibleBipartitionDFS( N, dislikes ) {
  /*
     Connected nodes are people that dislike each other
     In order to divide them into separate groups, "color" each neighbor
     as the opposite color, and continuing checking (dfs) to see if there
     is a clash in colors.
     */

  // 0. Edge cases / early return
  if ( N <= 2 || dislikes.length <= 1 ) return true;

  // 1. Build the edge list O(E)
  const edges = new Map; // { id => DislikeSet }
  dislikes.forEach( ( [u, v] ) => {
    const setU = edges.get( u ) || new Set;
    const setV = edges.get( v ) || new Set;
    setU.add( v );
    setV.add( u );
    edges.set( u, setU );
    edges.set( v, setV );
  } );

  // Colors will be defined as true and false. Initialize to -1 for not set.
  const colors = Array( N+1 ).fill( -1 );
  // If colors is -1, this also means that it hasn't been visited.
  const isVisited = ( i ) => colors[i] !== -1;

  // 2. DFS check for color clashes, and setting dislikes to opposite color
  const isBipartite = ( curr ) => {
    const adjs = edges.get( curr )[Symbol.iterator]();
    for ( const adj of adjs ) {
      // Adjancents dislike each other, so cannot be the same "color"
      // NOTE: must check before checking visited, since visited may mean
      // color was just set. Need to ensure it is different.
      if ( colors[adj] === colors[curr] ) return false;
      // No need to visit same node twice
      if ( isVisited( adj ) ) continue;
      // Set neighboring color opposite of connected node color.
      colors[adj] = !colors[curr];
      // Now repeat for the the adjacent's neighbors.
      if ( !isBipartite( adj ) ) return false;
    }
    return true;
  };

  // Loop through each of keys, setting initial to color to arbitrary value
  // We need to do this rather than simply choose first to start for edge case
  // of disjoint graphs (see example @EOF).
  // Will be O(N) to check all nodes, worst case that all nodes repr in dislike
  // If node already visited then becomes a constant check.
  for ( const edge of edges.keys() ) {
    if ( !isVisited( edge ) ) {
      colors[edge] = true;
      if ( !isBipartite( edge ) ) {
        return false;
      }
    }
  }

  return true;
};

/*

DISJOINT GRAPH EDGE CASE:

[[1,2],[3,4],[4,5],[3,5]]

1: [2]
2: [1]
---
3: [4,5]
4: [3,5]
5: [4,3]


*/
