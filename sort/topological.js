/**
 * Topological Sort
 *
 * A modified DFS that uses a stack to record the order.
 * It performs DFS from a node until its connected nodes are
 * recursively exhausted and by pushing it to the stack until all nodes visited.
 *
 * Use cases include a task scheduler where one task depends on
 * the previous task being completed, or a JS lib dep manager where
 * it has to figure out which libraries to import before others.
 *
 * Time: O(V + E) <-- DFS
 * Mem: O(V) <--The stack to store all vertices.
 *
 */

/**
 * Defines a DirectedGraph with edges,
 * and methods to add vertices and edges.
 */
function DirectedGraph() {
  this.edges = {};
  this.addVertex = function( label ) {
    if ( !this.edges[label] ) {
      this.edges[label] = {};
    }
    return this.edges;
  };
  this.addEdge = function( tail, head, weight ) {
    if ( !this.edges[tail] || !this.edges[head] ) {
      throw TypeError( 'Vertex does not exist. Add the vertex first.' );
    }

    this.edges[tail][head] = weight;
  };
}

DirectedGraph.prototype.topologicalSort = function() {
  // Ensures recursion terminates
  const visited = new Map();

  // Records order, must remain chronological
  const stack = [];

  const helper = v => {
    visited.set( v );
    for ( const edge in this.edges[v] )
      if ( !visited.has( edge ) )
        helper( edge );
    // Append left to sustain chronological order.
    stack.unshift( v );
  };

  for ( const item in this.edges )
    if ( !visited.has( item ) )
      helper( item );

  return stack;
};

module.exports = DirectedGraph;
