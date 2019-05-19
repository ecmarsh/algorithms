const { isPrime } = require( '../utils' );

describe( 'isPrime', () => {
  it( 'returns false for non-prime inputs', () => {
    expect( isPrime( -1 ) ).toBe( false ); // negative
    expect( isPrime( 50.35 ) ).toBe( false ); // float
    expect( isPrime( 25 ) ).toBe( false ); // small non-prime
    expect( isPrime( 3000 ) ).toBe( false ); // large non-prime
  } );

  it( 'returns false for non-prime inputs', () => {
    expect( isPrime( 3 ) ).toBe( true ); // small prime
    expect( isPrime( 97 ) ).toBe( true ); // larger prime
    expect( isPrime( 1987 ) ).toBe( true ); //  xLarge prime
  } );
} );
