/**
 * @=eip id=16.4 lang=javascript
 *
 * [16.4] Compute the binomial coefficient
 * @related=pascal
 *
 * Design an algorithm for computing nCk which has the property
 * that it never overflows if final result fits in integer word size.
 *
 * @example
 * Input: n=5, k=2
 * Output: 10
 * Explanation: 5 choose 2 = 5! / 3!(5-3)! = 120 / (6*2) = 10
 *
 * @complexity
 * Time: O(n*k)
 * Space: O(k) DP/Memo
 */
/**
 * DP solution builds off of recursion with memo below
 * @param {number} n
 * @param {number} k
 * @return {number} n-choose-k
 */
module.exports = function binomialCoefficient( n, k ) {
  const dp = Array( k + 1 ).fill( 0 );
  dp[0] = 1; // Base case -> xC0 === 1

  for ( let i = 1; i < n; i++ ) {
    for ( let j = 1; j <= k; j++ ) {
      dp[j] += dp[j-1];
    }
  }

  return dp[k];
};

/*

  nCk = n! / k!(n-k)!

 Recursive with memoization using:
 `nCk = (n-1)C(k)+(n-1)C(k-1)`

 fn (n, k):
    memo = Array[n][r]

    calc(x, y):
      base case x = y or x = 0:
          memo[x][y] = 1
      if !memo[x][y] (not calculated yet):
          withoutY = calc(x-1, y)
          withY = calc(x-1, y-1)
          memo[x][y] = withoutY + withY

    return memo[n][r] (bottom right corner)

Algorithm above uses O(k) by reusing since only care about final result.

 */
