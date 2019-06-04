/**
 * Merge Intervals
 * Given a collection of intervals, merge all overlapping intervals.
 * Equal times are considered overlapping.
 *
 * Example:
 * Input: [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 */

module.exports = function mergeIntervals( intervals ) {
  // 0. Handle edge cases
  if ( !intervals || !intervals.length ) {
    return [];
  }

  // Using more descriptive names
  const start = 0, end = 1;

  // 1. Sort the intervals based on increasing order of starting time.
  intervals.sort( ( a, b ) => a[start] - b[start] );

  // 2. Push the first interval on to a 'stack'.
  const Stack = function( initialInterval ) {
    const intervals = [initialInterval];

    return {
      intervals,
      get mergedIntervals() {
        return this.intervals;
      },
      push( interval ) {
        this.intervals[this.intervals.length] = interval;
      },
      get top() {
        return this.intervals[this.intervals.length - 1];
      },
      set updatedIntervalEnd( newEndTime ) {
        this.intervals[this.intervals.length - 1][end] = newEndTime;
      },
    };
  };

  const s = new Stack( intervals[0] );

  // 3. For each interval do the following
  intervals.forEach( interval => {
    // a. If the current interval does not overlap with the stack top, push it.
    if ( interval[start] > s.top[end] ) {
      s.push( interval );
    }

    // b. If the current interval overlaps with stack top and
    // ending time of current interval is more than that of stack top,
    // update stack top with the ending time of current interval.
    else if ( interval[end] > s.top[end] ) {
      s.updatedIntervalEnd = interval[end];
    }
  } );

  // 4. At the end stack contains the merged intervals.
  return s.mergedIntervals;
};
