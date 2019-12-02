/**
 * @lc id=981 lang=javascript tag=map,binsearch
 *
 * [981] Time Based Key-Value Store
 *
 * Create a timebased key-value store class TimeMap,
 * that supports two operations:
 *
 *  1. set(string key, string value, int timestamp)
 *     Stores the key and value, along with the given timestamp.
 *  2. get(string key, int timestamp)
 *      - Returns a value such that set(key, value, timestamp_prev)
 *        was called previously, with timestamp_prev <= timestamp.
 *      - If there are multiple such values, it returns the one
 *        with the largest timestamp_prev.
 *      - If there are no values, it returns the empty string ("").
 *
 * @constraints
 * - All key/value strings are lowercase.
 * - All key/value strings have length in the range [1, 100]
 * - The timestamps for all TimeMap.set operations are strictly increasing.
 * - `1 <= timestamp <= 10^7`
 * - TimeMap.set and TimeMap.get functions will be called a total of
 *   120000 times (combined) per test case.
 *
 * @example
 * Input:
 * ["TimeMap","set","get","get","set","get","get"]
 * [[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],
 *  ["foo",4],["foo",5]]
 * Output: [null,null,"bar","bar",null,"bar2","bar2"]
 * Explanation:
 * TimeMap kv;
 *  - kv.set("foo", "bar", 1); // store key "foo" and val "bar" w time=1
 *  - kv.get("foo", 1);  // output "bar"
 *  - kv.get("foo", 3); // output "bar" since there is no value
 *                      // corresponding to foo at timestamp 3 and
 *                      // t2, then the only value is at timestamp 1 ie "bar"
 *  - kv.set("foo", "bar2", 4);
 *  - kv.get("foo", 4); // output "bar2"
 *  - kv.get("foo", 5); //output "bar2"
 * @example
 * Input:
 * ["TimeMap","set","set","get","get","get","get","get"]
 * [[],["love","high",10],["love","low",20],["love",5],
 *  ["love",10],["love",15],["love",20],["love",25]]
 * Output:
 *  [null,null,null,"","high","high","low","low"]
 *
 * @complexity
 * Time: O(1) for set, O(log N) bin search for get worst case same keys
 * Space: O(N), where N is number of inputs
 */

/**
 * Initialize your data structure here.
 */
const TimeMap = function() {
  this.map = new Map();
};

const Log = function( timestamp, value ) {
  this.timestamp = timestamp;
  this.value = value;
};

/**
* @param {string} key
* @param {string} value
* @param {number} timestamp
* @return {void}
*/
TimeMap.prototype.set = function( key, value, timestamp ) {
  const arr = this.map.get( key ) || [];
  arr.push( new Log( timestamp, value ) );
  this.map.set( key, arr );
};

/**
* @param {string} key
* @param {number} timestamp
* @return {string}
*/
TimeMap.prototype.get = function( key, timestamp ) {
  if ( !this.map.has( key ) ) return '';
  const arr = this.map.get( key ), n = arr.length;
  let lo = 0, hi = arr.length - 1;
  while ( lo <= hi ) {
    const mid = ( hi + lo ) >> 1;
    const log = arr[mid];
    if ( log.timestamp === timestamp ) {
      return log.value;
    }
    if ( log.timestamp > timestamp ) {
      hi = mid - 1;
      if ( arr[hi] && arr[hi].timestamp <= timestamp ) {
        return arr[hi].value;
      }
    } else {
      lo = mid + 1;
      if ( lo >= n ) {
        return arr[n - 1].value;
      }
      if ( arr[lo] && arr[lo].timestamp > timestamp ) {
        return arr[lo - 1].value;
      }
    }
  }
  return '';
};

/**
* Your TimeMap object will be instantiated and called as such:
* var obj = new TimeMap()
* obj.set(key,value,timestamp)
* var param_2 = obj.get(key,timestamp)
*/
