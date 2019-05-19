const isArray = require( 'lodash/isArray' );
const { swap } = require( '../utils' );

/**
 * 'Bubble' iterates over entire array and swaps if out of order
 * Largest element will be on the right after one loop
 *
 * @params :: unsortedArray
 * @returns :: sortedArray
 * @helpers :: swap
 * @time :: O(n^2)
 * @space :: O(1)
 *
 * @example :: [2,1,0] --> [1,2,0] --> [1,0,2] --> [0,1,2]
 */

module.exports = function bubbleSort( array ) {
  if ( !isArray( array ) ) {
    throw new Error( 'Please provide valid array' );
  }

  let end = array.length - 1,
    swaps = 0; // Track # of swaps

  do {
    swaps = 0; // Reset counter on each loop
    for ( let i = 0; i < end; i++ ) {
      const j = i + 1;
      if ( array[i] > array[j] ) {
        swap( array, i, j );
        swaps++;
      }
    }
    end--;
  } while ( swaps !== 0 ); // No swaps means sorted

  return array;
};
