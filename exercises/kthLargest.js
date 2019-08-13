/**
 * Kth Largest Element in an Array
 *
 * Find the *k*th largest element in an _unsorted_ array.
 * Note that it is the kth largest element in the sorted order,
 * not the kth distinct element.
 *
 * @example
 * Input: [3,2,1,5,6,4], k=2
 * Output: 5
 *
 * @example
 * Input: [3,2,3,1,2,4,5,5,6], k=4
 * Output: 4
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
module.exports = function findKthLargest( nums, k ) {
  const n = nums.length,
    target = n - k;

  if ( !n )
    return -1;

  let L = 0,
    R = n - 1;

  while ( L <= R ) {
    const P = partition( nums, L, R );

    // Since partition moves smaller values
    // to left, and larger values to right,
    // we can safely assume that if pivot
    // index is the target, it is the 'kth' largest.
    // We don't care if left and right of pivot
    // is sorted or not, just that they're smaller and larger.
    if ( P === target )
      return nums[P];

    // If we're below the 'kth' index,
    // we don't care about smaller elements,
    // so we can just repeat for the larger half.
    if ( P < target )
      L = P + 1;
    else
      R = P - 1;
  }

  return -1;
};


const partition = ( nums, L, R ) => {
  // Since array is unsorted, the last index has the same chance
  // of being a good partition choice as any other index.
  const pivotValue = nums[R];

  // pivotIndex will be our ref to insertion point.
  // Every time we find a lower element, we'll increment the pivotIndex
  // and swap the value to the left of that index.
  let pivotIndex = L;

  for ( let currIndex = L; currIndex < R; currIndex++ ) {
    if ( pivotValue > nums[currIndex] ) {
      swap( nums, currIndex, pivotIndex );
      pivotIndex++;
    }
  }

  // Swap the pivot into place.
  swap( nums, pivotIndex, R );

  // Quick select only needs to know
  // where the pivot *index* is.
  return pivotIndex;
};

const swap = ( nums, L, R ) => {
  [nums[L], nums[R]] = [nums[R], nums[L]];
};
