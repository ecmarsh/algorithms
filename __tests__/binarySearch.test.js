import { binarySearch } from '../search';
import { sortedArray } from '../utils';

describe( 'binary search', () => {
  it( 'throws given unsorted array', () => {
    const unsorted = [5, 2, 1, 0, 3];
    const findInUnsorted = () => binarySearch( unsorted, 1 );

    expect( findInUnsorted ).toThrow( /must be sorted/ );
  } );

  it( 'returns target index when value exists', () => {
    const sorted = sortedArray( 10 );
    const find6 = binarySearch( sorted, 6 );

    expect( find6 ).toEqual( 6 );
  } );

  it( 'returns -1 when target value is not in array', () => {
    const mockSorted = [6, 8, 9, 11, 12, 24];
    const findNonexistent = binarySearch( mockSorted, 23 );

    expect( findNonexistent ).toEqual( -1 );
  } );

  it( 'finds character values in array', () => {
    const charsArray = ['a', 'b', 'c', 'd', 'z'];
    const findChar = binarySearch( charsArray, 'z' );

    expect( findChar ).toEqual( 4 ); // a[4] === 'z'
  } );
} );
