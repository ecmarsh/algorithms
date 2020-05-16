/**
 * Odd Even Linked List
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
 *
 * @complexity
 * Time: O(N) where n is the number of nodes
 * Space: O(1)
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// Idea is to start odd at the head, even at the following
// and simply increment each one where even is ahead of odd,
// then connect the two lists at the end.

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
module.exports = function oddEvenList( head ) {
  // Need to check for null head because
  // setting even to head.next will throw if null.
  if ( !head ) {
    return head;
  }

  let odd = head;
  let even = head.next;
  const evenHead = even;

  while ( even && even.next ) {
    // Move odd to evens next
    odd = even.next;
    odd = odd.next;
    // Move even to odds next
    even = odd.next;
    even = even.next;
  }

  // Connect the lists
  odd.next = evenHead;

  return head;
};
