/**
 * Integer To Roman
 *
 * Roman numerals are represented by seven different symbols:
 *
 * Symbol | Value
 * ------ | -----
 * I      | 1
 * V      | 5
 * X      | 10
 * L      | 50
 * C      | 100
 * D      | 500
 * M      | 1000
 *
 * For example, two is written as II in Roman numeral, just two one's
 * added together. Twelve is written as, XII, which is simply X + II. The
 * number twenty seven is written as XXVII, which is XX + V + II.
 *
 * Roman numerals are usually written largest to smallest from left to right.
 * However, the numeral for four is not IIII. Instead, the number four is
 * written as IV. Because the one is before the five we subtract it making
 * four. The same principle applies to the number nine, which is written as IX.
 * There are six instances where subtraction is used:
 *    - I can be placed before V (5) and X (10) to make 4 and 9.
 *    - X can be placed before L (50) and C (100) to make 40 and 90.
 *    - C can be placed before D (500) and M (1000) to make 400 and 900.
 *
 * Given an integer, convert it to a roman numeral.
 *
 * Constraints:
 * - Input is guaranteed to be within the range from 1 to 3999.
 *
 * @example
 * Input: 3
 * Output: 'III'
 * @example
 * Input: 4
 * Output: 'IV'
 * @example
 * Input: 9
 * Output: 'IX'
 * @example
 * Input: 58
 * Output: 'LVIII'
 * Explanation: L=50, V=5, III=3
 * @example
 * Input: 1994
 * Output: 'MCMXCIV'
 * Explanation: M=1000, CM=900, XC=90, IV=4
 *
 *
 * Analysis:
 * Time: O(4) = O(1)
 * Space: O(33 entries) = O(1)
 */

/**
 * @param {number} n Integer to convert.
 * @return {string} Roman numeral.
 */
module.exports = function intToRoman( n ) {
  const m = getMap();
  const r = [];
  for ( let i = 3; i >= 0; i-- ) {
    const e = 10**i;
    const k = `${i}-${0 | n/e}`;
    n %= e;
    r.push( m[k] );
  }
  return r.join( '' );
};

const getMap = () => ( {
  '3-3': 'MMM',
  '3-2': 'MM',
  '3-1': 'M',
  '3-0': '',

  '2-9': 'CM',
  '2-8': 'DCCC',
  '2-7': 'DCC',
  '2-6': 'DC',
  '2-5': 'D',
  '2-4': 'CD',
  '2-3': 'CCC',
  '2-2': 'CC',
  '2-1': 'C',
  '2-0': '',

  '1-9': 'XC',
  '1-8': 'LXXX',
  '1-7': 'LXX',
  '1-6': 'LX',
  '1-5': 'L',
  '1-4': 'XL',
  '1-3': 'XXX',
  '1-2': 'XX',
  '1-1': 'X',
  '1-0': '',

  '0-9': 'IX',
  '0-8': 'VIII',
  '0-7': 'VII',
  '0-6': 'VI',
  '0-5': 'V',
  '0-4': 'IV',
  '0-3': 'III',
  '0-2': 'II',
  '0-1': 'I',
  '0-0': '',
} );
