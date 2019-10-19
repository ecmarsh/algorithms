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
  if ( !intervals || !intervals.length ) {
    return [];
  }

  const BEG = 0;
  const END = 1;

  // 1. Sort the intervals based on increasing order of starting time.
  intervals.sort( ( a, b ) => a[BEG] - b[BEG] );

  // 2. Push the first interval on to stack
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
        this.intervals[this.intervals.length - 1][END] = newEndTime;
      },
    };
  };

  const s = new Stack( intervals[0] );

  // 3. For each interval, do:
  intervals.forEach( interval => {
    // a. If the current interval does not overlap with the stack top, push it.
    if ( interval[BEG] > s.top[END] ) {
      s.push( interval );
    }
    // b. If the current interval overlaps with stack top and
    // ENDing time of current interval is more than that of stack top,
    // update stack top with the ENDing time of current interval.
    else if ( interval[END] > s.top[END] ) {
      s.updatedIntervalEnd = interval[END];
    }
  } );

  // 4. Stack contains the merged intervals.
  return s.mergedIntervals;
};
