const { boyerMoore, buildBadMatchTable } = require( '../boyerMoore' );

describe( 'Bad Match Table', () => {
  test( 'Builds correct table for "struct"', () => {
    const s1 = 'struct';
    const s1Table = buildBadMatchTable( s1 );

    expect( s1Table ).toMatchObject( {
      s: 5,
      t: 4,
      r: 3,
      u: 2,
      c: 1,
    } );
  } );

  test( 'Builds correct table for "jam"', () => {
    const s2 = 'jam';
    const s2Table = buildBadMatchTable( s2 );

    expect( s2Table ).toMatchObject( {
      j: 2,
      a: 1,
      m: 3,
    } );
  } );

} );

describe( 'Boyer Moore string search', () => {
  const str = 'jellyjam';

  test( 'Finds pattern at end of word', () => {
    const pattern = 'jam';
    expect( boyerMoore( str, pattern ) ).toEqual( 5 );
  } );

  test( 'Finds pattern at beginning of word', () => {
    const pattern = 'jelly';
    expect( boyerMoore( str, pattern ) ).toEqual( 0 );
  } );

  test( 'Returns -1 if pattern not in string', () => {
    const pattern = 'bell';
    expect( boyerMoore( str, pattern ) ).toEqual( -1 );
  } );
} );
