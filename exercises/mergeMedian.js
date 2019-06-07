const { median } = require( '../utils' );

/**
 * There are two sorted arrays nums1 and nums2 of size m and n respectively.
 * Find the median of the two sorted arrays..
 * You may assume nums1 and nums2 cannot be both empty.
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 *
 * Using merge, can also do in shorter time using median comparisons. Simpler with same sized arrays.
 */

module.exports = function findMedianSortedArrays( nums1, nums2 ) {
  let merged = [],
    i = 0;

  while ( nums1.length && nums2.length ) {
    merged[i++] = nums1[0] < nums2[0]
      ? nums1.shift()
      : nums2.shift();
  }

  merged = [...merged, ...nums1, ...nums2];
  return median( merged );
};
