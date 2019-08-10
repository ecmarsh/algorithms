const { KMP, buildPrefixTable } = require( '../kmp' );

describe( 'Build prefix table', () => {
  test( 'Builds correct table for "ababaca"', () => {
    const str = 'ababaca';
    const prefixTable = buildPrefixTable( str );

    expect( prefixTable ).toMatchObject( [
    // a, b, a, b, a, c, a
      0, 0, 1, 2, 3, 0, 1,
    ] );
  } );
} );

describe( 'KMP', () => {
  test( 'Finds "ace" in "racecar"', () => {
    const str = 'racecar',
      pattern = 'ace';

    expect( KMP( str, pattern ) ).toBe( true );
  } );

  test( 'Finds pattern in longer string', () => {
    const str = 'ababacaababacaababacaababaca',
      pattern = 'abaca';

    expect( KMP( str, pattern ) ).toBe( true );
  } );

  test( 'Returns true with empty pattern', () => {
    expect( KMP( 'abcdefg', '' ) ).toBe( true );
  } );

  test( 'Returns false if pattern is longer', () => {
    expect( KMP( 'abc', 'abcde' ) ).toBe( false );
  } );

  test( 'Returns false for "mane" in "nametag"', () => {
    expect( KMP( 'nametag', 'mane' ) ).toBe( false );
  } );

  test( 'Returns false if case mismatch', () => {
    expect( KMP( 'ABC', 'AbC' ) ).toBe( false );
  } );

  test( 'Returns true if string and pattern are same', () => {
    expect( KMP( 'Same', 'Same' ) ).toBe( true );
  } );

} );
