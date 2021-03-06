/**
 * MERGESORT
 * 1. Recursively split array in half until array length is 1 (sorted)
 * 2. Merge halves together in order by comparison into sorted array
 * @TIME :: split: log n and loop to merge --> O(n log n ); // GUARANTEED!
 * @SPACE :: O(n) <-- create n (len = 1) arrays to merge
 *
 * Use when stable sort is needed
 *  (when you don't want to reorder
 *  elements w/ identical keys)
 *
 */

module.exports = function mergeSort( array ) {
  if ( array.length > 1 ) {
    // Split the array
    const slice = Array.prototype.slice, // copy and split
      splitIdx = Math.floor( array.length / 2 ), // middle
      leftHalf = slice.call( array, 0, splitIdx ),
      rightHalf = slice.call( array, splitIdx );

    // Recurse to split,
    // then merge once arrays @ len 1
    return merge( mergeSort( leftHalf ), mergeSort( rightHalf ) );
  }

  // Array length is 1 --> sorted
  return array;

  /**
   * Merge
   * Input: sorted arrays L and R (length n/2 each).
   * Output: sorted array (length n)
   * Simplifying assumption: n is even
   */
  function merge( left, right ) {
    const merged = []; // New array to store sorted elements
    let i = 0; // Index to add new elements

    // Compare left/right 1x1,
    // merge into new array in order
    while ( left.length && right.length ) {
      merged[i++] = left[0] < right[0] ? left.shift() : right.shift();
    }

    // Return array with any remaining elements
    return [...merged, ...left, ...right];
  }
};
