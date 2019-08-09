const { DGShortestPath: DG } = require( '../search' );

/*
Graph Visual

       B --5-> D (6)
     / |     / ^   \
   4   1   8   2    Z
  /    | /     |   /
A -2-> C -9--> E (3)

 */

describe( 'Djikstras shortest path', () => {
  const graph = new DG();

  test( 'Graph setup', () => {
    // See above visual
    const expectedEdges = {
      A: { B: 4, C: 2 },
      B: { C: 1 },
      C: { D: 8, E: 9 },
      D: { Z: 6 },
      E: { D: 2, Z: 3 },
    };

    const vertices = ['A','B','C','D','E','Z'];
    vertices.forEach( vertex => {
      graph.addVertex( vertex );
    } );

    graph.addEdge( 'A', 'B', 4 );
    graph.addEdge( 'A', 'C', 2 );
    graph.addEdge( 'B', 'C', 1 );
    graph.addEdge( 'B', 'D', 5 );
    graph.addEdge( 'C', 'D', 8 );
    graph.addEdge( 'C', 'E', 9 );
    graph.addEdge( 'D', 'Z', 6 );
    graph.addEdge( 'E', 'D', 2 );
    graph.addEdge( 'E', 'Z', 3 );

    expect( graph.edges ).toMatchObject( expectedEdges );
  } );

  test( 'Shortest path from A', () => {
    const shortestPaths = graph.Dijkstra( 'A' );
    const { A, B, C, D, E, Z } = shortestPaths;

    // A: A->A = 0
    expect( A ).toEqual( 0 );

    // B: A->B = 4
    expect( B ).toEqual( 4 );

    // C: A->C = 2
    expect( C ).toEqual( 2 );

    // D: A->B->D = 4 + 5 = 9
    expect( D ).toEqual( 9 );

    // E: A->C->E = 2 + 9 = 11
    expect( E ).toEqual( 11 );

    // Z: A->C->E->Z = 2 + 9 + 3 = 14
    expect( Z ).toEqual( 14 );
  } );
} );
