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
  init( items ) {
    this.items = isArrayLike( items ) ? [...items] : [];
  },
  get buffer() {
    // Return copy for access/search
    // This is used for access, so if a reference
    // is an element of this.items, avoid modifying
    const deepCopy = [];
    for ( let i = 0; i < this.items.length; i++ ) {
      deepCopy[i] = JSON.parse( JSON.stringify( this.items[i] ) );
    }
    return deepCopy;
  },
  get isEmpty() {
    return this.items.length === 0;
  },
  get peek() {
    // Get first item O(1)
    return this.items[0];
  },
  enqueue( newItem ) {
    // Insertion O(1) (amortized)
    this.items[this.items.length] = newItem;
  },
  dequeue() {
    // Remove and return first
    // Note: use a linked list to keep at O(1)
    const removedElement = this.items[0];
    let i = 0;
    while ( i < this.items.length ) {
      this.items[i] = this.items[++i];
    }
    this.items.length = this.items.length - 1;
    return removedElement;
  },
};
