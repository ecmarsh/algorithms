const isNil = require( 'lodash/isNil' );

/**
 * Depth-First Search (DFS)
 * "Maze" :: Explore path fully then backtrack.
 *
 * @param {Object} graph The graph to search.
 * @param {*} vertex The starting vertex.
 * @param {Function} fn Do something with visited node.
 *
 * Time: O(V + E), Number of vertices + edges to search
 *
 * Note: You can also perform this iteratively using a Stack.
 */

function dfs( graph, vertex, fn ) {
  if ( isNil( graph ) || isNil( vertex ) ) {
    return;
  }
  if ( fn === undefined ) {
    // eslint-disable-next-line no-console
    fn = v => console.log( v );
  }

  // Keep track of which nodes we've visited
  // to avoid an infinite loop
  const visited = {};

  // Initialize search
  search( vertex );

  // Start search, recursing on first
  // unexplored neighbor before considering remaining
  function search( vtx ) {
    // 1. Mark node
    markExplored( vtx );
    // 2. Do something with the visited node
    fn( vtx );
    // 3. Search the adjacent nodes if not yet explored
    for ( const adjacentVertex in graph.edges[vtx] ) {
      if ( !visited[adjacentVertex] ) {
        search( adjacentVertex );
      }
    }
  }

  // Mark a vertex (vtx) as visited
  function markExplored( vtx ) {
    visited[vtx] = true;
  }
}

module.exports = dfs;
