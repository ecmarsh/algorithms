/**
 * __Odd Even Linked List__
 *
 * Given a singly linked list, group all odd nodes together followed by the
 * even nodes. Please note here we are talking about the
 * node number and not the value in the nodes.
 * You should do it in place.
 * The program should run in O(1) space complexity and O(nodes) time complexity.
 *
 * @example
 * Input: 1->2->3->4->5->NULL
 * Output: 1->3->5->2->4->NULL
 *
 * @example
 * Input: 2->1->3->5->6->4->7->NULL
 * Output: 2->3->6->7->1->5->4->NULL
 *
 * _NOTE_:
 * The relative order inside both the even and odd groups
 * should remain as it was in the input.
 * The first node is considered odd, the second node even and so on ...
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
module.exports = function oddEvenList( head ) {
  if ( !head ) {
    return head;
  }

  let odd = head;
  const even = head.next;

  while ( odd.next && odd.next.next ) {
    const tmp = odd.next;
    odd.next = odd.next.next;
    odd = odd.next;
    tmp.next = odd.next;
  }

  odd.next = even;
  return head;
};
