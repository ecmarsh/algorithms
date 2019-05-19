const { mergeSort } = require( '../sort' );
const { isSorted, randomArray } = require( '../utils' );

describe( 'merge sort', () => {
  it( 'sorts a small (N=3) array', () => {
    const n = 3;
    const unsortedArray = randomArray( n, false );
    expect( isSorted( unsortedArray ) ).toBe( false );
    // Sort it
    const sortedArray = mergeSort( unsortedArray );
    expect( isSorted( sortedArray ) ).toBe( true );
  } );

  it( 'sorts a larger (N=30) array with possible duplicates', () => {
    const n = 30;
    const unsortedArray = randomArray( n, true );
    expect( isSorted( unsortedArray ) ).toBe( false );
    // Sort it
    const sortedArray = mergeSort( unsortedArray );
    expect( isSorted( sortedArray ) ).toBe( true );
  } );

  it( 'sorts signed ints correctly', () => {
    const unsortedArray = [-1, 0, -5, -2, 3];
    expect( isSorted( unsortedArray ) ).toBe( false );
    // Sort it
    const sortedArray = mergeSort( unsortedArray );
    expect( isSorted( sortedArray ) ).toBe( true );
  } );

  it( 'sorts floats correctly', () => {
    const unsortedArray = [-1.5, 3.33333, 27 / 2, 10];
    expect( isSorted( unsortedArray ) ).toBe( false );
    // Sort it
    const sortedArray = mergeSort( unsortedArray );
    expect( isSorted( sortedArray ) ).toBe( true );
  } );

  it( 'sorts strings correctly', () => {
    const unsortedArray = [`z`, `x`, `a`, `c`, `b`, `elephant`];
    expect( isSorted( unsortedArray ) ).toBe( false );
    // Sort it
    const sortedArray = mergeSort( unsortedArray );
    expect( isSorted( sortedArray ) ).toBe( true );
  } );
} );
