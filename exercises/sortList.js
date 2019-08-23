/**
 * Sort Linked List
 *
 * Sort a linked list in O(n log n) time using constant space.
 *
 * @example
 * Input: 4->2->1->3
 * Output: 1->2->3->4
 *
 * Input: 5->(-1)->3->4->0
 * Output: (-1)->0->3->4->5
 *
 * Analysis:
 * Time: O( n log n ) <- merge sort
 * Space: O(1) Recursive calls are TCO. Merge implemented in place iteratively.
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
module.exports = function sortList( head ) {
  if ( !head || !head.next ) {
    return head;
  }

  let fast = head,
    slow = head,
    partition = slow;

  while ( fast && fast.next ) {
    partition = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  partition.next = null;

  const leftHalf = sortList( head );
  const rightHalf = sortList( slow );

  return merge( leftHalf, rightHalf );
};

const merge = ( left, right ) => {
  if ( !left || !right ) {
    return left || right;
  }

  const buffer = new ListNode( null );

  let node = buffer;
  while ( left && right ) {
    if ( left.val <= right.val ) {
      node.next = left;
      left = left.next;
    }
    else {
      node.next = right;
      right = right.next;
    }
    node = node.next;
  }

  if ( left || right ) {
    node.next = left || right;
  }

  return buffer.next;
};
