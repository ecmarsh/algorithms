const closestPair = require( '../closestPair' );

describe( `closest pair`, () => {
  it( 'fulfills example 1', () => {
    const arr = [10, 22, 28, 29, 30, 40],
      sum = 54,
      res = closestPair( arr, sum );

    expect( res ).toBe( `22,30` );
  } );

  it( 'fulfills example 2', () => {
    const arr = [1, 3, 4, 7, 10],
      sum = 15,
      res = closestPair( arr, sum );

    expect( res ).toBe( `4,10` );
  } );
} );
