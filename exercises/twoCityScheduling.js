/**
 * @lc id=1029 lang=javascript tag=greedy,google
 *
 * [1029] Two City Scheduling
 *
 * There are `2N` people a company is planning to interview.
 * The cost of flying the `i`-th person to city `A` is `costs[i][0],
 * and the cost of flying the `i`-th person to city `B` is `costs[i][1]`.
 *
 * Return the minimum cost to fy every person to a city such that
 * exactly `N` people arrive in each city.
 *
 * @constraints
 * - `1 <= costs.length <= 100`
 * - It is guaranteed that `costs.length` is even.
 * - `1 <= costs[i][0], costs[i][1] <= 1000`
 *
 * @example
 * Input: [[10,20],[30,200],[400,50],[30,20]]
 * Output: 110
 * Explanation:
 *  The first person goes to city A for a cost of 10.
 *  The second person goes to city A for a cost of 30.
 *  The third person goes to city B for a cost of 50.
 *  The fourth person goes to city B for a cost of 20.
 *  -> The total minimum cost is 10 + 30 + 50 + 20 = 110 to
 *     have half the people interviewing in each city.
 *
 * @complexity
 * Time: O(N log N) to sort data, where N is number of people
 * Space: O(1)
 */

/**
 * @param {number[][]} costs
 * @return {number}
 */
exports.default = function twoCitySchedCost( costs ) {
  // The key value in determining the cost for the company is determing,
  // for each person, where it will cost more to send them to A or B.
  // We can take the difference of the two as a comparison. (p[0] - p[1]).
  // So if sending to city A is cheaper, our price will be negative.
  // We can sort each person by this factor, and we know that the first
  // N people will be the cheapest to send to city A. Then we can send
  // the rest to city B.

  const twoN = costs.length;
  const N = twoN >> 1;

  costs.sort( ( [a1, b1], [a2, b2] ) => ( a1 - b1 ) - ( a2 - b2 ) );

  let totalCost = 0;

  // Send the lowest cost to city A.
  // We know that the first N people, after sorting, will
  // be the least amount of money spent to send them to city A.
  for ( let i = 0; i < N; i++ ) {
    const costToCityA = costs[i][0];
    totalCost += costToCityA;
  }

  // Now send the rest of the people to city B.
  for ( let i = N; i < twoN; i++ ) {
    const costToCityB = costs[i][1];
    totalCost += costToCityB;
  }

  return totalCost;
};
