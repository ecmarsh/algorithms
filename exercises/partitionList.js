/**
 * @=lc id=86 lang=javascript tag=linkedlist
 *
 * [86] Partition Linked List
 *
 * Given a linked list and a value, `x`, partition it such that all nodes
 * less than `x` come before nodes greater than or equal to `x`.
 *
 * The original relative order of nodes in each partition should be preserved.
 *
 * @example
 * Input: head= 1->4->3->2->5->2, x=3
 * Output: 1->2->2->4->3->5
 *
 * @complexity
 * Time: O(n), where n is number of nodes in the list
 * Space: O(1), constant amount of variables are created
 */

/** Definition for singly-linked list. */
function ListNode( val ) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
module.exports = function partitionList( head, x ) {
  if ( head == null ) {
    return head;
  }

  const ltSent = new ListNode( void 0 );
  const gteSent = new ListNode( void 0 );
  let ltPtr = ltSent;
  let gtePtr = gteSent;

  for ( let index = head; index !== null; index = index.next ) {
    if ( index.val < x ) {
      ltPtr.next = index;
      ltPtr = ltPtr.next;
    } else {
      gtePtr.next = index;
      gtePtr = gtePtr.next;
    }
  }

  gtePtr.next = null;        // break cycle at tail
  ltPtr.next = gteSent.next; // connect partitions

  return ltSent.next;
};

/*
1. before, after dummy heads
   ptrBefore, ptrAfter -> befdummy,aftdummy
2. for each node:
    node.Val < val ? beforePtr.next : afterPtr.next
3. connect sides: before pointer -> afterdummyhead.next
4. return before.next -> will just be afterdummy.next if no lt
*/

