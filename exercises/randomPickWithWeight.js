/**
 * @lc id=528 lang=javascript tag=simulation,binsearch,random
 *
 * [528] Random Pick With Weight
 *
 * Given an array w of positive integers, where w[i] describes the weight
 * of index i, write a function pickIndex which randomly picks an
 * index in proportion to its weight.
 *
 * @constraints
 * - 1 <= w.length <= 10000
 * - 1 <= w[i] <= 10^5
 * - pickIndex will be called at most 10000 times.
 *
 * @example
 * Input:
 * ["Solution","pickIndex"]
 * [[[1]],[]]
 * Output: [null,0]
 *
 * @example
 * Input:
 * ["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
 * [[[1,3]],[],[],[],[],[]]
 * Output: [null,0,1,1,1,0]
 *
 * @inputexplanation The input is two lists: the subroutines called
 * and their arguments. Solution's constructor has one argument,
 * the array w. pickIndex has no arguments. Arguments are always wrapped
 * with a list, even if there aren't any.
 *
 * @complexity See corresponding functions.
 */

/**
 * @constructor
 * @param {number[]} w
 * @property {number[]} preSums - Total of sum at each weight
 * @property {number} - Total weight of all weights
 * @complexity
 * Time: O(N) to loop through weights
 * Space: O(N) to hold presums. Note if we can override, then O(1).
 */
function RandomPickerWithWeight( w ) {
  this.preSums = w;
  this.preSum = w.reduce( ( acc, cur, i, arr ) => {
    const updatedSum = acc + cur;
    arr[i] = updatedSum;
    return updatedSum;
  }, 0 );
}

/**
* @return {number}
* @complexity
* Time: O(N log N) Binary search for range of target
* Space: O(1)
*/
RandomPickerWithWeight.prototype.pickIndex = function () {
  const target = ( Math.random() * this.preSum );
  let [lo, hi] = [0, this.preSums.length];
  while ( lo < hi ) {
    const mid = ( hi + lo ) >> 1;
    if ( target > this.preSums[mid] ) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
};

/**
* Your Solution object will be instantiated and called as such:
* var obj = new Solution(w)
* var param_1 = obj.pickIndex()
*/
exports.default = RandomPickerWithWeight;
