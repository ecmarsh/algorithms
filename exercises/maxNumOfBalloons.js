/**
 * Max Number of Balloons
 * **Contest 154** (3-pts)
 *
 * Given a string text, you want to use the characters of text
 * to form as many instances of the word "balloon" as possible.
 *
 * You can use each character in text at most once.
 * Return the maximum number of instances that can be formed.
 *
 * @examples
 * Input: 'nlaebolko'
 * Output: 1
 *
 * Input: 'loonbalxballpoon'
 * Output: 2
 *
 * Input: 'leetcode'
 * Output: 0
 *
 * Analysis:
 * N is chars of text
 * Time: O(N) to build frequencies
 * Space: O(1), always storing only distinct characters in balloon=5.
 *
 */
module.exports = function maxNumberOfBalloons( text ) {
  // Count frequencies of balloon characters in text.
  const freq = { b: 0, a: 0, l: 0, o: 0, n: 0 };
  for ( let i = 0; i < text.length; i++ ) {
    if ( text[i] in freq ) {
      freq[text[i]] += 1;
    }
  }

  // Find limiting character to find max "balloon"s we can make.
  // We need 1x of ['b','a','n'], and 2x ['l','o'] to make one 'balloon'.
  let limit = freq.b;
  limit = Math.min( limit, freq.a );
  limit = Math.min( limit, freq.n );
  limit = Math.min( limit, freq.l >> 1 );  // Math.floor(freq / 2)
  limit = Math.min( limit, freq.o >> 1 );

  return limit;
};
