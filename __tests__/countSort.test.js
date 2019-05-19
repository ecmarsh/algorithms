const { countSort } = require( '../sort' );
const { isSorted, randomArray } = require( '../utils' );

describe( 'count sort', () => {
  it( 'sorts an array of unsigned ints', () => {
    const unsortedArr = [3, 2, 1, 4, 5];
    expect( isSorted( unsortedArr ) ).toBe( false );
    // Count sort it
    const sortedArr = countSort( unsortedArr );
    expect( isSorted( sortedArr ) ).toBe( true );
  } );

  it( 'sorts an array with signed ints', () => {
    const unsortedArr = [-3, -2, 1, 4, 5, 0];
    expect( isSorted( unsortedArr ) ).toBe( false );
    // Count sort it
    const sortedArr = countSort( unsortedArr );
    expect( isSorted( sortedArr ) ).toBe( true );
  } );

  it( 'still sorts with possible large range(k)', () => {
    const unsortedArr = randomArray( 20 );
    expect( isSorted( unsortedArr ) ).toBe( false );
    // Count sort it
    const sortedArr = countSort( unsortedArr );
    expect( isSorted( sortedArr ) ).toBe( true );
  } );
} );
