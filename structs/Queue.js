const isArrayLike = require( 'lodash/isArrayLike' );

/**
 * Queues
 * FIFO :: First in, first out
 *
 * Good for accessing first element quickly
 * and keeping items in order
 *
 * Methods similar to array
 * enqueuing == Array.prototype.push O(1)
 * dequeining == Array.prototype.shift O(1) - O(n) w/o linked list
 *
 * Below is a queue-like struct using arrays.
 * See Stack.js for similar access/search : O(n)
 *
 * NOTE: You can make a queue with two stacks,
 *       and a stack from queues
 */

module.exports = {
  init( array ) {
    this.array = isArrayLike( array ) ? [...array] : [];
  },
  get buffer() {
    // Return copy for access/search
    const copy = [];
    for ( let i = 0; i < this.array.length; i++ ) {
      copy[i] = JSON.parse( JSON.stringify( this.array[i] ) );
    }
    return copy;
  },
  get isEmpty() {
    return this.array.length === 0;
  },
  get peek() {
    // Get first item O(1)
    return this.array[0];
  },
  enqueue( item ) {
    // Insertion O(1)...amortized
    this.array[this.array.length] = item;
  },
  dequeue() {
    // Remove and return first
    const res = this.array[0];
    let i = -1;
    while ( ++i < this.array.length ) {
      this.array[i] = this.array[i + 1];
    }
    this.array.length = this.array.length - 1;
    return res;
  },
};
