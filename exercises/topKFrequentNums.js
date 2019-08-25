/* eslint-disable no-undef */
/**
 * Top K Frequent Elements
 *
 * Given a non-empty array of integers,
 * return the k most frequent elements.
 *
 * @example
 * Input: nums = [1,1,1,2,2,3]
 * Output: [1,2]
 *
 * Input: nums=[1] k=1
 * Output: 1
 *
 * Note:
 * - You may assume k is always valid: `1 <= k <= # unique`
 * - Algorithm's time complexity must be better than O(n log n),
 *   where n is the array's size/length.
 *
 * Analysis:
 * In JS, no built in priority queue, so below implementation is
 * O(N + k) time, but requires 3 passes.
 * Although better than O(n log n ), practically quicker would be to use a heap.
 * In python (interviews), just get the count of each num
 * and heapify it then take the k largest which would be:
 * O(N + N (log k)) = O(N log(k)) with O(N) to store counts and
 * discarded space to store n largest of heap/priority queue:
 * ```py
 * count = collections.Counter(nums)
 * return heapq.nlargest(k, count.keys(), key=count.get)
 * ```
 *
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
module.exports = function topKFrequent( nums, k ) {
  const counts = new Map(),
    freqs = [];

  const addNumToCounts = num => {
    const cnt = counts.get( num ) || 0;
    counts.set( num, cnt + 1 );
  };
  const addCountToFreqs = ( cnt, num ) => {
    const freq = freqs[cnt] || [];
    freq.push( num );
    freqs[cnt] = freq;
  };

  Array.prototype.forEach.call( nums, addNumToCounts );
  Map.prototype.forEach.call( counts, addCountToFreqs );

  const res = [];

  let i = freqs.length;
  while ( --i >= 0 ) {
    while ( freqs[i] && freqs[i].length ) {
      res.push( freqs[i].pop() );
      if ( res.length === k ) {
        return res;
      }
    }
  }

  return res;
};
