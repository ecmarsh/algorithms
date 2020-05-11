/**
 * Dijkstra's Algorithm: Shortest Path
 *
 * 1. Mark distance as infinity since some nodes may not be reachable.
 * 2. Each traversal iteration, the shortest distance is chosen for each node.
 * 3. Extract min is implemented to compute the neighboring node
 *    with smallest distance for a given vertex.
 *
 * Analysis
 * - Naive: `extractMin` is O(n), so time complexity is O(V^2 + E).
 *  All neighbor vertices of the node currently traversed have to be
 *  checked during the naive extract min method.
 *
 * Improvements:
 * - Priority Queue for extractMin reduces min extrapolation to O(log2V),
 *  which reduces the overall time complexity to
 *  O(E+V) * O(log2(V)) = O(E * log2(V)).
 *
 * - Fibonacci heap has constant time to compute extract min to make overall runtime O(E+V).
 *
 */


/*
Graph Visual

       B --5--> D (6)
     / |      / ^   \
   4   1    /   2    Z
  /    |  /     |   /
A -2-> C -10->  E (3)

edges {

}
 */


const isEmpty = require( 'lodash/isEmpty' );

/**
 * Basic definition for directed graph.
 */
function DirectedGraph() {
  this.edges = {};
  this.addVertex = function ( label ) {
    if ( !this.edges[label] ) {
      this.edges[label] = {};
    }
    return this.edges;
  };
  this.addEdge = function ( tail, head, weight ) {
    if ( !this.edges[tail] || !this.edges[head] ) {
      throw TypeError( 'Vertex does not exist. Add the vertex first.' );
    }

    this.edges[tail][head] = weight;
  };
}

/*
Graph Visual

addVertex('A')
addVertex('B')
addVertex('C')
addVertex('E')
addVertex('Z')

addEdge('A', 'B', 4)
addEdge('A', 'C', 2)
addEdge('B', 'C', 1)
addEdge('B', 'D', 5)
addEdge('C', 'D', 8)
addEdge('C', 'E', 9)
addEdge('D', 'Z', 6)
addEdge('E', 'D', 2)
addEdge('E', 'Z', 3)

----------------------

       B --5-> D (6)
     / |     / ^   \
   4   1   8   2    Z
  /    | /     |   /
A -2-> C -9--> E (3)

---------------------

DG.edges ->
{
  A: { B: 4, C: 2 },
  B: { C: 1 },
  C: { D: 8, E: 9 },
  D: { Z: 6 },
  E: { D: 2, Z: 3 },
}

 */

/**
 * Computes the shortest path from source vertex to
 * each vertex in the directed graph.
 *
 * @param {vertex} source The root vertex to calculate distance from.
 *
 * Note distance from source to source will always be 0.
 */
DirectedGraph.prototype.Dijkstra = function ( source ) {
  const Q = {}, // Vertex set
    distances = {};

  for ( const vertex in this.edges ) {
    distances[vertex] = Infinity;
    Q[vertex] = this.edges[vertex];
  }

  // Initialize distance from source to source as 0
  distances[source] = 0;

  while ( !isEmpty( Q ) ) {
    const u = extractMin( Q, distances );

    delete Q[u];

    for ( const neighbor in this.edges[u] ) {
      const curDistance = distances[u] + this.edges[u][neighbor];
      distances[neighbor] = Math.min( curDistance, distances[neighbor] );
    }

  }

  return distances;
};

/**
 * Computes the neighboring node with the smallest distance
 * from a given vertex in linear time.
 *
 * @param {Object} Q The vertex set.
 * @param {Object} distances Map of distances for each node.
 * @return {vertex} A node in vertex set Q with the minimum distance.
 */
function extractMin( Q, distances ) {
  let minDistance = Infinity,
    vertexWithMinDistance = null;

  for ( const vertex in Q ) {
    const curDistance = distances[vertex];

    if ( curDistance <= minDistance ) {
      minDistance = curDistance;
      vertexWithMinDistance = vertex;
    }
  }

  return vertexWithMinDistance;
}

module.exports = DirectedGraph;
