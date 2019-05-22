const swap = require( './swap' );

/**
 * Partition using Lomuto's Scheme
 * Best/Avg :: O(log n)
 * 3-way partition w/ equal keys (rare) --> O(n)
 * Worst :: O(n^2) <-- already in order
 *
 * Less efficient than Hoare's scheme (more swaps)
 * but eliminates risk of infinite recursion
 * for arrays with equal elements
 *
 */

module.exports = function partitionLomuto( arr, low, high ) {
  const pivot = arr[high];
  let i = low - 1; // Track where to insert final partition

  for ( let j = low; j <= high - 1; j++ ) {
    const currVal = arr[j];
    if ( currVal <= pivot ) {
      i++; // Increment smaller/larger divider
      swap( arr, i, j ); // Swap with currVal
    }
  }
  // Move pivot to middle
  swap( arr, i + 1, high );

  // Return index of partition
  return i + 1;
};

exports.partitionHoare = function( arr, low, high ) {
  const median = Math.floor( ( high - low ) / 2 );
  const pivot = arr[median];

  while ( low <= high ) {
    while ( pivot > arr[low] ) {
      low++;
    }
    while ( pivot < arr[high] ) {
      high--;
    }
    if ( low <= high ) {
      swap( arr, low, high );
      low++;
      high--;
    }
  }

  return low;
};
