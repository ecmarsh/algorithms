const { quickSelect } = require( '../select' );

describe( 'quick select', () => {
  it( 'returns the kth smallest element', () => {
    const array = [2, 2, 5, 5, 1];
    // sorted = [
    //  k: element
    //	0: 1,
    //  1: 2,
    //  2: 2,
    //  3: 5,
    //  4: 5
    // ]
    const k1 = quickSelect( array, 0, array.length - 1, 1 ),
      k2 = quickSelect( array, 0, array.length - 1, 2 ),
      k4 = quickSelect( array, 0, array.length - 1, 4 );

    expect( k1 ).toEqual( 1 );
    expect( k2 ).toEqual( 2 );
    expect( k4 ).toEqual( 5 );
  } );
} );
