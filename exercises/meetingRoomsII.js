/**
 * Meeting Rooms II
 *
 * Given an array of meeting time intervals consisting of start and end times
 * [[s1,e1],[s2,e2],...] (si < ei),
 * find the minimum number of conference rooms required.
 *
 * @example
 * Input: [[0,30],[5,10],[15,20]]
 * Output: 2
 *
 * @example
 * Input: [[7,10],[2,4]]
 * Output: 1
 */

/**
 * @param {number[][]} intervals
 * @return {number}
 */
module.exports = function minMeetingRooms( intervals ) {
  const n = intervals.length;

  if ( n < 2 ) {
    return n;
  }

  const starts = intervals.sort( ( a, b ) => a[0] - b[0] ),
    ends = [...starts].sort( ( a,b ) => a[1] - b[1] );

  let rooms = 0;

  for ( let s = 0, e = 0; s < n; ++s ) {
    const [[start], [,end]] = [starts[s], ends[e]];

    if ( start < end ) {
      ++rooms;
    }
    else {
      ++e;
    }
  }

  return rooms;
};
