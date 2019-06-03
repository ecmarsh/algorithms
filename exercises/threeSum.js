/**
 * 3Sum To Zero
 * Given an array nums of n integers, are there elements in nums such that a + b + c = 0?
 * Find all unique triplets in the array which gives the sum of zero.
 * Return value must not include duplicate triplets.
 *
 * Example:
 * Input: [-1, 0, 1, 2, -1, -4],
 * Output: [[-1, 0, 1],[-1, -1, 2]]
 *
 */

module.exports = function threeSum( nums ) {
  // Intialize
  const n = nums.length,
    triplets = [];

  // Bases
  if ( !n || n < 3 ) {
    return triplets;
  }

  // Sort array (assume n log n)
  nums.sort( ( a, b ) => a - b );

  // Run loop from i=0 to n-2.
  for ( let i = 0; i < n - 2; i++ ) {

    // No duplicates
    if ( i > 0 && nums[i] == nums[i - 1] ) {
      continue;
    }

    // Initialize left and right index variables
    let l = i + 1,
      r = n - 1;

    // On each i-th value, search for pairs of l, r
    // that create a triplet summing to zero
    while ( l < r ) {
      const sum = _sum( i, l, r );

      // Check for match, if match, increase left, decrease right
      // If sum is less than zero then l++, else r--
      if ( sum === 0 ) {
        triplets.push( [i, l, r].map( idx => nums[idx] ) );
        // Skip duplicates in second, third indices
        while ( l < r && nums[l] === nums[l + 1] ) {
          l++;
        }
        while ( l < r && nums[r] === nums[r - 1] ) {
          r--;
        }
        l++;
        r--;
      } else if ( sum < 0 ) {
        l++;
      } else {
        r--;
      }
    }

  }

  // 7. Return triplets or empty array
  return triplets;

  // Helper function to add values of passed indices
  function _sum( ...indices ) {
    return indices.reduce( ( acc, cur ) => acc + nums[cur], 0 );
  }
};
