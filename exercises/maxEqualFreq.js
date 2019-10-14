/**
 * Max Equal Frequency
 * __Weekly Contest 158__
 *
 * Given an array nums of positive integers, return the
 * longest possible length of an array prefix of nums,
 * such that it is possible to remove exactly one element
 * from this prefix so that every number that has appeared
 * in it will have the same number of occurrences.
 *
 * If after removing one element there are no remaining elements, its
 * still considered that every number has the same number of ocurrences (0).
 *
 * Constraints:
 *  - `2 <= nums.length <= 10^5`
 *  - `1 <= nums[i] <= 10^5`
 *
 *
 * @example
 * Input: [2,2,1,1,5,3,3,5]
 * Output: 7
 * Explanation: For the subarray [2,2,1,1,5,3,3] of length 7,
 *              if we remove nums[4]=5, we will get [2,2,1,1,3,3],
 *              so that each number will appear exactly twice.
 *
 * @example
 * Input: [1,1,1,2,2,2,3,3,3,4,4,4,5]
 * Output: 13
 *
 * @example
 * Input: [1,1,1,2,2,2]
 * Output: 5
 *
 * @example
 * Input: [10,2,8,9,3,8,1,5,2,3,7,6]
 * Output: 8
 *
 *
 * Complexity:
 * N is nums.length
 * Time: O(N) one-pass
 * Space: 2N worst-case all freq but always N at least for counter = O(N)
 */

/**
 * @param {number[]} nums
 * @return {number} Max length of arr where all nums equal freq w one del.
 */
module.exports = function( nums ) {
  const counter = new Map(); // [num]: occurences]
  const cntFreq = new Map(); // [occurence]: ttl nums with occurence
  let maxCnt = 0;          // count of most ubiquitous number
  let longest = 0;         // longest array, our result

  nums.forEach( ( num, i ) => {
    if ( counter.has( num ) ) {
      const prevCnt = counter.get( num );
      const newCnt = prevCnt + 1;
      counter.set( num, prevCnt + 1 );
      cntFreq.set( prevCnt, cntFreq.get( prevCnt ) - 1 );
      cntFreq.set( newCnt, cntFreq.get( newCnt ) + 1 || 1 );
    } else {
      counter.set( num, 1 );
      cntFreq.set( 1, cntFreq.get( 1 ) + 1 || 1 );
    }
    maxCnt = Math.max( maxCnt, counter.get( num ) );
    const setSize = counter.size;
    if (
      maxCnt === 1
      || ( cntFreq.get( 1 ) === 1 && cntFreq.get( maxCnt ) + 1 === setSize )
      || ( cntFreq.get( maxCnt ) === 1 && cntFreq.get( maxCnt-1 ) + 1 === setSize )
    ) {
      longest = i + 1; // 0-indexed length
    }
  } );

  return longest;
};

/*
3 CASES WHERE VALID:

Case 1. All numbers have a frequency of 1. In this case, we can choose any of the numbers to delete and will have a valid array where all remaining numbers still occur 1 time:

2 3 4 5
      ^
Counts   Freq
------   ----
2: 1     1: 4 {2,3,4,5}
3: 1
4: 1
5: 1

- Set size: 4 {2,3,4,5}
- Max count: 1 --> freq[max]=4.
We know that all numbers have occured one time since the max freq is still 1. Another way of looking at it would be to see that freq[1]=4 == setsize=4 . We have a satisfactory array of length 4 because we can delete any number and the remaining 3 numbers in set will all have a count of 1.

Case 2. One number has a single frequency, and the rest have occured max frequency times: maxF*freq[maxF]==i. In this case we can delete the single occurence to make it valid.

4 4 5 5 6 7 7
            ^
Counts   Freq
------   ----
4: 2     1: 1 {6}
5: 2     2: 3 {4,5,7}
6: 1
7: 2

- i: 6 and total numbers seen is i+1=7
- Set size: 4 {4,5,6,7}
- Max count: 2 --> 4,5,7 have occured twice, freq[max]=3
- Single freq: 1 --> 6 only occurs once, freq[1]=1
Delete the single occurence (6) to create a valid array where all numbers of occured the max count (2) times.

Case 3. Exactly one number has the max count, and the rest have one less than the max count. We can delete one occurence of the number with the max count to make all occurences equal at max minus one.

4 4 5 5 5 6 6
            ^
Counts   Freq
------   ----
4: 2     1: 0
5: 3     2: 2 {4,6}
6: 2     3: 1 {5}

- i: 6 and total numbers seen is i+1=7
- Set size: 3 {4,5,6}.
- Max count: 3 --> Only 5 occurs 3 times, freq[max]=1
- Max count minus one: 2 --> 4 and 6 have occurred twice, freq[max-1]=2
Delete one occurence of the number accounting for max freq (5) to create a valid array of length 7.
*/
