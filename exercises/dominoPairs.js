/**
 * @lc id=1128 lang=javascript tag=array,summation,amazon
 *
 * [1128] Number of Equivalent Domino Pairs
 *
 * Given a list of dominoes, dominoes[i] = [a, b] is equivalent to
 * dominoes[j] = [c, d] if and only if either (a==c and b==d),
 * or (a==d and b==c) - that is, one domino can be rotated to be
 * equal to another domino.
 *
 * Return the number of pairs (i, j) for which 0 <= i < j < dominoes.length,
 * and dominoes[i] is equivalent to dominoes[j].
 *
 * @constraints
 * - 1 <= dominoes.length <= 40000
 * - 1 <= dominoes[i][j] <= 9
 *
 * @example
 * Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
 * Output: 1
 *
 * @complexity
 * Time: O(N), where N is the number of dominoes
 * Space: O(N) -> if all dominoes different, one k/v pair in map for each domino
 */

/*

NOTES:

[a,b] == [c,d] if (a==c && b==d) || (a==d && b==c)
-> if we can distinguish a/b and make equation if a + b === c + d

Solutions:
  a) Find the min, max and multiply the min by 10 and add to make unique num
  b) Convert a/b to prime numbers
  c) Use bit manipulation

Above solutions are all efficient only because of
constraint that domino is [1..9]

When we count the pairs, we need to use the summation rather than
simply incrementing the pairs:

For example [[1,2],[2,1],[1,2]

At index 1 -> 1 match [0==1] and 2 items at sum=3
At index 2 -> [0 == 1 and 0==2 and 1==2] and now 0 and one are both matches so we need to add one for each of the previous matches.

*/

/**
 * @param {number[][]} dominoes
 * @return {number}
 */
module.exports = function numEquivDominoPairs( dominoes ) {
  const counts = new Map();
  let pairs = 0;
  dominoes.forEach( d => {
    // Distinguish the numbers using bit manipulation
    // NOTE: Can also use prime numbers or multiply smaller one by 10
    // Ex: [4,2] -> [18]
    const k = ( 1 << d[0] ) + ( 1 << d[1] );
    const v = counts.get( k ) || 0;
    pairs += v; // Use the summation of the pairs
    counts.set( k, v + 1 );
  } );
  return pairs;
};
