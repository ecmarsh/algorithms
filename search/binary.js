const isArray = require( 'lodash/isArray' );
const isUndefined = require( 'lodash/isUndefined' );
const { isSorted } = require( '../utils' );

/**
 * BINARY SEARCH
 * Time: O(log(n)) + O(1) --> O(log(n))
 *
 *
 * sampleArr :: [0,1,2,3,4,5];
 *
 * target :: 1
 * expect :: 1
 * [0,1,2,3,4,5] // lo:0, hi:5, mid:floor((5+0)/2)=2 --> (1 > 2):false --> lower
 * [0,1        ] // lo:0, hi:2-1=1, mid:floor((1+0)/2)=0 --> (1 > 0):true --> upper
 * [  1        ] // lo:0+1=1, hi:1, mid:1 --> (1===1) --> return mid :: 1
 *
 * target :: 6
 * expect :: -1
 * [0,1,2,3,4,5] // lo:0, hi:5, mid:floor((5+0)/2)=2 --> (6 > 2):true --> upper
 * [      3,4,5] // lo:2+1=3, hi:5, mid:floor((5+3)/2)=4 --> (6 > 4):true --> upper
 * [          5] // lo:4+1=5, hi:5, mid:floor((5+5)/2)=5 --> (6 > 5):true --> upper
 * [           ] // lo:5+1=6, hi:5 --> lo:6 !<= hi:5 --> break --> return -1
 *
 */

module.exports = function binarySearch( array, targetVal ) {
  // Arguments provided, and correct types
  if ( !isArray( array ) || isUndefined( targetVal ) ) {
    throw TypeError( 'Invalid argument(s)' );
  }
  if ( !isSorted( array ) ) {
    throw Error( 'Array must be sorted for binary search' );
  }

  // Search bounds
  let lowerBound = 0,
    upperBound = array.length - 1;

  // Do search
  while ( lowerBound <= upperBound ) {
    const middleIdx = Math.floor( ( upperBound + lowerBound ) / 2 );

    // Found
    if ( array[middleIdx] === targetVal ) {
      return middleIdx;
    }

    // If the target is GREATER than
    // comparison value (current middle), search upper half
    // If it's lower, then split to lower half
    targetVal > array[middleIdx]
      ? ( lowerBound = middleIdx + 1 )
      : ( upperBound = middleIdx - 1 );
  }

  // Target is not in array
  return -1;
};
