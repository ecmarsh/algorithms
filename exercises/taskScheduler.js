/**
 * Task Scheduler
 *
 * Given a char array representing tasks CPU need to do.
 * It contains capital letters A to Z where
 * different letters represent different tasks.
 * Task completion order does not matter.
 * Each task could be done in one interval.
 *
 * However, there is a non-negative cooling interval n,
 * which means there must be at least n different tasks or idles
 * between completing two of the same tasks (same letter).
 * You need to return the least number of intervals the CPU
 * will take to finish all the given tasks.
 *
 * @example
 * Input: tasks = ["A","A","A","B","B","B"], n = 2
 * Output: 8
 * Explanation: A -> B -> idle -> A -> B -> idle -> A -> B.
 * Note how there are n=2 'slots' between 'A', B and idle.
 *
 * Constraints:
 * - `1 <= tasks.length <= 10,000`
 * - `0 <= n <= 100`
 *
 * Analysis:
 * N = tasks.length
 * Time: O(N), to get the frequencies
 * Space: O(1), to hold the freqs, has a max of 26 since uppercase only
 *
 */

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
module.exports = function leastInterval( tasks, n ) {
  const totalTasks = tasks.length;

  if ( n === 0 || totalTasks === 1 ) {
    return totalTasks;
  }

  const freqs = Array( 26 );
  let maxFreq = 0;
  let totalMaxes = 0;

  tasks.forEach( ( task ) => {
    const i = task.charCodeAt( 0 ) - 65; // 'A'
    const taskFreq = freqs[i] + 1 || 1;
    freqs[i] = taskFreq;

    if ( maxFreq === taskFreq ) {
      totalMaxes += 1;
    }
    else if ( maxFreq < taskFreq ) {
      maxFreq = taskFreq;
      totalMaxes = 1;
    }
  } );

  const intervalsNeeded = maxFreq - 1;
  const openSlotsPerInterval = n + 1 - totalMaxes;
  const totalOpenSlots = intervalsNeeded * openSlotsPerInterval;
  const totalRemainingTasks = totalTasks - maxFreq * totalMaxes;
  const idles = Math.max( 0, totalOpenSlots - totalRemainingTasks );

  return totalTasks + idles;
};

/*
['A','A','A','A','B','B','B','C','C','D','E']
'A': 4
'B': 3
'C': 2
'D': 1
'E': 1
totalTasks = tasks.length = 4+3+2+1+1 = 11
n = 3

maxFreq = 4 ('A')
A needs n=3 slots *between*(freq-1) each, freq=4 times
A _ _ _ A _ _ _ A _ _ _ A

Next is B with 3
A B _ _ A B _ _ A B _ _ A

Next is C with 2
A B C _ A B C _ A B _ _ A

Next is D with 1
A B C D A B C _ A B _ _ A

Next is E with 1
A B C D A B C E A B _ _ A

total empty slots = 2 <-- idles
total time = totaltasks = 11 + idles=2 = *13*

... if B freq === 4 also (2 maxes):
A B _ _ A B _ _ A B _ _ A B
... same thing except only 2 empty slots between each

..and if more freq=1, can just add to end (or space out),
  so no extra idles needed.
*/
