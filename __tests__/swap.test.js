const { swap, sortedArray } = require( '../utils' );

describe( 'swap.js', () => {
  const mockArray = sortedArray( 3 );
  it( 'swaps values at provided indexes', () => {
    expect( mockArray[0] ).toEqual( 0 );
    expect( mockArray[1] ).toEqual( 1 );

    // Swap them
    swap( mockArray, 0, 1 );

    expect( mockArray[0] ).toEqual( 1 );
    expect( mockArray[1] ).toEqual( 0 );
  } );

  it( 'throws without array', () => {
    const invalidSwap = () => swap( `not an array`, 0, 1 );
    expect( invalidSwap ).toThrow( /Invalid/ );
  } );

  it( 'throws if idx is not a number', () => {
    const invalidSwap = () => swap( [0, 1, 2], `0`, 1 );
    expect( invalidSwap ).toThrow( /invalid/ );
  } );

  it( 'throws if idx is not in arr', () => {
    const invalidSwap = () => swap( [1, 2, 3], 2, 3 );
    expect( invalidSwap ).toThrow( /invalid/ );
  } );
} );
