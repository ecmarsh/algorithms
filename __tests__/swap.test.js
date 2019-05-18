const { swap, sortedArray } = require( '../utils' );

describe( 'swap', () => {
  const mockArray = sortedArray( 3 );
  it( 'swaps values at provided indexes', () => {
    expect( mockArray[0] ).toEqual( 0 );
    expect( mockArray[1] ).toEqual( 1 );

    // Swap them
    swap( mockArray, 0, 1 );

    expect( mockArray[0] ).toEqual( 1 );
    expect( mockArray[1] ).toEqual( 0 );
  } );
} );
