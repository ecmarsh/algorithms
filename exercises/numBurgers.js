/**
 * @lc id=1276 lang=javascript tag=algebra,math,contest
 *
 * [1276] Number of Burgers with No Waste of Ingredients
 * _Contest Submission (medium)_
 *
 * Given two integers tomatoSlices and cheeseSlices.
 * The ingredients of different burgers are as follows:
 *  - Jumbo Burger: 4 tomato slices and 1 cheese slice.
 *  - Small Burger: 2 Tomato slices and 1 cheese slice.
 *
 * Return [total_jumbo, total_small] so that the number of remaining
 * tomatoSlices equal to 0 and the number of remaining cheeseSlices equal
 * to 0. If it is not possible to make the remaining tomatoSlices
 * and cheeseSlices equal to 0 return [].
 *
 * @constraints
 *  - `0 <= tomatos <= 10^7`
 *  - `0 <= cheeses <= 10^7`
 *
 *
 * @examples
 * Input: tomatoSlices = 16, cheeseSlices = 7
 * Output: [1,6]
 * Explantion: To make one jumbo burger and 6 small burgers we need
 *             4*1 + 2*6 = 16 tomato and 1 + 6 = 7 cheese. There will
 *             be no remaining ingredients.
 *
 * Input: tomatoSlices = 17, cheeseSlices = 4
 * Output: []
 * Explantion: There will be no way to use all ingredients to
 *             make small and jumbo burgers.
 *
 * Input: tomatoSlices = 4, cheeseSlices = 17
 * Output: []
 * Explantion: Making 1 jumbo burger there will be 16 cheese remaining
 *             and making 2 small burgers there will be 15 cheese remaining.
 *
 * Input: tomatoSlices = 0, cheeseSlices = 0
 * Output: [0,0]
 *
 *
 * @complexity
 * Time: O(1)
 * Space: O(1)
 */

/**
 * @param {number} tomato
 * @param {number} cheese
 * @return {number[]}
 */
module.exports = function numOfBurgers( tomato, cheese ) {
  const jumbos = tomato * 0.5 - cheese;
  const smalls = 2 * cheese - tomato * 0.5;
  if (
    Number.isInteger( jumbos )
    && Number.isInteger( smalls )
    && jumbos >= 0
    && smalls >= 0
  ) {
    return [jumbos, smalls];
  }
  return [];
};

/*
jumbo: 4 tomato, 1 cheese
small: 2 tomato, 1 cheese
want: # jumbo/small to make tomato and cheeese = 0

x + y = cheese
4x + 2y = tomatoes

x = cheese - y
4(cheese - y) + 2(y) = tomato
4c - 4y + 2y = t
4c - 2y = t
4c - t = 2y
**y = 2c - .5t**
x + (2c - .5t) = c
**x = .5t - c **
*/
