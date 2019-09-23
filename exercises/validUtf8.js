/**
 * UTF-8 Validation (Planatir Technologies Only)
 *
 * A character in UTF8 can be from 1 to 4 bytes long,
 * subjected to the following rules:
 * - For 1-byte character, the first bit is a 0, followed by its unicode code.
 * - For n-bytes character, the first n-bits are all one's, the n+1 bit is 0,
 *   followed by n-1 bytes with most significant 2 bits being 10.
 *
 * This is how the UTF-8 encoding would work:
 * Char. number range  |        UTF-8 octet sequence
 *     (hexadecimal)    |              (binary)
 *  --------------------+---------------------------------------------
 *  0000 0000-0000 007F | 0xxxxxxx
 *  0000 0080-0000 07FF | 110xxxxx 10xxxxxx
 *  0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
 *  0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
 *
 * Given an array of integers representing the data,
 * return whether it is a valid utf-8 encoding.
 * Note:
 * - The input is an array of integers.
 * - Only the least significant 8 bits of each int is used to store the data.
 *   i.e, each integer represents only 1 byte of data.
 *
 * @example
 * Input: data = [197, 130, 1],
 *        which represents the octet sequence: 11000101 10000010 00000001.
 * Output: Return true.
 * Explanation: It is a valid utf-8 encoding for a 2-bytes character
 *              followed by a 1-byte character.
 *
 * @example
 * Input: data = [235, 140, 4],
 *        which represented the octet sequence: 11101011 10001100 00000100.
 * Output: Return false.
 * Explanation: The first 3 bits are all one's and the 4th bit is 0
 *              means it is a 3-bytes character.
 *              The next byte is a continuation byte which starts with 10,
 *              which is correct, but the second continuation byte does not
 *              start with 10, so it is invalid.
 *
 * Analysis:
 * N is number of ints in array. (repr 1 byte each)
 * Time: O(N)
 * Space: O(1) Note: If we stored strings instead (eg num.toString(8) -> O(N)
 *
 */

/**
 * @param {number[]} data
 * @return {boolean}
 */
module.exports = function validUtf8( data ) {
  if ( !data || !data.length ) {
    return true;
  }

  let i = 0;
  while ( i < data.length ) {
    const bytes = getBytes( data, i );
    // Continuation byte where shouldn't be or > Max UTF
    if ( bytes === 0 || bytes > 4 ) {
      return false;
    }
    // Valid 1-byte. No need to check for continuation bytes.
    if ( bytes === 1 ) {
      i += 1;
      continue;
    }
    // Should be all continuation bytes until next char.
    // If expecting bytes overshoots data, not valid.
    const nextCharIndex = i + bytes;
    if ( nextCharIndex > data.length ) {
      return false;
    }
    while ( ++i < nextCharIndex ) {
      if ( !( isContinuationByte( data, i ) ) ) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Determines expected bytes of UTF-8 Character.
 * @param {number[]} arr
 * @param {number} i
 * @return {number}
 */
const getBytes = ( arr, i ) => {
  // Max valid utf start is 247 with 4 bytes '11110111'
  if ( arr[i] > 247 || arr[i] < 0 ) {
    return 5;
  }
  let bytes = 0;
  let mask = 1 << 7;  // 128='10000000'
  while ( mask & arr[i] ) {
    bytes += 1;
    mask >>= 1;
  }
  // Keep consistent with problem description
  if ( bytes === 0 ) return 1;
  if ( bytes === 1 ) return 0;
  return bytes;
};

/**
 * Determines whether 2 most significant bits of 8 LSBs is '10'.
 * @param {number[]} arr
 * @param {number} i
 * @return {boolean}
 */
const isContinuationByte = ( arr, i ) => {
  const msb1 = 1 << 7;  // 1....
  const msb2 = 1 << 6;  // NOT .1...
  return ( arr[i] & msb1 ) && !( arr[i] & msb2 );
};
