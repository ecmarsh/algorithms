const isArrayLike = require( 'lodash/isArrayLike' );
const isUndefined = require( 'lodash/isUndefined' );

/**
 * Stacks
 * LIFO :: last in, first out
 *
 * Pros: Peek + Insertion is O(1)
 * Cons: Access + Search is O(1)
 * Access/Search will have O()
 */

const Stack = {
  init( array ) {
    this.array = isArrayLike( array ) ? [...array] : [];
  },
  get buffer() {
    // Return copy of array
    return this.array.slice();
  },
  get isEmpty() {
    return this.array.length === 0;
  },
  get top() {
    // Check last added item
    return this.array[this.array.length - 1];
  },
  push( item ) {
    // Insertion
    this.array.push( item );
  },
  pop() {
    // Deletion
    return this.array.pop();
  },
};

// Get the value of the `nth` item on the stack
function accessStack( stack, n ) {
  if ( !stack || n <= 0 ) {
    throw Error( `Invalid argument(s)` );
  }
  // Use a copy to avoid mutating original
  const stackBuffer = { array: stack.buffer };

  // Pop items off until we get to `n`th item
  while ( --n > 0 ) {
    stack.pop.call( stackBuffer );
  }

  // Return the nth item (Time: O(n))
  return stack.pop.call( stackBuffer );
}

function stackHas( stack, el ) {
  if ( !stack || isUndefined( el ) ) {
    throw Error( `Invalid argument(s)` );
  }
  // Copy the stack instance
  const stackBuffer = { array: stack.buffer };

  // Search stack (copy) linearly first to last
  while ( stackBuffer.array.length > 0 ) {
    if ( stack.pop.call( stackBuffer ) === el ) {
      return true; // found
    }
  }

  // Not found
  return false;
}

module.exports = { Stack, accessStack, stackHas };
