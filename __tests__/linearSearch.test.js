const { linearSearch } = require( '../search' );
const { sortedArray } = require( '../utils' );

describe( 'linear search', () => {
  const mockArray = sortedArray( 5 );
  it( 'returns the index if in array', () => {
    expect( linearSearch( mockArray, 2 ) ).toEqual( 2 );
  } );
  it( 'returns -1 if not in array', () => {
    expect( linearSearch( mockArray, 6 ) ).toEqual( -1 );
  } );
} );
