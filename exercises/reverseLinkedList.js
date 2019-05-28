/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head The starting head
 * @return {ListNode} The new head
 */

module.exports = function reverseSLL( head ) {
  // Initialize starting node and
  // temp variable to hold 'previous' pointer
  let prev, node = head;

  while ( node ) {
    const next = node.next;
    node.next = prev;
    prev = node;
    if ( !next ) { break; }
    node = next;
  }

  return node;
};
