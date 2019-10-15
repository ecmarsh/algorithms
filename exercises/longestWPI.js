/* eslint-disable no-undef */
/**
 * Longest Well-Performing Interval
 *
 * We are given hours, a list of the number of hours worked per day
 * for a given employee.
 *
 * A day is considered to be a tiring day if and only if
 * the number of hours worked is (strictly) greater than 8.
 *
 * A well-performing interval is an interval of days for which
 * the number of tiring days is strictly larger than the number
 * of non-tiring days.
 *
 * Return the length of the longest well-performing interval.
 *
 * Constraints:
 *  - `1 <= hours.length <= 10,000`
 *  - `0 <= hours[i] <= 16`
 *
 *
 * @example
 * Input: [9,9,6,0,6,6,9]
 * Output: 3
 * Explanation: The longest well-performing interval is [9,9,6].
 *
 * @example
 * Input: [9,9,9,9]
 * Output: 4
 *
 *
 * Complexity:
 * n is number of days, hours.length
 * Time: O(n) one-pass limiting branching... beats 100% significantly
 * Space: O(n) sums - worst case all < 8 or vice versa is entry for every day
 */

/**
 * @param {number[]} hours
 * @return {number}
 */
module.exports = function longestWPI( hours ) {
  const map = new Map();
  let best = 0;

  hours.reduce( ( acc, cur, i ) => {
    // +1 if tiring (>8), -1 if not-tiring (<=8)
    acc += ( cur > 8 ) - ( cur <= 8 );
    // set 'prefix sum' at index only if first occurence
    map.has( acc ) || map.set( acc, i );
    // if i is positive, entire array is valid
    // otherwise else look for lowest M[i] | i < j and M[i]+1 == M[j]
    if ( acc > 0 ) {
      best = Math.max( best, i + 1 );
    } else if ( map.has( acc-1 ) ) {
      best = Math.max( best, i - map.get( acc - 1 ) );
    }
    // dont forget we're in a reducer :)
    return acc;
  }, 0 );

  return best;
};
