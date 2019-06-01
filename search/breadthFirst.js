const isNil = require( 'lodash/isNil' );
const Queue = require( '../structs/Queue' );
const { constructAndInit } = require( '../utils' );

/**
 * Breadth-First Search (BFS) - By "Layers"
 *
 * @param {Object} graph The graph to search.
 * @param {*} vertex The starting vertex.
 * @param {Function} fn Do any with visited vertex.
 *
 * Properties of BFS:
 * For every undirected or directed graph G = (V, E) in adjacency-list representation and for every starting vertex s ∈ V:
 * a. At the conclusion of BFS, a vertex v ∈ V is marked as explored IFF there is a path from s to v in G.
 *  b. The running time of BFS is O(m + n) where m = |E| and n = |V|.
 */


module.exports = function bf( graph, vertex, fn ) {
  if ( isNil( graph ) || isNil( vertex ) ) {
    return;
  }
  if ( fn === undefined ) {
    // eslint-disable-next-line no-console
    fn = v => console.log( v );
  }

  // Use queue to fully explore each
  // vertices' neighbors before continuing
  const q = constructAndInit( Queue );

  // Keep track of visited, starting w/ param vertex
  const visited = {};

  // Add initial vertex to queue and
  // search by layer
  q.enqueue( vertex );
  while ( !q.isEmpty ) {
    const currentVertex = q.dequeue();
    if ( !visited[currentVertex] ) {
      visited[currentVertex] = true;

      fn( currentVertex );

      for ( const adjacentVertex in graph.edges[currentVertex] ) {

        if ( !visited[adjacentVertex] ) {
          q.enqueue( adjacentVertex );
        }
      }
    }
  }
};
