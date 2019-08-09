/* eslint indent: 0, curly: 0 */

/**
 * Integer to English Words
 *
 * Convert a non-negative integer to its english words representation.
 * Given input is guaranteed to be less than 2^31 - 1.
 *
 * @example
 * Input: 9
 * Output: 'Nine'
 *
 * Input: 123
 * Output: 'One Hundred Twenty Three'
 *
 * Input: 12345
 * Output: 'Twelve Thousand Three Hundred Forty Five'
 *
 * Input: 1234567
 * Output: 'One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven'
 *
 * Input: 1234567890
 * Output: 'One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety'
 *
 * @analysis
 * Time: O(N)
 * Mem: O(1) Just a string, longer number doesn't mean longer word persay.
 *
 */

/**
 * @param {number} n
 * @return {string}
 */
module.exports = function numberToWords( n ) {
  if ( isZero( n ) ) return 'Zero';

  // Numbers
  const numThous = 10**3,
        numMil = 10**6,
        numBil = 10**9;

  // Number places
  const billions = n / numBil | 0,
        afterBils = n - billions * numBil,
        millions = afterBils / numMil | 0,
        afterMils = afterBils - millions * numMil,
        thousands = afterMils / numThous | 0,
        hundreds = afterMils - thousands * numThous;

  // Comparisons
  const hasBillions = !isZero( billions ),
        hasMillions = !isZero( millions ),
        hasThousands = !isZero( thousands ),
        hasHundreds = !isZero( hundreds );

  // Words
  const billionsAsWord = `${three( billions )} Billion`,
        millionsAsWord = `${three( millions )} Million`,
        thousandsAsWord = `${three( thousands )} Thousand`,
        hundredsAsWord = `${three( hundreds )}`;


  ///////////
  // LOGIC
  /////////
  const wordParts = [];

  hasBillions && wordParts.push( billionsAsWord );
  hasMillions && wordParts.push( millionsAsWord );
  hasThousands && wordParts.push( thousandsAsWord );
  hasHundreds && wordParts.push( hundredsAsWord );

  const numberAsWord = wordParts.join( ' ' );

  return numberAsWord;
};


function isZero( n ) {
  return n === 0;
}

/**
 * Converts chunks of three.
 * e.g 123 -> 'One Hundred Twenty Three'
 * Less than 100 will defer to twos chunk. See `two()`.
 */
function three( n ) {
  const _100 = 100,
        hundreds = n / _100 | 0,
        hundsWord = `${one( hundreds )} Hundred`,
        tensOnes = n - hundreds * _100,
        tensOnesWord = two( tensOnes ),
        isLTHundred = isZero( hundreds ) && !isZero( tensOnes ),
        isMultHundred = !isZero( hundreds ) && isZero( tensOnes ),
        isHundsTensOnes = !isZero( hundreds * tensOnes );

  if ( isLTHundred ) return tensOnesWord;
  if ( isMultHundred ) return hundsWord;
  if ( isHundsTensOnes ) return `${hundsWord} ${two( tensOnes )}`;
  return '';
}

/**
 * Converts chunks of two
 * e.g 10->'Ten', 11->'Eleven', 99->'Ninety Nine'
 */
function two( n ) {
  const isZero = n === 0,
        isOnes = n < 10,
        isTeens = n < 20;

  if ( isZero ) return '';
  if ( isOnes ) return one( n );
  if ( isTeens ) return teen( n );


  const tens = n / 10 | 0,
        ones = n - tens * 10,
        isMultipleTen = ones === 0,
        tensWord = ten( tens ),
        onesWord = one( ones );

  if ( isMultipleTen ) return tensWord;
  return `${tensWord} ${onesWord}`;
}


function one( n ) {
  switch ( n ) {
    case 1: return 'One';
    case 2: return 'Two';
    case 3: return 'Three';
    case 4: return 'Four';
    case 5: return 'Five';
    case 6: return 'Six';
    case 7: return 'Seven';
    case 8: return 'Eight';
    case 9: return 'Nine';
    default: return '';
  }
}

function teen( n ) {
  switch ( n ) {
    case 10: return 'Ten';
    case 11: return 'Eleven';
    case 12: return 'Twelve';
    case 13: return 'Thirteen';
    case 14: return 'Fourteen';
    case 15: return 'Fifteen';
    case 16: return 'Sixteen';
    case 17: return 'Seventeen';
    case 18: return 'Eighteen';
    case 19: return 'Nineteen';
    default: return '';
  }
}

function ten( n ) {
  switch ( n ) {
    case 2: return 'Twenty';
    case 3: return 'Thirty';
    case 4: return 'Forty';
    case 5: return 'Fifty';
    case 6: return 'Sixty';
    case 7: return 'Seventy';
    case 8: return 'Eighty';
    case 9: return 'Ninety';
    default: return '';
  }
}
