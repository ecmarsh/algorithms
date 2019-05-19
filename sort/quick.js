const isArray = require( 'lodash/isArray' );
const isLength = require( 'lodash/isLength' );
const { partition } = require( '../utils' );

/**
 * QUICK SORT
 * Time: [avg, worst] = [O(n log n), O(n^2)]
 * Space: O(log(n)) <-- Call stack recursion
 * Use when avg is optimal, works better for RAM cache
 *
 * Obtain a pivot (using last idx as pivot)
 * Move smaller elements to left, larger to right
 * Repeat until sorted
 *
 * A bad pivot means could take O(n^2)
 *
 */

const ARBITRARY_MAX_CALL_STACK_SIZE = 999;

module.exports = function quickSort( array, low, high ) {
  if ( !isArray( array ) ) {
    throw new Error( `Invalid array` );
  }
  if ( isLength( array.length ) && array.length > ARBITRARY_MAX_CALL_STACK_SIZE ) {
    throw new Error( `Stacks gonna overflow yo!` );
  }

  if ( low < high ) {
    const partitionIdx = partition( array, low, high );
    // Recursively sort left (smaller) half
    quickSort( array, low, partitionIdx - 1 );
    // Recursively sort right (larger) half
    quickSort( array, partitionIdx + 1, high );
  }
};
