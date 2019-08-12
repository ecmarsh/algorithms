const { negate, add, subtract, multiply, divide, modulo } = require( '../bitwiseOps' );

const three = 3, four  = 4, six = 6;
const neg = n => 0 - n;

describe( 'Bitwise operations', () => {
  test( 'Negate', () => {
    expect( negate( three ) ).toEqual( neg( three ) );
    expect( negate( neg( three ) ) ).toEqual( three );
    expect( negate( 0 ) ).toEqual( 0 );
    expect( negate( 1234 ) ).toEqual( -1234 );
  } );

  test( 'Add', () => {
    expect( add( three, 0 ) ).toEqual( three );
    expect( add( three, four ) ).toEqual( 7 );
    expect( add( neg( three ), four ) ).toEqual( 1 );
    expect( add(  four, neg( three ) ) ).toEqual( 1 );
    expect( add( 1234, 43210 ) ).toEqual( 1234 + 43210 );
  } );

  test( 'Subtract', () => {
    expect( subtract( three, 0 ) ).toEqual( 3 );
    expect( subtract( 0, three ) ).toEqual( -3 );
    expect( subtract( four, three ) ).toEqual( 1 );
    expect( subtract( four, neg( three ) ) ).toEqual( 7 );
    expect( subtract( neg( three ), four ) ).toEqual( -7 );
    expect( subtract( 54321, 1234 ) ).toEqual( 54321 - 1234 );
  } );

  test( 'Multiply', () => {
    expect( multiply( three, four ) ).toEqual( 12 );
    expect( multiply( three, neg( four ) ) ).toEqual( -12 );
    expect( multiply( neg( three ), neg( four ) ) ).toEqual( 12 );
    expect( multiply( three, 1 ) ).toEqual( three );
    expect( multiply( three, 0 ) ).toEqual( 0 );
    expect( multiply( 12345, 321 ) ).toEqual( 12345 * 321 );
  } );

  test( 'Divide', () => {
    expect( divide( six, three ) ).toEqual( 2 );
    expect( divide( six, neg( three ) ) ).toEqual( -2 );
    expect( divide( three, 1 ) ).toEqual( three );
    expect( divide( 0, three ) ).toBe( 0 );
    expect( divide( three, 0 ) ).toBe( NaN );
    expect( divide( 12345, 321 ) ).toEqual( 12345 / 321 | 0 );
  } );

  test( 'Modulo', () => {
    expect( modulo( six, three ) ).toEqual( 0 );
    expect( modulo( four, three ) ).toEqual( 1 );
    expect( modulo( four, neg( three ) ) ).toEqual( 1 );
    expect( modulo( neg( four ), three ) ).toEqual( 1 );
    expect( modulo( neg( four ), neg( three ) ) ).toEqual( 1 );
    expect( modulo( three, four ) ).toEqual( 3 );
    expect( modulo( three, 0 ) ).toBe( NaN );
    expect( modulo( 12345, 321 ) ).toEqual( 12345 % 321 );
  } );
} );
