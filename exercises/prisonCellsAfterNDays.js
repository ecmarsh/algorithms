/**
 * @lc id=957 lang=javascript tag=hash,amz,state,pigeonhole,array
 *
 * [957] Prison Cells After N Days
 *
 * There are 8 prison cells in a row, and
 * each cell is either occupied or vacant.
 *
 * Each day, whether the cell is occupied or vacant changes
 * according to the following rules:
 *
 * If a cell has two adjacent neighbors that are both occupied or both vacant,
 * then the cell becomes occupied.
 * Otherwise, it becomes vacant.
 *
 * (Note that because the prison is a row, the first and the last
 * cells in the row can't have two adjacent neighbors.)
 *
 * We describe the current state of the prison in the following way:
 *   cells[i] == 1 if the i-th cell is occupied, else cells[i] == 0.
 *
 * Given the initial state of the prison, return the state of the prison
 * after N days (and N such changes described above.)
 *
 * @constraints
 * 1. cells.length == 8
 * 2. cells[i] is in {0,1}
 * 3. 1 <= N <= 10^9
 *
 * @example
 * Input: cells = [0,1,0,1,1,0,0,1], N = 7
 * Output: [0,0,1,1,0,0,0,0]
 * Explanation:
 * The following table summarizes the state of the prison on each day:
 *  Day 0: [0, 1, 0, 1, 1, 0, 0, 1]
 *  Day 1: [0, 1, 1, 0, 0, 0, 0, 0]
 *  Day 2: [0, 0, 0, 0, 1, 1, 1, 0]
 *  Day 3: [0, 1, 1, 0, 0, 1, 0, 0]
 *  Day 4: [0, 0, 0, 0, 0, 1, 0, 0]
 *  Day 5: [0, 1, 1, 1, 0, 1, 0, 0]
 *  Day 6: [0, 0, 1, 0, 1, 1, 0, 0]
 *  Day 7: [0, 0, 1, 1, 0, 0, 0, 0]
 *
 * @example
 * Input: cells = [1,0,0,1,0,0,1,0], N = 1000000000
 * Output: [0,0,1,1,1,1,1,0]
 *
 * @complexity
 * Let: N = number of cells in the prison
 * Time: O(1): 2^N since this is the most states, but for this problem,
 *       at most 2^6 = 64 states -> O(1)
 * Space: O(1): 2^N * xN for storage of seen, but we know that there cannot
 *        be over 64 states, so again O(1).
 */

/*

Brute Force of Simulation Times Out

According to pigeon hold principle, there are a finite number
of states that the prison can have.

Since there are 8 slots with 2 options for each,
that's 2^8 = 256 state options.

After the first day, first and last day are always 0, which leaves,
2^6 = 64 state options.

Hence there must be a cycle after some amount of time, so we can
store our seen states and determine the cycle length when it
occurs again.

Once we know our cycle, it's safe to skip cycle days
by using % cycle.

*/

/**
 * @param {number[]} cells
 * @param {number} N
 * @return {number[]}
 */
module.exports =  function prisonAfterNDays( cells, N ) {

  // nextDay returns the cells after another day
  // according to rules that two equal adjacent neighbors equal.
  const nextDay = () => {
    const next = Array( 8 ).fill( 0 );
    // next[0] and next[7] will always be 0
    for ( let i = 1; i < 7; i++ )  {
      next[i] = +( cells[i-1] === cells[i+1] );
    }
    return next;
  };

  // 1. Find the cycle by storing seen cell states
  //    and waiting for a repeat.
  const seen = new Map;
  let cycle;
  for ( let i = 0; i < N;  i++ ) {
    const next = nextDay();
    const key = next.join( '' );
    if ( seen.has( key ) ) {
      cycle = i - seen.get( key );
      break;
    } else {
      seen.set( key, i );
    }
    cells = next;
  }

  // 2a. No cycle was found but we've simulated all of the days,
  //     so we can return the cells as they are.
  if ( cycle === undefined ) {
    return cells;
  }

  // 2b. We can skip ahead by the cycles and calculate the cell
  //     state by the remaining days.
  N %= cycle;
  for ( let i = 0; i < N; i++ ) {
    cells = nextDay();
  }

  return cells;
};
