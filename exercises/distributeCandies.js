/**
 * Distribute Candies to People
 *
 * We distribute some number of candies, to a row of n = num_people people
 * in the following way:
 *
 * We then give 1 candy to the first person,
 * 2 candies to the second person, and so on
 * until we give n candies to the last person.
 *
 * Then, we go back to the start of the row, giving n + 1 candies
 * to the first person, n + 2 candies to the second person, and so on
 * until we give 2 * n candies to the last person.
 *
 * This process repeats (with us giving one more candy each time,
 * and moving to the start of the row after we reach the end)
 * until we run out of candies. The last person will receive all of our
 * remaining candies (not necessarily one more than the previous gift).
 *
 * Return an array (of length num_people and sum candies) that
 * represents the final distribution of candies.
 *
 * Constraints:
 * - `1 <= candies <= 10^9`
 * - `1 <= num_people <= 1000`
 *
 * @example
 * Input: candies = 7, num_people = 4
 * Output: [1,2,3,1]
 * Explanation:
 * On the first turn, ans[0] += 1, and the array is [1,0,0,0].
 * On the second turn, ans[1] += 2, and the array is [1,2,0,0].
 * On the third turn, ans[2] += 3, and the array is [1,2,3,0].
 * On the fourth turn, ans[3] += 1
 * (because there is only one candy left), and the final array is [1,2,3,1].
 *
 * @example
 * Input: candies = 10, num_people = 3
 * Output: [5,2,3]
 * Explanation:
 * On the first turn, ans[0] += 1, and the array is [1,0,0].
 * On the second turn, ans[1] += 2, and the array is [1,2,0].
 * On the third turn, ans[2] += 3, and the array is [1,2,3].
 * On the fourth turn, ans[0] += 4, and the final array is [5,2,3].
 *
 * Analysis:
 * N is number of people
 * Time: N + 1 -> O(N)
 * Space: O(N) only for output.
 */

/*
SCRATCHWORK

1) n(n+1)/2=10 if n=4
2) 8*9/2=36-10=26 2n=8 - 1st round(10)
3) 12*13/2=78-36=42

rmndr = C - .5*n*(n+1)
rmndr is INT between 0 and n+1 (ie within peeps range)

0 <= C - .5*n*(n+1) < n+1

For later use: Using quadratic equation to solve since formula becomes form of ax^2+bx+c=0).
Quadratic formula is x = (-b += sqrt(b^2-4ac))/2a
In these problems, a is 1 (shown below), so can use reduced quadratic:
x = (-(b) +- sqrt(b^2-4c))/2 = .5(-b +- sqrt(b^2-4c))
x = -b/2 +- sqrt((b/2)^2-c)

SOLVE RIGHT SIDE:
n + 1 > C - .5*n*(n+1)
2n + 2 > 2C - n(n+1)
2n + 2 +(n(n+1)) > 2C
2n + 2+ n^2 + n - 2C > 0
n^2 + 2n + n + 2-2C > 0
n^2 + 3n + (2-2C) > 0 --> a=1, b=3, c=(2-2C)
Plug into reduced quadratic which is:
x^2+bx+c=0 --> x = -b/2 +- sqrt((b/2)^2-c)
n > -(3/2) +-sqrt((3/2)^2 - (2-2C))
n > -3/2 +-sqrt(9/4 - 2 + 2C)
n > -3/2 +-sqrt(9/4 - 8/4 + 2C)
n > -3/2 +-sqrt(1/4 + 2C)
n > +-sqrt(2C+1/4) - 3/2
Interested only in positive root in this context so:
n > sqrt(2C+1/4)-3/2

SOLVE LEFT SIDE:
0 <= C - .5*n*(n+1)
0 <= 2C - n(n+1)
0 <= 2C - n^2 - n
n^2 + n - 2C <= 0 -> a=1, b=1, c=(-2C)
Solve for positive root again (-b/2 +- sqrt((b/2)^2 - c))
n <= -1/2 + sqrt(1/4 - (-2C))
n <= sqrt(2C + 1/4) - 1/2

TOGETHER:
sqrt(2C+1/4)-3/2 < n <= sqrt(2C + 1/4) - 1/2

Since upper bound is next progression of full distribution, floor it to get last person fully distributing to.

That's the "simple" jump from `0 <= C - n(n+1)/2 < p + 1` to `people fully distrubted to = floor(sqrt(2C+1/4)-1/2)`

CALC FULL RECEIVALS:
So if turns, t, is loops where everyone gets their full candy and n is candies distrubted fully (from above):
each person gets (i) + (i+n) + (i+2n) + ... (i+(t-1)*n)
A[i] = i * t + n(.5*(t(t-1)))

complete loop, t, is going to be floor(total # of complete ditribution / amount of people)
ie t = nfulldists / peeps (where nfull is formula above)

CALC PARTIAL RECEIVAL:
- to get last person to receive full gift, calc number of full distributions / people is n / p so person to get remaining is (n % p) + 1
- remaining candy is totalcandy - nfulldists


PSUEDO
Calc number of complete distrubibutions:
    completeDists = floor(sqrt(2C+1/4)-1/2)

Calc number of complete turns/loops:
    t = completeDists // people
So remaining people in last incomplete turn is:
    i < completeDists % people.

Calc candies from complete turn distributions:
    completeCandies = (ithperson*turns)+(summationofturns)

Add remaining candies to people within remaining to receive full distributions:
    for all ithpeople < remaining complete dists:
        ithpersonCandy += i + (fulldists*turns)

Add any partial candy to last person
    last person is (completeDists % people)+1 --> compl%ppl indxed from 0
    and they receive Candies - completeDistcandies

Time will be peeps + complete%peeps + 1 -> O(N)
Space is just for output of O(N). Everything else constant.
*/

/**
 * @param {number} candies Total candies to distrubte
 * @param {number} people Number of people.
 * @return {number[]} Distrubition of candies.
 */
module.exports = function distributeCandies( candies, people ) {
  // floor(sqrt(2C + (1/4)) - (1/2))
  const numFullDist = 0 | ( Math.sqrt( 2 * candies + 0.25 ) - 0.5 );
  const timesAllFullDist = 0 | numFullDist / people;
  const timesSummation = summation( timesAllFullDist - 1 );
  const indexForPartial = numFullDist % people;

  // Add full distributions when all people get fully
  // d[i] = (i + 1) * t + p * summation(t - 1)
  const distributions = Array( people ).fill( 0 ).map( ( _, i ) =>
    ( timesAllFullDist * ( i + 1 ) ) + ( people * timesSummation ) );

  // Add full distributions when part people get fully
  // d[i] += p*t + (i+1)
  for ( let i = 0; i < indexForPartial; i += 1 ) {
    distributions[i] += timesAllFullDist * people + ( i + 1 );
  }

  // Add remaining candies to person after last person to get fully
  const remainingCandies = candies - summation( numFullDist );
  distributions[indexForPartial] += remainingCandies;

  // All candies distributed
  return distributions;
};

const summation = ( x ) => ( ( x+1 ) * x ) >> 1;
