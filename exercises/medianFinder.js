/**
 * Find Median from Data Stream
 *
 * Median is the middle value in an ordered integer list.
 * If the size of the list is even, there is no middle value.
 * So the median is the mean of the two middle value.
 *
 * For example:
 * [2,3,4],the median is 3
 * [2,3], the median is (2 + 3) / 2 = 2.5
 *
 * Design a data structure that supports the following two operations:
 * - void addNum(int num): Add a int from data stream to the data structure.
 * - double findMedian() - Return the median of all elements so far.
 *
 * @example
 * addNum(1)
 * addNum(2)
 * findMedian() // output 1.5
 * addNum(3)
 * findMedian() // 2
 *
 * Analysis, where n is total numbers added:
 * Time: O(log n) for binary search, O(n) for insert = O(n)
 * Note: Optimally, you'd get this down to O(log n).
 * In languages with heaps built in (or priority queue),
 * use maxHeap to store lower numbers, minHeap to store higher,
 * keep them balanced and return either lo.top() or avg(lo.top(), hi.top()).
 * Space: O(n) <- Store numbers/data
 *
 */

/**
 * initialize your data structure here.
 */
function MedianFinder() {
  this.data = [];
}

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function( num ) {
  let left = 0,
    right = this.data.length - 1;

  while ( left <= right ) {
    const mid = right + left >> 1;
    if ( num > this.data[mid] ) {
      left = mid + 1;
    }
    else {
      right = mid - 1;
    }
  }

  this.data.splice( left, 0, num );
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  const mid = this.data.length >> 1;
  if ( this.data.length & 1 ) {
    return this.data[mid];
  }
  return 0.5 * ( this.data[mid] + this.data[mid-1] );
};

module.exports = MedianFinder;
