/**
 * Diet Plan Performance
 * _Weekly Contest 152_
 *
 * A dieter consumes calories[i] calories on the i-th day.
 * For every consecutive sequence of k days, they look at T,
 * the total calories consumed during that sequence of k days:
 * - If T < lower, they performed poorly on their diet and lose 1 point.
 * - If T > upper, they performed well on their diet and gain 1 point.
 * - Otherwise, they performed normally and there is no change in points.
 * Return the total number of points the dieter has
 * after all calories.length days.
 *
 * Note that: The total points could be negative.
 *
 * @example
 * Input: calories = [1,2,3,4,5], k = 1, lower = 3, upper = 3
 * Output: 0
 * Explaination:
 * calories[0], calories[1] < lower then
 * calories[3], calories[4] > upper,
 * so total points = 0.
 *
 * Input: calories = [3,2], k = 2, lower = 0, upper = 1
 * Output: 1
 * Explaination: calories[0] + calories[1] > upper, total points = 1
 *
 * Input: calories = [6,5,0,0], k = 2, lower = 1, upper = 5
 * Output: 0
 * Explaination:
 * calories[0] + calories[1] > upper,
 * lower <= calories[1] + calories[2] <= upper,
 * calories[2] + calories[3] < lower,
 * so total points = 0.
 *
 * Constraints:
 * - `1 <= k <= calories.length <= 10^5`
 * - `0 <= calories[i] <= 20000`
 * - `0 <= lower <= upper`
 *
 * Analysis:
 * Defs: N is calories.length
 * Time: O(N)
 * Space: O(1)
 *
 */


/**
 * @param {number[]} calories
 * @param {number} k
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
module.exports = function dietPlanPerformance( calories, k, lower, upper ) {
  let points = 0,
    rollingTotal = 0,
    left = 0,
    right = 0;

  const calcPoints = getPointsCalculator( lower, upper );

  while ( right < k - 1 ) {
    rollingTotal += calories[right++];
  }

  for ( left, right; right < calories.length; left++, right++ ) {
    rollingTotal += calories[right];
    points += calcPoints( rollingTotal );
    rollingTotal -= calories[left];
  }

  return points;
};

function getPointsCalculator( lower, upper ) {
  return function calcPoints( total ) {
    if ( total < lower ) {
      return -1;
    }
    if ( total > upper ) {
      return 1;
    }
    return 0;
  };
}
