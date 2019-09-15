/**
 * Shortest Distance To Target Color
 *
 * You are given an array colors, in which there are three colors: 1, 2 and 3.
 * You are also given some queries. Each query consists of two integers i and c.
 * Return the shortest distance between the given index i and the
 * target color c. If there is no solution return -1.
 *
 * Constraints:
 * - `1 <= colors.length <= 5*10^4`
 * - `1 <= colors[i] <= 3`
 * - `1 <= queries.length <= 5*10^4`
 * - `queries[i].length == 2`
 * - `0 <= queries[i][0] < colors.length`
 * - `1 <= queries[i][1] <= 3`
 *
 * @example
 * Input: colors = [1,1,2,1,3,2,2,3,3], queries = [[1,3],[2,2],[6,1]]
 * Output: [3,0,3]
 * Explanation:
 *   The nearest 3 from index 1 is at index 4 (3 steps away).
 *   The nearest 2 from index 2 is at index 2 itself (0 steps away).
 *   The nearest 1 from index 6 is at index 3 (3 steps away).
 *
 * @example
 * Input: colors = [1,2], queries = [[0,3]]
 * Output: [-1]
 * Explanation: There is no 3 in the array.
 *
 * Analaysis:
 * N is len(colors), k is number of queries
 * Time: (indexMap: O(N))+((O(k) + O(log N) bin search)) = O(N + k log N)
 * Note: log N is worst case where all colors same.
 *       Binary searching through number of apperances for particular color.
 * Space: O(N) <- index map
 *
 */

/**
 * @param {number[]} colors
 * @param {number[][]} queries
 * @return {number[]}
 */
module.exports = function shortestDistanceColor( colors, queries ) {
  // Interface: { color : [...indexesInColor] }
  const indexes = {};
  colors.forEach( ( color, i ) => {
    if ( color in indexes ) {
      indexes[color].push( i );
    } else {
      indexes[color] = [i];
    }
  } );

  queries.forEach( ( [start, color], i ) => {
    queries[i] = color in indexes ? closest( indexes[color], start ) : -1;
  } );

  return queries;
};

/**
 * Finds difference between closest element in arr and target index.
 * @param {number[]} arr Indexes of color in colors
 * @param {number[]} k Target index of
 * @return {number} Difference between target and closest
 */
function closest( arr, k ) {
  let left = 0, right = arr.length - 1;

  while ( left < right ) {
    const low = right + left >> 1;
    const high = low + 1;
    if ( ( k - arr[low] ) > ( arr[high] - k ) ) {
      left = high;
    } else {
      right = low;
    }
  }

  return Math.abs( k - arr[left] );
}
