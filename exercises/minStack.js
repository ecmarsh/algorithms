/**
 * Min Stack Design (Easy Collection)
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 * push(x) -- Push element x onto stack.
 * pop() -- Removes the element on top of the stack.
 * top() -- Get the top element.
 * getMin() -- Retrieve the minimum element in the stack.
 *
 */

/**
* initialize your data structure here.
*/
const MinStack = function() {
  this.items = [];
  this.size = 0;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function( x ) {
  this.items[this.size] = {
    val: x,
    min: this.size === 0 ? x : Math.min( x, this.getMin() ),
  };
  this.size++;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  if ( this.size > 0 ) { this.size--; }
  this.items.length = this.size;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.items[this.size - 1].val;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.size === 0 ? null : this.items[this.size - 1].min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */


module.exports = MinStack;
