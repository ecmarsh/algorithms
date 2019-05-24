const isUnique = require( 'isUnique' );

describe( `is unique characters problem`, () => {
  it( `returns true given all unique characters`, () => {
    const uniqueCharString = `abcdefg`;
    expect( isUnique( uniqueCharString ) ).toBe( true );
  } );
  it( `returns false with duplicate characters`, () => {
    const stringWithDuplicates = `racecar`;
    expect( isUnique( stringWithDuplicates ) ).toBe( false );
  } );
} );
