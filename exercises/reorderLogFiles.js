/**
 * Reorder Log Files
 *
 * You have an array of logs. Each log is a space delimited string of words.
 * For each log, the first word in each log is an alphanumeric identifier.
 * Then, either:
 * - Each word after the identifier will consist only of lowercase letters, or;
 * - Each word after the identifier will consist only of digits.
 *
 * We will call these two varieties of logs letter-logs and digit-logs.
 * It is guaranteed that each log has at least one word after its identifier.
 * Reorder the logs so that all of the letter-logs come before any digit-log.
 *
 * The letter-logs are ordered lexicographically ignoring identifier,
 * with the identifier used in case of ties.
 * The digit-logs should be put in their original order.
 *
 * Return the final order of the logs.
 *
 * Notes:
 * 1. 0 <= logs.length <= 100
 * 2. 3 <= logs[i].length <= 100
 * 3. logs[i] is guaranteed to have an identifier, and at least one log.
 *
 * @example
 * Input: ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]
 * Output: ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]
 */

/**
 * @param {string[]} logs
 * @return {string[]}
 */
module.exports = function reorderLogFiles( logs ) {
  const digitLogs = [];
  const letterLogs = [];

  for ( const log of logs ) {
    if ( isDigitLog( log ) ) {
      digitLogs.push( log );
    }
    else {
      letterLogs.push( log );
    }
  }

  letterLogs.sort( compareLetterLogs );

  return letterLogs.concat( digitLogs );

  function compareLetterLogs( a, b ) {
    const aLogs = a.split( ' ' ).slice( 1 ).join( ' ' );
    const bLogs = b.split( ' ' ).slice( 1 ).join( ' ' );

    if ( aLogs > bLogs ) {
      return 1;
    }
    if ( aLogs < bLogs ) {
      return -1;
    }

    if ( aLogs === bLogs ) {
      const aId = a.split( ' ' )[0];
      const bId = b.split( ' ' )[0];

      if ( aId > bId ) {
        return 1;
      }
      if ( aId < bId ) {
        return -1;
      }
    }

    return 0;
  }

  function isDigitLog( log ) {
    return /\d/.test( log.split( ' ' )[1] );
  }
};
