const { isSorted, randomArray } = require( '../utils' );
const { selectionSort } = require( '../sort' );

describe( 'selection sort', () => {
  it( 'sorts an N=8 array of numbers', () => {
    const unsortedArray = randomArray();
    expect( isSorted( unsortedArray ) ).toBe( false );
    selectionSort( unsortedArray );
    expect( isSorted( unsortedArray ) ).toBe( true );
  } );

  it( 'sorts an N=5 array of chars', () => {
    const unsortedArray = ['e', 'a', 'z', 'b', 'c'];
    expect( isSorted( unsortedArray ) ).toBe( false );
    selectionSort( unsortedArray );
    expect( isSorted( unsortedArray ) ).toBe( true );
  } );
} );
