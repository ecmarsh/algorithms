/**
 * Remove Linked List Elements
 *
 * Remove all elements from a linked list of integers
 * that have a value equal to the argument, `val`.
 *
 * @example
 * Input: 1->2->6->3->4->5->6, val=6
 * Output: 1->2->3->4->5
 *
 * Complexity: See respective solutions. N will be nodes in list.
 */

/** Definition for singly-linked list. */
function ListNode( val ) {
  this.val = val;
  this.next = null;
}

/**
 * removeListElements deletes any nodes from list with value of `val`.
 * @param {ListNode} head
 * @param{number} val
 * @return {ListNode}
 */
/**
 * Iterative solution
 * Use a _sentinel node_ as psuedo head and remove standardly.
 * See https://en.wikipedia.org/wiki/Sentinel_node for definition.
 * Time: O(N) One-pass
 * Space: O(1) We create one node each call and only hold 2 ptrs.
 */
function removeElementsIterative( head, val ) {
  if ( head === void 0 ) {
    return;
  }
  const sentinel = new ListNode( void 0 );
  sentinel.next = head;

  let prev = sentinel;
  let curr = head;
  while ( curr !== null ) {
    if ( curr.val === val ) {
      prev.next = curr.next;
    } else {
      prev = curr;
    }
    curr = curr.next;
  }

  return sentinel.next;
}
module.exports.iterative = removeElementsIterative;


/**
 * Recursive solution
 * Add each node to stack, skipping current if val matches.
 * Once we reach tail, pop off the stack and build the edited list.
 * Time: O(N)
 * Space: O(N) since stack builds until first null pointer (tail).
 * Note: We could get this down to O(1) if we added prev/cur params
 *       and moved both returns to TCO positions.
 */
function removeElementsRecursive( head, val ) {
  if ( head === void 0 ) {
    return;
  }
  if ( head.val === val ) {
    return removeElementsRecursive( head.next, val );
  }
  head.next = removeElementsRecursive( head.next, val );
  return head;
}
module.exports.recursive = removeElementsRecursive;
