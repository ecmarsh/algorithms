/**
 * Remove Nth Node from End of List
 *
 * Given a linked list, remove the n-th node
 * from the end of the list and return its head.
 *
 * @example
 * Input: list= 1->2->3->4->5, n=2
 * Output: head -> list= 1->2->3->5
 * Explanation: 4 is the 2nd to last node from the end.
 *
 */

/**
 * Definition for singly-linked list.
 */
function ListNode( val ) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
module.exports = function removeNthFromEnd( head, n ) {
  const buffer = new ListNode( 0 );
  buffer.next = head;

  let first = buffer,
    second = buffer;

  // Advance second `n` nodes apart from first
  for ( let i = 0; i <= n; i++ ) {
    second = second.next;
  }

  // Advance first until second is at end
  while ( second !== null ) {
    first = first.next;
    second = second.next;
  }

  // Now first is at before node to remove
  first.next = first.next.next;

  // Return currenthead, referenced by buffer
  return buffer.next;
};
