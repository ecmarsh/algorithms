/**
 * Remove Linked List Duplicates II
 *
 * Given a _sorted_ linked list,
 * delete all nodes that have duplicate numbers,
 * leaving only _dinstinct_ numbers from the original list.
 *
 * @example
 * Input: 1->2->3->3->4->4->5
 * Output: 1->2->5
 *
 * @example
 * Input: 1->1->1->2->3
 * Output: 2->3
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
 * @return {ListNode}
 */
module.exports = function deleteDuplicates( head ) {
  if ( !head ) {
    return head;
  }

  const buffer = new ListNode( 'buffer' );
  buffer.next = head;

  let prev = buffer,
    node = head,
    prevVal = prev.val;

  while ( node ) {
    const isPrevVal = node.val == prevVal;
    const isNextVal = node.next ? node.next.val === node.val : false;
    prevVal = node.val;

    if ( isPrevVal || isNextVal ) {
      prev.next = node.next;
      node = prev.next;
    }
    else {
      prev = prev.next;
      node = node.next;
    }
  }

  return buffer.next;
};
