const isArray = require( 'lodash/isArray' );
const { swap } = require( '../utils' );

/**
 * INSERTION SORT
 * Time: O(n^2)
 * Space: O(1)
 *
 * Loop through array
 * Move unsorted items into sorted portion
 * Shift everything over to insert at correct location
 *
 * 1. [_2,4,1,3]
 * 2. [1,2,4,3]
 * 3. [1,2,3,4] // Sorted
 */

module.exports = function insertionSort( array ) {
  if ( !isArray( array ) ) {
    throw new Error( 'Please provide valid array' );
  }

  const n = array.length;
  for ( let i = 1; i < n; i++ ) {
    const currVal = array[i]; // Store comparison value

    // Shift everything greater than A[i] over to make space
    let j;
    for ( j = i - 1; j >= 0 && array[j] > currVal; j-- ) {
      array[j + 1] = array[j]; // nextJ = prevJ
    }

    // Insert stored value @ open location
    array[j + 1] = currVal;
  }
  // Return sorted array
  return array;
};
