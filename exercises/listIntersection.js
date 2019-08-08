/**
 * Intersection of Two Linked Lists
 *
 * Write a program to find the node at
 * which the intersection of two SLL's begins.
 *
 * If two lists don't intersect, return null.
 * The lists must retain their original structure upon return.
 * Assume no cycles anywhere in linked structure.
 * Code should run in linear time with constant memory.
 *
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
module.exports = function getIntersectionNode( headA, headB ) {
  if ( !headA || !headB ) {
    return null;
  }

  let [a, b] = [headA, headB];

  while ( a !== b ) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }

  return a;
};

/**
 * Don't need to pre-process lengths to sync.
 * Since lenA + lenB = lenB + lenA,
 * they will sync at most after two iterations if diff lengths.
 */
