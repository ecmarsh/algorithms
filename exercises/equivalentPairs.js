/**
 * Number of Equivalent Domino Pairs
 *
 * Given a list of dominoes, dominoes[i] = [a, b] is equivalent to
 * dominoes[j] = [c, d] if and only if either (a==c and b==d),
 * or (a==d and b==c) - that is, one domino can be rotated to be
 * equal to another domino.
 *
 * Return the number of pairs (i, j) for which 0 <= i < j < dominoes.length,
 * and dominoes[i] is equivalent to dominoes[j].
 *
 * Constraints:
 *  - 1 <= dominoes.length <= 40,000
 *  - 1 <= dominoes[i][j] <= 9
 *
 * @example
 * Input: [[1,2],[2,1][3,4][5,6]]
 * Output: 1
 * @example
 * Input: [[1,2],[1,2],[1,1],[1,2],[2,2]]
 * Output: 3
 *
 * Analysis:
 * N is len(dominoes)
 * Time: O(N) tight bound
 * Space: O(N) worst case no pairs
 */


/**
 * @param {number[][]} dominoes
 * @return {number}
 */
module.exports = function numEquivDominoPairs( dominoes ) {
  const map = new Map();
  let pairs = 0;
  dominoes.forEach( ( [x, y] ) => {
    // Normalize key as int in range [11..99]
    const k = 10 * Math.min( x, y ) + Math.max( x, y );
    const v = map.get( k ) || 0;
    pairs += v;
    map.set( k, v + 1 );
  } );
  return pairs;
};
