/**
 * Interval List Intersections
 *
 * Given two lists of closed intervals,
 * each list of intervals is pairwise _disjoint_ and in _sorted_ order.
 * Return the intersection of these two interval lists.
 *
 * (Formally, a closed interval [a, b] (with a <= b) denotes
 * the set of real numbers x with a <= x <= b.
 * The intersection of two closed intervals is a set of real numbers
 * that is either empty, or can be represented as a closed interval.
 * For example, the intersection of [1, 3] and [2, 4] is [2, 3].)
 *
 * @example
 * Input:
 * A = [[0,2],[5,10],[13,23],[24,25]]
 * B = [[1,5],[8,12],[15,24],[25,26]]
 * Output:
 * [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
 *
 * Big-O
 * A = len(A), B = len(B)
 * Time: O( A + B )
 * Space: Output Array O(1), likely min(A,B) though.
 *
 */

/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
module.exports = function intervalIntersection( A, B ) {
  const intersections = [];

  let a = 0;
  let b = 0;

  while ( a < A.length && b < B.length ) {
    const [aStart, aEnd] = A[a];
    const [bStart, bEnd] = B[b];

    const maxStart = Math.max( aStart, bStart );
    const minEnd = Math.min( aEnd, bEnd );

    if ( maxStart <= minEnd ) {
      intersections.push( [maxStart, minEnd] );
    }

    aEnd <= bEnd ? a++ : b++;
  }

  return intersections;
};

/*

let a, b = 0, 0
curA= A[a], curB= B[b]

merge:
  (can combine these and use max for start)
  if A.start >= B.start && A.start <= B.end:
    ans.add( [A.start, min( A.end, B.end ) ])
  if B.start >= A.start && B.start <= A.end:
    ans.add( [B.start, min( B.end, A.end ) ] )
  decide which to increment:
    if A.end <= B.end:
      a++
    else:
      b++;

Time would be Alen + Blen
Space would just be output.

*/
