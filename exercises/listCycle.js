/**
 * Linked List Cycle II
 *
 * Given a linked list, return the node where the cycle begins.
 * If there is no cycle, return null.
 *
 * Do not modify the linked list.
 * Memory should be O(1)
 */

/**
 * Definition for singly-linked list.
 * function ListNode( val ) {
 *   this.val = val;
 *   this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
module.exports = function detectCycle( head ) {
  if ( !head ) {
    return head;
  }

  const intersect = getIntersect( head );
  if ( !intersect ) {
    return intersect;
  }

  let [a, b] = [head, intersect];
  while ( a !== b ) {
  /*
    dist(slow) = dist(fast)
        2(F+a) = F+a+b+a
         2F+2a = F+2a+b
             F = b
  */
    a = a.next;
    b = b.next;
  }

  return a;
};

function getIntersect( head ) {
  let slow = head,
    fast = head;

  while ( fast && fast.next ) {
    slow = slow.next;
    fast = fast.next.next;

    if ( slow === fast ) {
      return slow;
    }
  }

  return null;
}
