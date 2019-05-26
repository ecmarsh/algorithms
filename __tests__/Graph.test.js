const { GraphUndirected, GraphDirected } = require( '../structs' );

describe( 'Undirected graph struct', () => {
  const uG = new GraphUndirected();
  it( 'constructs with prototypes', () => {
    expect( uG ).toHaveProperty( 'edges' );
    expect( typeof uG.addVertex ).toEqual( 'function' );
    expect( typeof uG.removeVertex ).toEqual( 'function' );
    expect( typeof uG.addEdge ).toEqual( 'function' );
    expect( typeof uG.removeEdge ).toEqual( 'function' );
  } );
  it( 'adds vertices and edges', () => {
    uG.addVertex( 1 );
    uG.addVertex( 2 );
    uG.addEdge( 1, 2, 1 );
    const expected = {
      edges: {
        '1': { '2': 1 }, // v1
        '2': { '1': 1 }, // v2
      },
    };
    expect( uG ).toMatchObject( expected );
  } );
  it( 'removes connected edges vertex removal', () => {
    uG.removeVertex( 2 );
    expect( uG ).toMatchObject( { edges: {'1': {} } } );
  } );
  it( 'removes individual vertices', () => {
    uG.removeVertex( 1 );
    expect( uG ).toMatchObject( { edges: {} } );
  } );
} );

describe( 'Directed Graph struct', () => {
  const dG = new GraphDirected();
  it( 'constructs with prototypes', () => {
    expect( dG ).toHaveProperty( 'edges' );
    expect( typeof dG.addVertex ).toEqual( 'function' );
    expect( typeof dG.removeVertex ).toEqual( 'function' );
    expect( typeof dG.addEdge ).toEqual( 'function' );
    expect( typeof dG.removeEdge ).toEqual( 'function' );
  } );
  it( 'adds vertices and edges', () => {
    dG.addVertex( 1 );
    dG.addVertex( 2 );
    dG.addEdge( 1, 2, 1 );
    const expected = {
      edges: {
        '1': { '2': 1 }, // tail
        '2': {}, // head
      },
    };
    expect( dG ).toMatchObject( expected );
  } );
  it( 'removes connected edges vertex removal', () => {
    dG.removeVertex( 1 );
    expect( dG ).toMatchObject( { edges: {'2': {} } } );
  } );
  it( 'removes individual vertices', () => {
    dG.removeVertex( 2 );
    expect( dG ).toMatchObject( { edges: {} } );
  } );
} );
