/**
 * @=lc id=1228 lang=javascript
 *
 * [1228] Missing Number In Arithmetic Progression
 * Biweekly Contest 11
 *
 * In some array `arr`, the values were in arithmetic progression:
 * the values `arr[i+1] - arr[i]` are all equal for every `0 <= i < len(arr)-1`.
 *
 * Then, a value from `arr` was removed that was not the first or last index.
 *
 * Return the removed value.
 *
 * @constraints
 *   - `3 <= arr.length <= 1000`
 *   - `0 <= arr[i] <= 10^5`
 *
 * @example
 * Input: [5, 7, 11, 13]
 * Output: 9
 * Explanation: The previous array was [5, 7, *9*, 11, 13]
 *
 * @example
 * Input: [15, 13, 12]
 * Output: 14
 * Explanation: The previous array was [15, *14*, 13, 12]
 *
 * @complexity
 * N is len(arr)
 * Time: O(log N) binary search for number with constant prelim calcs
 * Space: O(1)
 */


/**
 * The sequence can be written as f(x) = x0 + d*(n-1) <- d is common "diff".
 * Then the sum, if all numbers were included would be:
 *   `x0 + (x0+d) + (x0+2d) + ... + (x0 + (n-1)d)`
 * And a progression sum is `f(n) => n(n-1)/2`
 * First is x0 (smallest), last is (x0 + (n-1)d) so for this sum _should be_:
 *    `n(x0 + ((n-1)d))/2 = n/2 * (x0 + (n-1)d)`
 * And the common difference should be the total difference / (length-1)
 * So with one missing we can use `(A[n-1]-A[0])/(n-1+1) = (A[n-1]-A[0])/n`
 * And since there is an order, progression, instead of linearly, we can use
 * binary search as expected number should be `f(x)=x0+id`
 */
/**
 * @param {number[]} A Arithmetic progression sequence.
 * @return {number} The missing value in progression.
 */
module.exports = function arithmeticProgressionMissing( A ) {
  const n = A.length;
  let [lo, hi] = [0, n-1];
  const [a, z] = [A[lo], A[hi]];
  if ( a === z ) return a; // all numbers same (common diff is 0)
  const d = ( z - a ) / n; // common difference
  while ( lo < hi ) {
    const mid = ( hi + lo ) >> 1;
    if ( A[mid] == d * mid + a ) {
      lo = mid + 1; // everything on left half is at correct idx
    } else {
      hi = mid; // missing value must have occured before mid
    }
  }
  return d * lo + a;
};
