/**
 * Day of Year
 * _Weekly Contest 149_ (Easy)
 *
 * Given a string date representing a Gregorian calendar date
 * formatted as YYYY-MM-DD, return the day number of the year.
 *
 * @example
 * Input: '2019-1-09'
 * Output: 9
 * Explanation: Given date is 9th day of 2019
 *
 * @example
 * Input: '2019-02-10'
 * Output: 41
 *
 * @example
 * Input: '2003-03-01'
 * Output: 60
 *
 * @example
 * Input: '2004-03-01'
 * Output: 61
 * Explanation: 2004 is a leap year.
 *
 *
 * Constraints:
 * + `date.length == 10`
 * + `date[4] == date[7] == '-'`, and `/\d/.test(allOthers) == true`
 * + `date` represents a calendar date between Jan 1st 1900 and Dec 31 2019
 *
 */

/**
 * @param {string} date
 * @return {number}
 */
module.exports = function dayOfYear( date ) {
  const [year, month, day] = date.split( '-' ).map( s => +s ),
    months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    isLeapYear = !( year % 4 ) && ( !!( year % 100 ) || !( year % 400 ) );

  return months
    .splice( 0, month - 1 )
    .reduce( ( a, b ) => a + b, day + +( month > 2 && isLeapYear ) );
};
