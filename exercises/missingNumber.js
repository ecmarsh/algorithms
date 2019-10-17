/**
 * Missing number
 *
 * Given an array containing `n` distinct numbers taken
 * from `0,1,2,...,n`, return the number that is missing.
 *
 * @param {number[]} nums
 * @return {number}
 *
 * @example
 * Input: [3,0,1]
 * Output: 2
 * @example
 * Input: [9,6,4,2,3,5,7,0,1]
 * Output: 8
 *
 * Complexity: See corresponding solutions. N is nums.length.
 */


/**
 * _Sorting_
 * Sort the numbers and since 0..n, each A[i] should match i
 * Time: n log n sort + n search = O(N log N)
 * Space: O(1)
 */
function sorting( nums ) {
  nums.sort( ( a, b ) => a - b );

  for ( let i = 0; i < nums.length; i++ ) {
    if ( nums[i] !== i ) {
      return i;
    }
  }

  return nums.length + 1;
}

/**
 * _Caching_
 * Most intuitive...store numbers seen and find one not seen.
 * Time: 2N = O(N)
 * Space: O(N)
 */
function caching( nums ) {
  const n = nums.length + 1;
  const seen = Array( n ).fill( false );

  nums.forEach( ( num ) => {
    seen[num] = true;
  } );

  for ( let i = 0; i < n; i++ ) {
    if ( !seen[i] ) {
      return i;
    }
  }

  return n;
}

/**
 * _Markers_
 * Instead of using a separate array to store seen,
 * modify nums using a marker that lets us know `i` has been seen
 * but still maintains current value.
 * Since all are non-negative, our marker can be (-A[i])
 * and use abs to retrieve the original val.
 * Time: 2N = O(N)
 * Space: O(1) nums is modified in place
 */
function markers( nums ) {
  // Set the "marks"
  for ( let i = 0; i < nums.length; i++ ) {
    const val = Math.abs( nums[i] );
    if ( val < nums.length ) {
      nums[val] = -nums[val];
    }
  }
  // Check for index where nums[i] was unchanged (not negative)
  for ( let i = 0; i < nums.length; i++ ) {
    const n = nums[i];
    // Need to check for (-0) vs unchanged 0
    // Otherwise if its still positive, it's missing
    if ( n > 0 || ( nums[i] === 0 && !Object.is( -0, nums[i] ) ) ) {
      if ( !Object.is( -0, nums[i] ) ) {
        return i;
      }
    }
  }
  // every number from 0 .. len(nums)-1 is there,
  // so n must be nums.length
  return nums.length;
}

/**
 * _Math_
 * As noticed from above solutions, we see that we're basically
 * looking for a corresponding val of `i` for each `i` from 0..n.
 * So expected is SIGMA(i=0..n-1) f(i)=i
 * And what we have is SIGMA(i=0..n-1) f(i)=nums[i]
 * So the expected-actual will leave us with the missing number.
 * To simply, we use the communative property ((e1-a1)+(e2-a2)=(e1-a2)+(e2-a1))
 * in order to find the number that is missing using the idea of summation.
 * Missing = SIGMA(i=0..n) d(i) = i - nums[i]
 * Time: O(N)
 * Space: O(1)
 */
function math( nums ) {
  const n = nums.length;
  let sum = n;
  for ( let i = 0; i <= n - 1; i++ ) {
    // expected i - actual nums[i]
    sum += ( i - nums[i] );
  }
  return sum;
}

/**
 * _XOR_
 * Building off the math idea, we can use XOR properties to find the difference.
 * Again, we're looking for a corresponding val of `i` for each `i` from 0..n
 * Now we know XOR has properties of:
 *   x ^ x = 0
 *   x ^ 0 = x
 * And these properties are also communative.
 * If for each `i`, we should have a corresponding nums[i], if we XOR
 * each `i` with nums[i], all matches should be x^x=0,
 * and the remaining number will be missing^(allmatches=0)=missing.
 * Time: O(N)
 * Space: O(1)
 */
function xor( nums ) {
  // Essentially same as math solution with XOR instead of difference.
  return nums.reduce( ( accXOR, val, i ) => accXOR ^ i ^ val, nums.length );
}

// export all solutions in module missingNumber
const missingNumber = {
  caching,
  sorting,
  markers,
  math,
  xor,
};
module.exports = missingNumber;
