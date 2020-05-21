/**
 * Copy List with Random Pointer
 *
 * A linked list is given such that each node contains an
 * additional random pointer which could point to any node
 * in the list or null.
 *
 * Return a deep copy of the list.
 *
 * @example
 * Input: {"$id":"1","next":{"$id":"2","next":null,"random":{"$ref":"2"},"val":2},"random":{"$ref":"2"},"val":1}
 * Explanation:
 * Node 1's value is 1, both of its next and random pointer points to Node 2.
 * Node 2's value is 2, its next pointer points to null and
 * its random pointer points to itself.
 *
 * Note:
 * You must return the copy of the given head
 * as a reference to the cloned list.
 *
 */

/**
 * Definition for a List Node.
 */
function Node( val,next,random ) {
  this.val = val;
  this.next = next;
  this.random = random;
}

/**
 * @param {Node} head
 * @return {Node}
 */
module.exports = function copyListWithRandom( head ) {
  const copies = new WeakMap();

  const getOrMakeCopy = node => {
    if ( !node ) {
      return null;
    }
    if ( copies.has( node ) ) {
      return copies.get( node );
    }

    const copy = new Node( node.val );

    // IMPORTANT: Need to set the node in the map, before recursing
    // or we'll run into an infinite loop since the node will never be set.
    copies.set( node, copy );

    copy.next = getOrMakeCopy( node.next );
    copy.random = getOrMakeCopy( node.random );

    return copy;
  };

  return getOrMakeCopy( head );
};
