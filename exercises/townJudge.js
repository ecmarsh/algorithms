/**
 * @lc id=997 lang=javascript tag=graph,amazon
 *
 * [997] Find The Town Judge
 *
 * In a town, there are N people labelled from 1 to N.
 * There is a rumor that one of these people is secretly the town judge.
 *
 * If the town judge exists, then:
 *  - The town judge trusts nobody.
 *  - Everybody (except for the town judge) trusts the town judge.
 *  - There is exactly one person that satisfies properties 1 and 2.
 *
 * You are given trust, an array of pairs trust[i] = [a, b] representing
 * that the person labelled a trusts the person labelled b.
 *
 * If the town judge exists and can be identified, return the label
 * of the town judge.  Otherwise, return -1.
 *
 * @constraints
 * - `1 <= N <= 1000`
 * - `trust.length <= 10000`
 * - `trust[i] are all different`
 * - `trust[i][0] != trust[i][1]`
 * - `1 <= trust[i][0], trust[i][1] <= N`
 *
 * @example
 * Input: N = 2, trust = [[1,2]]
 * Output: 2
 *
 * @example
 * Input: N = 3, trust = [[1,3],[2,3]]
 * Output: 3
 *
 * @example
 * Input: Input: N = 3, trust = [[1,3],[2,3],[3,1]]
 * Output: -1
 *
 * @example
 * Input: N = 3, trust = [[1,2],[2,3]]
 * Output: -1
 *
 * @example
 * Input: N = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
 * Output: 3
 *
 * @complexity
 * Let: E = trust.length (number of trust relationships), N = number of people
 * Time: O(E) -> O(E) to count degrees + O(E) to find judge
 *  - worst case last person or no judge
 * Space: O(N) -> one array to store the degrees of each person
 */

/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
module.exports = function findJudge( N, trust ) {
  // Town judge must have at least N+1 incoming,
  // so if not enough edges, then can't be a town judge.
  if ( trust.length < N-1 ) {
    return -1;
  }

  const degrees = Array( N ).fill( 0 );

  // trust[i] = [a, b], where person a trust person b
  // so trust relationship is a directed edge from a->b
  // note working with array indexes, so subtract one
  trust.forEach( ( [truster, trustee] ) => {
    degrees[truster-1] -= 1; // gives trust
    degrees[trustee-1] += 1; // earns trust
  } );

  // townjudge indegrees = N - 1
  // townjudge outdegrees = 0
  // townjudge degreeCount = N-1
  return degrees.findIndex( d => d === N-1 ) + 1 || -1;
};
