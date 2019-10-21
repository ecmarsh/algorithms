/**
 * @=lc id=1235 lang=javascript
 *
 * [1235] Maximum Profit in Job Scheduling
 * Contest 159
 *
 * We have n jobs, where every job is scheduled to be done from
 * startTime[i] to endTime[i], obtaining a profit of profit[i].
 *
 * You're given the startTime , endTime and profit arrays, you need
 * to output the maximum profit you can take such that there are
 * no 2 jobs in the subset with overlapping time range.
 *
 * If you choose a job that ends at time `X` you will be able
 * to start another job that starts at time `X`.
 *
 * @constraints
 * - `1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4`
 * - `1 <= startTime[i] < endTime[i] <= 10^9`
 * - `1 <= profit[i] <= 10^4`
 *
 * @example
 * Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
 * ----------------------
 *          | p=40  |
 *      | p=10  |
 *  | p=50 ||  p=70     |
 *  1   2   3   4   5   6
 *  ---------------------
 * Output: 120
 * Explanation: The subset chosen is the first and fourth job.
 *              Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.
 *
 * @example
 * Input: starts = [1,2,3,4,6], ends = [3,5,10,6,9], profits = [20,20,100,70,60]
 * ---------------------------------------
 *      |   p=20    |
 *          |         p = 100           |
 *  | p=20 |    | p=70 ||  p = 60   |
 *  1   2   3   4   5   6   7   8   9   10
 *  --------------------------------------
 * Output: 150
 * Explanation: The subset chosen is the first, fourth and fifth job.
 *              Profit obtained 150 = 20 + 70 + 60.
 *
 * @example
 * Input: startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
 *  --------------------
 *  |        p=4        |
 *  |    p=6    |
 *  | p=5 |
 *  1     2      3      4
 *  ---------------------
 * Output: 6
 *
 * @complexity
 * N is number of jobs (length of start,end,profits)
 * Time: NlogN to sort by end time + N * (log N) bin search = O(NlogN)
 * Space: O(N) <-- composed jobs biggest, dp can do same size overwrite
 */

/**
 * @param {number[]} starts
 * @param {number[]} ends
 * @param {number[]} profit
 * @return {number} Max profit that can be made from jobs.
 */
module.exports = function jobScheduling( starts, ends, profits ) {
  const n = starts.length;

  // 1. Compose the jobs from decomposed arguments.
  const jobs = Array( n );
  for ( let i = 0; i < n; i++ ) {
    jobs[i] = new Job( starts[i], ends[i], profits[i] );
  }

  // 2. Sort jobs by their time.
  jobs.sort( ( a, b ) => a.end - b.end );

  // 3. Store max profit for each end[i] time.
  //    Max profit at first end is the first finishing job.
  //    NOTE: We can overwrite profits instead if space was premium
  //          but space complexity would still be same (composed jobs).
  const dp = Array( n ).fill( 0 );
  dp[0] = jobs[0].p;

  // 4. At each job, greedily take the maximum profit.
  for ( let i = 1; i < n; i++ ) {
    let { p: curProfit } = jobs[i];
    const prevJobEndIndex = mostRecentJobEnd( jobs, i );
    // If there was a job completed before, factor in the
    // max profit at that point to the max profit at current time.
    if ( prevJobEndIndex !== -1 ) {
      curProfit += profits[prevJobEndIndex];
    }
    // Store maximum profit at the current time
    // If profit is greater by skipping this job, store that one instead.
    profits[i] = Math.max( curProfit, profits[i-1] );
  }

  // 5. Return max profit to be made after all jobs finished.
  return profits[n-1];
};

/**
 * @constructor Defines a single job.
 * @param {number} beg Start time.
 * @param {number} end End time.
 * @param {number} p Job profit.
 */
function Job( beg, end, p ) {
  this.beg = beg;
  this.end = end;
  this.p = p;
}

/**
 * Finds the most recently finished job up to cur's start time.
 * @param {Job[]} jobs
 * @param {number} cur Index of job must be completed before.
 * @return {number} The index of the most recently finished job.
 */
function mostRecentJobEnd( jobs, cur ) {
  // Binary search for most recently finished job in (log cur) time
  let [lo, hi] = [0, cur];
  const { beg: limit } = jobs[cur];
  while ( lo <= hi ) {
    const mid = ( hi + lo ) >> 1;
    if ( jobs[mid].end <= limit ) {
      // Determine whether we have most recent
      if ( jobs[mid+1].end > limit ) {
        return mid;
      }
      lo = mid + 1;
    } else {
      hi = mid - 1; // jobs[mid] hasn't finished before limit
    }
  }
  // No jobs have finished before cur job
  return -1;
}
