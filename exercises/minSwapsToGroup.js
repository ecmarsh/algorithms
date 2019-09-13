/**
 * Minimum Swaps to Group All 1's Together
 *
 * Given a binary array data, return the minimum number of swaps required
 * to group all 1’s present in the array together in *any place* in the array.
 *
 * @example
 * Input: [1,0,1,0,1]
 * Output: 1
 * Explanation:
 *  There are 3 ways to group all 1's together:
 *  [1,1,1,0,0] using 1 swap.
 *  [0,1,1,1,0] using 2 swaps.
 *  [0,0,1,1,1] using 1 swap.
 *  The minimum is 1.
 * @example
 * Input: [0,0,0,1,0]
 * Output: 0
 * Explanation: Since there is only one 1 in the array, no swaps needed.
 * @example
 * Input: [1,0,1,0,1,0,0,1,1,0,1]
 * Output: 3
 * Explanation: One possible solution 3 swaps is [0,0,0,0,0,1,1,1,1,1,1].
 *
 * Constraints:
 * 1. `1 <= data.length <= 1e5`
 * 2. `0 <= data[i] <= 1`
 *
 *
 * Analysis:
 * N is len(data)
 * Time: O(N) (count ones) + O(N) calc min swaps = O(2N) --> O(N)
 * Space: O(1)
 *
 */

/**
 * @param {number[]} data
 * @return {number}
 */
module.exports = function minSwaps( data ) {
  const totalOnes = data.reduce( ( acc, cur ) => acc + cur, 0 );

  if ( totalOnes <= 1 ) {
    return 0;
  }

  let left = 0;
  let right = 0;
  let ones = data[right];

  while ( right < totalOnes - 1 ) {
    ones += data[right + 1];
    right += 1;
  }

  let minZeros = totalOnes - ones;

  for ( left, right; right < data.length - 1; left++, right++ ) {
    ones += data[right + 1] - data[left];
    minZeros = Math.min( minZeros, totalOnes - ones );
  }

  return minZeros;
};
