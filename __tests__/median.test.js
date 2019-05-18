const { median, sortedArray } = require( '../utils' );

describe( 'sorted array median', () => {
  it( 'returns median of odd length array', () => {
    const oddLengthArray = sortedArray( 5 ); // [0,1,2,3,4]
    const arrMedian = median( oddLengthArray );
    expect( arrMedian ).toEqual( 2 );
  } );
  it( 'returns median of even length array', () => {
    const evenLengthArray = sortedArray( 4 ); // [0,1,2,3]
    const arrMedian = median( evenLengthArray );
    expect( arrMedian ).toEqual( 1.5 ); // (1 + 2) / 2
  } );
} );
