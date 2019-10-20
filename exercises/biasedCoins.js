/**
 * @=lc id=1230 lang=javascript
 *
 * [1230] Toss Strange Coins
 * Biweekly Contest 11
 *
 * You have some coins. The i-th coin has a probability,
 * `prob[i]` of facing heads when tossed.
 *
 * Return the probability that the number of coins facing heads
 * equals `target` if you toss every coin exactly once.
 *
 * @constraints
 * - `1 <= prob.length <= 1000`
 * - `0 <= prob[i] <= 1`
 * - `0 <= target <= prob.length`
 * - Accepted answers are within `10^-5` of precise probability.
 *
 * @example
 * Input: prob=[0.4], target=1
 * Output: 0.40000
 *
 * @example
 * Input: prob=[0.5,0.5,0.5,0.5,0.5], target=0
 * Output: 0.03125
 *
 *
 * @complexity
 * n is len(prob), t is target
 * Time: O(n*t)
 * Space: O(t)
 */

/**
  * @param {number[]} P probabilities of coin landing heads
  * @param {number} k target
  * @return {number}
  */
module.exports = function biasedCoins( P, k ) {
  const n = P.length;

  if ( n === 1 ) {
    return Math.abs( ( k === 0 ) - P[0] );
  }
  if ( k === n ) {
    return P.reduce( ( acc, p ) => acc * p, 1 );
  }
  if ( k === 0 ) {
    return P.reduce( ( acc, p ) => acc * ( 1 - p ), 1 );
  }

  let dp = [1];

  P.forEach( ( p ) => {
    const tmp = Array( dp.length+1 ).fill( 0 );
    dp.forEach( ( x, i ) => {
      tmp[i+1] += x * p;
      tmp[i] += x * ( 1 - p );
    } );
    tmp.length = Math.min( tmp.length, k + 1 );
    dp = tmp;
  } );

  return dp[k];
};

/*

We have a binomial distribution:
f(k, n, p) = Pr(k;n, p) = Pr(X = k) = nCk p^k(1-p)^(n-k)

See https://en.wikipedia.org/wiki/Binomial_distribution

Normal probability:
Probability of landing heads x times is .5*x
Probability of landing two heads is .5*2

Now two coins, one with prob .3, one with .4
Probability of landing exactly one head is probability
of landing first one head, second tail + first head, second tail:
Probability of landing tail is 1 - probability of landing head
----
Coin 1: Phead=0.3, Ptail = 1-0.3=.7
Coin 2: Phead=0.4, Ptail = 1-0.4=.6
----
(H,T): .3 * .6 = 0.18
(T,H): .7 * .4 = 0.28
Probability of landing exactly one: 0.18 + 0.28

Now how we can replicate for multiple coins?
Summation of probability of rolling all combinations of target heads

Coins=5, Target=2 -> 5Choose2 = 10 possibilities
40% chance of being chosen (2/5) -> each one occures 10*40%=4 times
H=[.25, .3, .5, .2, .65]
T=[.75, .7, .5, .8, .45]
 HHTTT = .25*.3*.5*.8*.45 = .0105
 HTHTT = .25*.7*.5*.8*.45 = .0245
 HTTHT = .25*.7*.5*.2*.45 = .006125
 HTTTH = .25*.7*.5*.8*.65 = .0455
 THHTT = .75*.3*.5*.8*.45 = .0315
 THTHT = .75*.3*.5*.2*.45 = .00785
 THTTH = .75*.3*.5*.8*.65 = .0585
 TTHHT = .75*.7*.5*.2*.45 = .018375
 TTHTH = .75*.7*.5*.8*.65 = .1365
 TTTHH = .75*.7*.5*.2*.65 = .034125
                           ----------------
                          = .37350


*/
