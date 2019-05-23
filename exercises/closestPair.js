/**
 * Given a sorted array and a number x,
 * find a pair in array whose sum is closest to x.
 *
 *
 * EXAMPLES:
 *
 * Input: arr = [10, 22, 28, 29, 30, 40], x = 54
 * Output: 22, 30
 * ---------------
 * Input: arr = [1, 3, 4, 7, 10], x = 15
 * Output: 4, 10
 */

module.exports = function closestPair( arr, sum ) {
  // 0. Validate
  if ( !Array.isArray( arr ) || typeof sum !== `number` ) {
    throw Error( `Invalid argument(s)` );
  }

  // 1. Initialize
  const n = arr.length,
    pair = [-1, -1]; // Result
  let low = 0, // Starting low idx
    high = n - 1, // Starting high idx
    diff = sum; // Difference of pair comparisons

  // 2) Loop and compare --> O(n)
  while ( low < high ) {
    const l = arr[low], // Low value
      h = arr[high], // High value
      d = Math.abs( l + h - sum );

    // Diff is smaller --> save
    if ( d < diff ) {
      diff = d;
      pair[0] = l;
      pair[1] = h;
    } else if ( l + h < sum ) {
      low++; // Below sum
    } else {
      high--; // Above sum
    }
  }

  // Output
  return pair.toString();
};
