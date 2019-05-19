const isArray = require( 'lodash/isArray' );

/**
 * COUNTSORT
 * @k :: Range of data
 * Loops:
 * 0. If range not provided, loop to get range: O(n)
 * 1. Loop over items to create histogram : O(n)
 * 2. Prefix sum loop : O(k)
 * 3. Filling new array: O(n)
 * @time :: O(n + n + k + n) -> O(3n +k) -> O(n+k)
 * @space :: O(k) <-- 'hash-like` obj to store counts
 *
 * @usage :: Sorting integers w/ limited range
 * Does not require swapping elements
 *
 * @stable :: relative order w/ equal keys is preserved
 * stability important as helper to radix sort
 *
 */

module.exports = function countSort( unsortedArr, k ) {
  // Preliminary checks
  if ( !isArray( unsortedArr ) ) {
    throw new Error( `Array parameter is invalid` );
  }
  if ( unsortedArr.length === 1 ) {
    return unsortedArr; // No need to sort
  }

  // 0. Get range if not provided -> O(n)
  let max = 0,
    min = 0;
  if ( typeof k === 'undefined' ) {
    for ( const v of unsortedArr ) {
      if ( v > max ) {
        max = v;
      }
      if ( v < min ) {
        min = v;
      }
    }
    k = max - min + 1;
  }

  // 1. Create "histogram": Ot(n) time, Osp(k)
  const histogram = {};
  for ( let i = 0; i < unsortedArr.length; i++ ) {
    const key = `${unsortedArr[i]}`;
    histogram[key] = histogram[key] + 1 || 1;
  }

  // 2. Prefix sums -> O(k)
  let acc = 0;
  for ( let i = 0; i < k; i++ ) {
    const key = `${min + i}`;
    acc = histogram[key] + acc || acc;
    histogram[key] = acc;
  }

  // 3. Fill new array using histogram -> O(n)
  const newArray = Array( unsortedArr.length );
  for ( const v of unsortedArr ) {
    const idx = histogram[v] - 1;
    newArray[idx] = v;
    histogram[v] = histogram[v] - 1;
  }

  // 3. Return sorted array
  return newArray;
};
