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
    return this.array.slice();
  },
  get isEmpty() {
    return this.array.length === 0;
  },
  get peek() {
    // Get first item O(1)
    return this.array[0];
  },
  enqueue( item ) {
    // Insertion O(1)
    this.array.push( item );
  },
  dequeue() {
    // Remove front
    return this.array.shift();
  },
};
