/**
 * Convert Roman number to Integer
 *
 * @param {string} s
 * @return {number}
 *
 * Assumptions: 1 <= converted integer <= 3999
 */
module.exports = function romanToInt( s ) {
  const legend = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    },
    sLen = s.length;

  let int = 0, // Converted integer
    i = 0, // Pointer
    a, b, sign;

  // Save a few ms for 1-letter
  if ( sLen === 1 ) {
    return legend[s];
  }

  while ( i < sLen ) {
    [a, b] = [s[i], s[i + 1]];
    sign = b && legend[a] < legend[b] ? -1 : 1;
    int += legend[a] * sign;
    i++;
  }

  return int;
};
