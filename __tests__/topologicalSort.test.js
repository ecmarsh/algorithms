const { DGTopologicalSort } = require( '../sort' );


/*
VISUAL

D  →  B
 ↘︎       ↘︎
  C       A
    ↖︎       ↘︎
      E  →    F

--------------------

   / ↘  ↘︎
   D  C  B -> A -> F
    /             /
 E ---------------

:= [E, D, C, B, A, F]

*/

test( 'Topological Sort', () => {
  const graph = new DGTopologicalSort();

  ['A', 'B', 'C', 'D', 'E', 'F'].forEach( V => {
    graph.addVertex( V );
  } );

  const edges = [
    ['B', 'A'],
    ['D', 'C'],
    ['D', 'B'],
    ['B', 'A'],
    ['A', 'F'],
    ['E', 'C'],
  ];

  edges.forEach( E => {
    graph.addEdge( ...E );
  } );

  const topologicalOrder = graph.topologicalSort();

  expect( topologicalOrder ).toMatchObject( [
    'E',
    'D',
    'C',
    'B',
    'A',
    'F',
  ] );

} );
