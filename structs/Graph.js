/**
 * Graphs (Directed and Undirected)
 * 1. Directed: One-Way w/ tail -> head
 * 2. Undirected: Two-Way/Mutual
 *
 */

function Graph() {
  this.edges = {};
}
Graph.prototype.addVertex = function( vertex ) {
  this.edges[vertex] = {};
};
Graph.prototype.removeVertex = function( vertex ) {
  // 1. Remove all the connected edges of the vertex
  for ( const adjacentVertex in this.edges[vertex] ) {
    this.removeEdge( adjacentVertex, vertex );
  }
  // 2. Remove the vertex itself
  delete this.edges[vertex];
};

/**
 * Undirected
 */
const GraphUndirected = ( function( Graph ) {
  function _Undirected() {
    Graph.call( this );
  }

  _Undirected.prototype = Object.create( Graph.prototype );
  _Undirected.prototype.addEdge = function( v1, v2, weight = 0 ) {
    this.edges[v1][v2] = weight;
    this.edges[v2][v1] = weight;
  };
  _Undirected.prototype.removeEdge = function( v1, v2 ) {
    if ( v1 in this.edges && v2 in this.edges[v1] ) {
      delete this.edges[v1][v2];
    }
    if ( v2 in this.edges && v1 in this.edges[v2] ) {
      delete this.edges[v2][v1];
    }
  };

  return _Undirected;
} )( Graph );

/**
 * Directed
 */
const GraphDirected = ( function( Graph ) {
  function _Directed() {
    Graph.call( this );
  }

  _Directed.prototype = Object.create( Graph.prototype );
  _Directed.prototype.addEdge = function( tail, head, weight = 0 ) {
    this.edges[tail][head] = weight;
  };
  _Directed.prototype.removeEdge = function( tail, head ) {
    if ( tail in this.edges && head in this.edges[tail] ) {
      delete this.edges.tail.head;
    }
  };

  return _Directed;
} )( Graph );

module.exports = { GraphUndirected, GraphDirected };
