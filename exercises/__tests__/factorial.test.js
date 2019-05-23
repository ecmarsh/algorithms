const factorial = require( '../factorial' );

describe( `factorial`, () => {
  // Error handling
  it( `throws given non-integers`, () => {
    const errMessage = new RegExp( /\binteger\b/, `i` );
    expect( () => factorial( `twenty` ) ).toThrow( errMessage );
    expect( () => factorial( Infinity ) ).toThrow( errMessage );
    expect( () => factorial( 5.5 ) ).toThrow( errMessage );
    expect( () => factorial( [3] ) ).toThrow( errMessage );
  } );

  // n! == 1
  it( `returns 1 given int less than 2`, () => {
    expect( factorial( 0 ) ).toEqual( 1 );
    expect( factorial( 1 ) ).toEqual( 1 );
  } );

  // Example
  it( `returns 120 given 5`, () => {
    expect( factorial( 5 ) ).toEqual( 120 );
  } );

  // Larger number
  it( `returns factorial of 10`, () => {
    expect( factorial( 10 ) ).toEqual( 3628800 );
  } );
} );
