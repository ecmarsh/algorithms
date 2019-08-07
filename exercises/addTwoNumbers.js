/**
 * Add Two Numbers
 *
 * You are given 2 non-empty linked lists representing two non-negative ints.
 * The digits are in reverse order and each nodes contains a single digit.
 * Add the two numbers and return it as a linked list.
 *
 * You may assume the two numbers do not contain any leading zero,
 * except the number 0 itself.
 *
 * @example
 * Input: (2->4->3) + (5->6->4)
 * Output: 7->0->8
 * Explanation: 342 + 465 = 807
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
module.exports = function addTwoNumbers( l1, l2 ) {
  const buffer = new ListNode( 0 );

  let node = buffer,
    carry = 0;

  while ( l1 !== null || l2 !== null ) {
    const x = l1 ? l1.val : 0,
      y = l2 ? l2.val : 0,
      sum = carry + x + y;

    carry = 0 | sum / 10;
    node.next = new ListNode( sum % 10 );

    node = node.next;
    l1 = l1 ? l1.next : l1;
    l2 = l2 ? l2.next : l2;
  }

  if ( carry ) {
    node.next = new ListNode( carry );
  }

  return buffer.next;
};
