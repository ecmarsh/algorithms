/**
 * @lc id=406 lang=javascript tag=greedy
 *
 * Suppose you have a random list of people standing in a queue.
 * Each person is described by a pair of integers (h, k),
 * where `h` is the height of the person and `k` is the number of people
 * in front of this person who have a **height greater than or equal** to h.
 * Write an algorithm to reconstruct the queue.
 *
 * @constraint
 *  - The number of people is less than 1,100.
 *
 * @example
 * Input: [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
 * Output: [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
 *
 * @complexity
 * Time: O(n^2) -> O(nlogn) sort + n insert operations taking up to
 * O(n-k) or O(k) time depending on implementation = O(n^2)
 * Space: O(n) -> the reconstructed queue (output)
 */

/**
 * @param {number[][]} people
 * @return {number[][]}
 */
module.exports = function reconstructQueue( people ) {
  const queue = [];

  people
  // sort shortest to tallest, ascending k O(n log n)
    .sort( ( a, b ) => b[0] - a[0] || a[1] - b[1] )

  // reconstruct the queue by adding in at index of their k
  // value, shifting everyone taller thats already been inserted up
  // worst up to O(n^2)
    .forEach( person => {
      // native insert op requires shifting everyone up, up to O(n-k) time
      queue.splice( person[1], 0 , person );
    } );

  return queue;
};
