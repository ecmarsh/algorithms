const { insertionSort } = require( '../sort' );
const { isSorted, randomArray } = require( '../utils' );

describe( 'insertion sort', () => {
  it( 'sorts an N=20 array', () => {
    const unsortedArray = randomArray( 20 );
    expect( isSorted( unsortedArray ) ).toBe( false );

    const sortedArray = insertionSort( unsortedArray );
    expect( isSorted( sortedArray ) ).toBe( true );
  } );
} );
