/**
 * Dinner Plate Stacks
 * _Weekly Contest 151_
 *
 * You have an infinite number of stacks arranged
 * in a row and numbered (left to right) from 0,
 * each of the stacks has the same maximum capacity.
 *
 * See function definitions for requirements.
 *
 * @example
 * Input:
 * ["DinnerPlates","push","push","push","push","push","popAtStack","push","push","popAtStack","popAtStack","pop","pop","pop","pop","pop"]
 * [[2],[1],[2],[3],[4],[5],[0],[20],[21],[0],[2],[],[],[],[],[]]
 * Output:
 * [null,null,null,null,null,null,2,null,null,20,21,5,4,3,1,-1]
 * Explanation: See bottom for walk through.
 *
 * Constraints:
 * `1 <= capacity <= 20,000`
 * `1 <= val <= 20,000`
 * At most, 200,000 calls will be made to push, pop, and popAtStack.
 *
 */

/**
 * Your DinnerPlates object will be instantiated and called as such:
 * var obj = new DinnerPlates(capacity)
 * obj.push(val)
 * var param_2 = obj.pop()
 * var param_3 = obj.popAtStack(index)
 */


/**
 * Initializes the object with the maximum capacity of the stacks.
 * @param {number} cap
 */
function DinnerPlates( cap ) {
  this.cap = cap;
  this.size = 0;
  this.ins = this.del = 0;
  this.map = new Map( [[]] );
}

/**
 * Pushes the given positive integer val into the
 * leftmost stack with size less than capacity.
 * @param {number} val
 * @return {void}
 */
DinnerPlates.prototype.push = function( val ) {
  while (
    this.map.has( this.ins )
    && this.map.get( this.ins ).length === this.cap
  ) {
    this.ins += 1;
  }

  const s = this.map.get( this.ins ) || [];
  s.push( val );
  this.map.set( this.ins, s );

  if ( this.ins > this.del ) {
    this.del = this.ins;
  }

  this.size += 1;
};

/**
 * Returns the value at the top of the rightmost
 * non-empty stack and removes it from that stack,
 * or returns -1 if all stacks are empty.
 * @return {number}
 */
DinnerPlates.prototype.pop = function() {
  if ( !this.size ) {
    return -1;
  }

  while ( this.del && !this.map.get( this.del ).length ) {
    this.del -= 1;
  }

  if ( this.del < this.ins ) {
    this.ins = this.del;
  }

  this.size -= 1;

  return this.map.get( this.del ).pop();
};

/**
 * Returns the value at the top of the stack with the
 * given index and removes it from that stack,
 * or returns -1 if the stack with that given index is empty.
 * @param {number} index
 * @return {number}
 */
DinnerPlates.prototype.popAtStack = function( index ) {
  if ( !this.map.has( index ) || !this.map.get( index ).length ) {
    return -1;
  }

  if ( index < this.ins ) {
    this.ins = index;
  }

  this.size -= 1;

  return this.map.get( index ).pop();
};


module.exports = DinnerPlates;

/*

Example walk through:

DinnerPlates D = DinnerPlates(2);  // Initialize with capacity = 2
D.push(1);
D.push(2);
D.push(3);
D.push(4);
D.push(5);         // The stacks are now:  2  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 2.  The stacks are now:     4
                                                       1  3  5
                                                       ﹈ ﹈ ﹈
D.push(20);        // The stacks are now: 20  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.push(21);        // The stacks are now: 20  4 21
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 20.  The stacks are now:     4 21
                                                        1  3  5
                                                        ﹈ ﹈ ﹈
D.popAtStack(2);   // Returns 21.  The stacks are now:     4
                                                        1  3  5
                                                        ﹈ ﹈ ﹈
D.pop()            // Returns 5.  The stacks are now:      4
                                                        1  3
                                                        ﹈ ﹈
D.pop()            // Returns 4.  The stacks are now:   1  3
                                                        ﹈ ﹈
D.pop()            // Returns 3.  The stacks are now:   1
                                                        ﹈
D.pop()            // Returns 1.  There are no stacks.
D.pop()            // Returns -1.  There are still no stacks.

*/
