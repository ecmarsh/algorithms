const { partition } = require( '../utils' );

/**
 * Quickselect (Select in place)
 * Finds the `k`th smallest element in unsorted
 *
 * Uses same approach as quicksort,
 * but only recurses on side w/ element
 *
 * Time: O(n) (vs O(n log n))
 *
 * Params:
 * @A :: array (sorted or unsorted)
 * @l :: low bound
 * @h :: high bound
 * @k :: `k`th smallest element
 *
 * @returns :: kth smallest element
 */

module.exports = function quickSelect( A, l, h, k ) {
  const p = partition( A, l, h );

  // Partition Index is value kth smallest
  if ( p === k - 1 ) {
    return A[p];
  }

  // Else choose side to keep searching
  return p > k - 1
    ? quickSelect( A, l, p - 1, k ) // smaller
    : quickSelect( A, p + 1, h, k ); // larger
};
