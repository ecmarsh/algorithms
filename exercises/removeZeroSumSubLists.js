/**
 * Remove Zero Sum Consecutive Nodes from Linked List
 * _Weekly Contest 151_
 *
 * Given the head of a linked list, we repeatedly delete
 * consecutive sequences of nodes that sum to 0
 * until there are no such sequences.
 *
 * After doing so, return the head of the final linked list.
 * You may return any such answer that has no zero sum sequences.
 *
 * @example (note sequences are serializations of ListNode Objects)
 * Input: head = [1,2,-3,3,1]
 * Output: [3,1]
 * Note: The answer [1,2,1] would also be accepted.
 *
 * Input: head = [1,2,3,-3,4]
 * Output: [1,2,4]
 *
 * Input: head = [1,2,3,-3,-2]
 * Output: [1]
 *
 * Constraints:
 * The given linked list will contain between 1 and 1000 nodes.
 * Each node in the linked list has -1000 <= node.val <= 1000.
 *
 * Analysis:
 * Time: O(N) worst case O(N^2) if all sums different.
 * Space: O(N) if all sums are different
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
module.exports = function removeZeroSumSublists( head ) {
  if ( !head.next ) {
    return head.val ? head : null;
  }

  const buffer = new ListNode( void 0 );
  buffer.next = head;

  let sum = 0,
    node = buffer.next;

  const presums = new Map( [[sum, buffer]] );

  while ( node ) {
    if ( presums.has( sum ) ) {
      presums.get( sum ).next = node;
    }

    let hasPath = false;
    sum += node.val;

    if ( presums.has( sum ) ) {
      let ptr = buffer;
      while ( ptr && !hasPath ) {
        hasPath = Object.is( ptr, presums.get( sum ) );
        ptr = ptr.next;
      }
    }

    hasPath || presums.set( sum, node );
    node = node.next;
  }

  if ( presums.has( sum ) ) {
    presums.get( sum ).next = null;
  }

  return buffer.next;
};
