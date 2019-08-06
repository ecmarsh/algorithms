/**
 * Asteroid Collision (Lyft)
 *
 * We are given an array asteroids of integers representing asteroids in a row.
 *
 * For each asteroid, the absolute value represents its size,
 * and the sign represents its direction (positive: right, negative: left).
 * Each asteroid moves at the same speed.
 *
 * Find out the state of the asteroids after all collisions.
 * If two asteroids meet, the smaller one will explode.
 * If both are the same size, both will explode.
 * Two asteroids moving in the same direction will never meet.
 *
 * @example
 * Input: [5,10,-5]
 * Output: [5,10]
 * Explanation: 10 and -5 collide resulting in 10. 5 and 10 don't collide.
 *
 * @example
 * Input: [8, -8]
 * Output: []
 * Explanation: Each collide and explode each other.
 *
 * @example
 * Input: [10,2,-5]
 * Output: [10]
 * Explanation: 2, -5 collide -> -5. 10,-5 colllide -> 10
 *
 * @example
 * Input: [-2,-1,1,2]
 * Output: [-2,-1,1,2]
 * Explanation: First two are moving left, last two right so never collide.
 *
 * Constraints:
 * - Length of asteroids will be at most 10000.
 * - Each asteroid is a non-zero integer in range (-1000,1000)
 */

/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
module.exports = function asteroidCollision( asteroids ) {
  if ( asteroids.length < 2 ) {
    return asteroids;
  }

  const stack = [asteroids[0]],
    isCollision = ( left, right ) => left > 0 && right < 0;

  for ( let i = 1; i < asteroids.length; i++ ) {
    const curr = asteroids[i],
      prev = stack.pop();

    if ( prev == null ) {
      stack.push( curr );
      continue;
    }

    if ( isCollision( prev, curr ) ) {
      const [prevSize, currSize] = [Math.abs( prev ), Math.abs( curr )];

      if ( prevSize === currSize ) {
        // Don't add either
        continue;
      }

      if ( prevSize > currSize ) {
        // Add prev back to stack
        stack.push( prev );
        continue;
      }

      // Repeat comparison with same curr
      // ...until stack empty <--Add curr
      // ...or no collision <---Add both
      i--;
    }
    else {
      stack.push( prev );
      stack.push( curr );
    }
  }

  return stack;
};

// PSUEDOCODE
// No collision: Push prev, push curr
// No prev:
//   push curr/right
// Collision:
//   left == right -> dont push
//   left > right -> push(left)
//   right > left -> repeat for left
// No collide:
//   push both

// Note: Using a stack causes O(n) space
// You can use two pointers and modify in place to get O(1) same time.
