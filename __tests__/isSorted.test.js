const { isSorted } = require( '../utils' );

describe( 'isSorted checker', () => {
  it( 'returns false given not array-like parameter', () => {
    const notArrayLike = () => `I am a function`;
    expect( typeof notArrayLike ).toBe( `function` );
    expect( isSorted( notArrayLike ) ).toBe( false );
  } );

  // INTS
  it( 'returns false for unsorted array of ints', () => {
    const unsortedArrOfInts = [5, 1, 3, 4, 2];
    expect( isSorted( unsortedArrOfInts ) ).toBe( false );
  } );
  it( 'returns true given sorted array of ints', () => {
    const sortedArrOfInts = [1, 2, 3, 4, 5];
    expect( isSorted( sortedArrOfInts ) ).toBe( true );
  } );

  // FLOATS
  it( 'returns false for unsorted float array', () => {
    const unsortedArrOfFloats = [150.3, -1.111, 66.67, -5, 0];
    expect( isSorted( unsortedArrOfFloats ) ).toBe( false );
  } );
  it( 'returns true for array of floats', () => {
    const sortedArrOfFloats = [-1.3, 0, 30.33, 36.9, 100.1];
    expect( isSorted( sortedArrOfFloats ) ).toBe( true );
  } );

  // STRINGS
  it( 'returns false for unsorted array of strings', () => {
    const unsortedArrOfStrings = [`zebra`, `elephant`, `giraffe`];
    expect( isSorted( unsortedArrOfStrings ) ).toBe( false );
  } );
  it( 'returns true for array of sorted strings', () => {
    const sortedArrOfStrings = [`a`, `b`, `l`, `m`, `z`];
    expect( isSorted( sortedArrOfStrings ) ).toBe( true );
  } );

  // MIXED
  it( 'works with arrays of mixed types', () => {
    const mixedTypeArray = [0.5, `100`, 200, `a`, `z`];
    expect( isSorted( mixedTypeArray ) ).toBe( true );
  } );
} );
