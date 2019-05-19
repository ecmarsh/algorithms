const isArray = require( 'lodash/isArray' );
const { swap } = require( '../utils' );
/**
 * Selection Sort
 * Time: O(n^2) // One loop for each place, one loop to find min
 * Space: O(1)
 *
 * On each loop, look ahead for min value in array
 * if found, insert it into that position
 *
 * 0. [_7,4,1,2] // min: 1
 * 1. [1,_4,7,2] // min: 2
 * 2. [1,2,_7,4] // min: 4
 * 3. [1,2,4,7] // SORTED
 */

module.exports = function selectionSort( array ) {
  // 0. Validate
  if ( !isArray( array ) ) {
    throw new Error( 'Please provide a valid array' );
  }

  // 1. Loop through each item in the array
  const n = array.length;
  for ( let i = 0; i < n; i++ ) {
    let minIdx = i;
    // 2. Find i^th min value in array
    for ( let j = i + 1; j < n; j++ ) {
      if ( array[j] < array[minIdx] ) {
        minIdx = j; // Replace min if smaller;
      }
    }
    // 3. Swap if not in position
    if ( array[i] !== array[minIdx] ) {
      swap( array, i, minIdx );
    }
  }

  // 4. Return sorted array
  return array;
};
