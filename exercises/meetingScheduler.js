/**
 * @=lc id=1229 lang=javascript
 *
 * [1229] Meeting Scheduler
 * Biweekly Contest 11
 *
 * Given the availability time slots arrays slots1 and slots2 of two people and
 * a meeting duration duration, return the earliest time slot that works for
 * both of them and is of duration duration.
 *
 * If there is no common time slot that satisfies the requirements,
 * return an empty array.
 *
 * The format of a time slot is an array of two elements [start, end]
 * representing an inclusive time range from start to end.
 *
 * It is guaranteed that no two availability slots of the same person
 * intersect with each other. That is, for any two time slots [start1, end1]
 * and [start2, end2] of the same person, either start1 > end2 or start2 > end1.
 *
 * @constraints
 *  - `1 <= slots1.length, slots2.length <= 10^4`
 *  - `slots1[i].length, slots2[i].length == 2`
 *  - `slots1[i][0] < slots1[i][1]`
 *  - `slots2[i][0] < slots2[i][1]`
 *  - `0 <= slots1[i][j], slots2[i][j] <= 10^9`
 *  - `1 <= duration <= 10^6 `
 *
 * @example
 * Input:
 *  slots1= [[10,50],[60,120],[140,210]]
 *  slots2= [[0,15],[60,70]]
 *  duration=8
 * Output: [60,68]
 * @example
 * Input:
 *  slots1= [[10,50],[60,120],[140,210]]
 *  slots2= [[0,15],[60,70]]
 *  duration=12
 * Output: []
 *
 * @complexity
 * a is number of slots in 1, b is number of slots in 2
 * Time: sort=(aloga + blogb) + search(a+b) = O(aloga+blogb)
 * Space: O(1)
 */

/**
 * @param {number[][]} A Open slots 1.
 * @param {number[][]} B Open slots 2.
 * @param {number} dur Duration needed.
 * @return {number[]} Earliest possible time slot.
 */
module.exports = function minAvailableDuration( A, B, dur ) {
  A.sort( ( a, b ) => a[0] - b[0] );
  B.sort( ( a, b ) => a[0] - b[0] );

  let [a, b] = [0, 0];

  while ( a < A.length && b < B.length ) {
    const [begA, endA] = A[a];
    const [begB, endB] = B[b];
    const start = Math.max( begA, begB );
    const finish = Math.min( endA, endB );
    if ( start <= finish - dur ) {
      return [start, start + dur];
    }
    endA < endB ? a++ : b++;
  }

  return [];
};
