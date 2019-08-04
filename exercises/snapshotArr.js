/**
 * Snapshot Array
 * Weekly Contest 148
 *
 * Implement a SnapshotArray that supports the following interface:
 *
 * -SnapshotArray(int length) initializes an array-like data structure with the given length.  Initially, each element equals 0.
 * void set(index, val) sets the element at the given index to be equal to val.
 * int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
 * int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id
 *
 * @example
 * Input:
 * ["SnapshotArray","set","snap","set","get"]
 * [[3],[0,5],[],[0,6],[0,0]]
 * Output: [null,null,0,null,5]
 * Explanation:
 * SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
 * snapshotArr.set(0,5);  // Set array[0] = 5
 * snapshotArr.snap();  // Take a snapshot, return snap_id = 0
 * snapshotArr.set(0,6);
 * snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5
 *
 * Constraints:
 * 1 <= length <= 5000
 * At most 5000 calls will be made to set, snap, and get.
 * 0 <= index < length
 * 0 <= snapId < total number of times snap called()
 * 0 <= val <= 10^9
 *
 */

/**
 * @param {number} length
 */
const SnapshotArray = function( length ) {
  this.snaps = 0;
  this.changes = [{}];
};

/**
* @param {number} index
* @param {number} val
* @return {void}
*/
SnapshotArray.prototype.set = function( index, val ) {
  this.changes[this.snaps][index] = val;
};

/**
* @return {number}
*/
SnapshotArray.prototype.snap = function() {
  ++this.snaps;
  this.changes[this.snaps] = {};
  return this.snaps - 1;
};

/**
* @param {number} index
* @param {number} snap_id
* @return {number}
*/
SnapshotArray.prototype.get = function( index, snapId ) {
  for ( let i = snapId; i >= 0; --i ) {
    const curr = this.changes[i];
    if ( index in curr ) {
      return curr[index];
    }
  }
  // Expecting an initialized array with 0's
  // This is to imitate that without storing the actual array.
  return 0;
};

/**
* Your SnapshotArray object will be instantiated and called as such:
* var obj = new SnapshotArray(length)
* obj.set(index,val)
* var param_2 = obj.snap()
* var param_3 = obj.get(index,snap_id)
*/

module.exports = SnapshotArray;
