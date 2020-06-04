/**
 * @lc id=25 lang=javascript tag=linked,list,amz
 *
 * [25] Reverse Nodes in K-Group
 *
 * Given a linked list, reverse the nodes of a linked list
 * `k` at a time and return its modified list.
 *
 * k is a positive integer and is less than or equal to the length of
 * the linked list. If the number of nodes is not a multiple of `k`
 * then left-out nodes in the end should remain as it is.
 *
 * Definition for singly-linked list:
 * ```js
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * ```
 *
 * @constraints
 * - Only const extra memory is allowed: O(1)
 * - You cannot alter values in list nodes, only nodes itself changed.
 *
 * @example
 * Input: 1->2->3->4->5
 * For k = 2, you should return: 2->1->4->3->5
 * For k = 3, you should return: 3->2->1->4->5
 *
 * @complexity
 * Time: O(N) -> Traversed forward, and then backward for reversal = 2N
 * Space: O(1) - Note constant memory means recursive not allowed.
 */

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
exports.default = function reverseKGroup( head, k ) {
  let firstHead = null; // Need to save first reversal head.

  let cursorNode = head; // Keeps track of where we are in list.
  let prevGroupTail = null; // Stores the new tail after reversal.
  let nextGroupHead = head; // Stores the next group to begin reversal.

  while ( cursorNode ) {
    let count = 0; // track nodes seen to determine where to stop reversal

    // Move the cursor node forward, this will also hold pointer to next head of the kgroup.
    while ( cursorNode && count < k ) {
      cursorNode = cursorNode.next;
      count += 1;
    }

    // If there are not `k` nodes to reverse we can break,
    // as we shouldn't reverse less than k nodes.
    // NOTE: Remember to attach last tail to current head.
    if ( count !== k ) break;

    // Get the new head of the reversed group
    const currGroupHead = reverse( nextGroupHead, k );

    // For the first reversal, we need to save the new head to return
    if ( firstHead === null ) {
      firstHead = currGroupHead;
    }

    // Attach the last tail to the most recently reversed head
    if ( prevGroupTail !== null ) {
      prevGroupTail.next = currGroupHead;
    }

    // The head before reversal will become the groups tail after reversal
    prevGroupTail = nextGroupHead;
    // And our cursor node stored the node to the next group's head to reverse.
    nextGroupHead = cursorNode;
  }

  // Attach final, possibly unreversed, portion of list to last tail
  if ( prevGroupTail !== null ) {
    prevGroupTail.next = nextGroupHead;
  }

  // In case no reversals happened, returned original head;
  return firstHead || head;
};

/**
 * Reverses k nodes in a linked list.
 * @param {ListNode} node
 * @param {number} k
 * @return {ListNode} New head of reversed list
 * @constraint Assumes there are at least k nodes to reverse
 */
const reverse = ( node, k ) => {
  let prev = null;
  for ( let i = 0; i < k; i++ ) {
    const next = node.next;
    node.next = prev;
    prev = node;
    node = next;
  }
  // prev is the new head of the linked list
  return prev;
};
