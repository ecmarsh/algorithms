import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import { isSorted } from '../utils';

/*
 * BINARY SEARCH
 * @Time: O(log(n) + 1) --> O(log(n))
 *
 *
 * @sampleArr :: [0,1,2,3,4,5];
 *
 * @target :: 1
 * @expect :: 1
 * [0,1,2,3,4,5] // lo:0, hi:5, mid:floor((5+0)/2)=2 --> (1 > 2):false --> lower
 * [0,1        ] // lo:0, hi:2-1=1, mid:floor((1+0)/2)=0 --> (1 > 0):true --> upper
 * [  1        ] // lo:0+1=1, hi:1, mid:1 --> (1===1) --> @return mid :: 1
 *
 * @target :: 6
 * @expect :: -1
 * [0,1,2,3,4,5] // lo:0, hi:5, mid:floor((5+0)/2)=2 --> (6 > 2):true --> upper
 * [      3,4,5] // lo:2+1=3, hi:5, mid:floor((5+3)/2)=4 --> (6 > 4):true --> upper
 * [          5] // lo:4+1=5, hi:5, mid:floor((5+5)/2)=5 --> (6 > 5):true --> upper
 * [           ] // lo:5+1=6, hi:5 --> lo:6 !<= hi:5 --> break --> @return -1
 *
 */

function binarySearch( array, targetVal ) {
  // Validate args
  if ( !isArray( array ) || isUndefined( targetVal ) ) {
    throw new Error( 'Invalid argument(s)' );
  }

  if ( !isSorted( array ) ) {
    throw new Error( 'Array must be sorted for binary search' );
  }

  // Search bounds
  let lowerBound = 0,
    upperBound = array.length - 1;

  // Do search
  while ( lowerBound <= upperBound ) {
    const middleIdx = Math.floor( ( upperBound + lowerBound ) / 2 );

    if ( array[middleIdx] === targetVal ) {
      return middleIdx; // Found
    }

    targetVal > array[middleIdx]
      ? ( lowerBound = middleIdx + 1 ) // Upper half
      : ( upperBound = middleIdx - 1 ); // Lower half
  }

  // Not found
  return -1;
}

export default binarySearch;
