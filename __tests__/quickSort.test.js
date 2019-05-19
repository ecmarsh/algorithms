const { quickSort } = require( '../sort' );
const { isSorted, sortedArray, randomArray } = require( '../utils' );

describe( 'quick sort', () => {
  it( 'sorts an N=7 array of ints, no duplicates', () => {
    const n = 7;
    const array = randomArray( n, false );
    expect( isSorted( array ) ).toBe( false );

    quickSort( array, 0, n - 1 );
    expect( isSorted( array ) ).toBe( true );
  } );

  it( 'sorts an N=13 array of ints and possible duplicates', () => {
    const n = 13;
    const array = randomArray( n );
    expect( isSorted( array ) ).toBe( false );

    quickSort( array, 0, n - 1 );
    expect( isSorted( array ) ).toBe( true );
  } );

  it( 'does NOT recurse indefinitely given already sorted array', () => {
    const n = 8;
    const mockArray = sortedArray( n, true, true );
    expect( isSorted( mockArray ) ).toBe( true );
    quickSort( mockArray, 0, n - 1 );
    expect( isSorted( mockArray ) ).toBe( true );
  } );

  it( 'does NOT recurse indefinitely given array with equal elements', () => {
    const mockArray = [5, 5, 1, 1, 1, 1, 5, 5];
    expect( isSorted( mockArray ) ).toBe( false );
    quickSort( mockArray, 0, mockArray.length - 1 );
    expect( isSorted( mockArray ) ).toBe( true );
  } );
} );
