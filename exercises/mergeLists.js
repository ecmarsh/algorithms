/**
 * __Merge Two Sorted Linked Lists__
 *
 */
/**
 * Definition for singly-linked list.
 * ```js
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * ```
 */
/**
 * @param {ListNode} l1 First sorted linked-list.
 * @param {ListNode} l2 Second sorted linked-list.
 * @return {ListNode} The merged, sorted list.
 */
module.exports = function mergeTwoLists( l1, l2 ) {
  if ( !l1 || !l2 ) {
    return l1 || l2;
  }
  if ( l1.val < l2.val ) {
    l1.next = mergeTwoLists( l1.next, l2 );
    return l1;
  }
  {
    l2.next = mergeTwoLists( l1, l2.next );
    return l2;
  }
};
