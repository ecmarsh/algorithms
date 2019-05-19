const { bubbleSort } = require( '../sort' );
const { isSorted, randomArray } = require( '../utils' );

describe( 'bubble sort', () => {
  it( 'sorts an array with length of 3', () => {
    const mockArray = randomArray( 3, false );

    expect( isSorted( mockArray ) ).toBe( false );
    bubbleSort( mockArray );
    expect( isSorted( mockArray ) ).toBe( true );
  } );

  it( 'sorts an array with length of 25', () => {
    const mockArray = randomArray( 25 );
    expect( isSorted( mockArray ) ).toBe( false );
    bubbleSort( mockArray );
    expect( isSorted( mockArray ) ).toBe( true );
  } );
} );
