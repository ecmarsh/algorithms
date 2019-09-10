/**
 * Palindrome Linked List
 *
 * Given a singly linked list, determine if it is a palindrome.
 *
 * @example
 * Input: 1->2
 * Output: false
 *
 * @example
 * Input: 1->2->2->1
 * Output: true
 *
 * @example
 * Input: 1->3->1
 * Output: true
 *
 * @example
 * Input: -> (none)
 * Output: true
 *
 * Analysis:
 * N is nodes in linked list
 * Time: O(2N) -> O(N)
 * Space: O(1), but see awesome discussion on space vs extra space here:
 * https://leetcode.com/problems/palindrome-linked-list/discuss/64493/Reversing-a-list-is-not-considered-%22O(1)-space%22
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
 * @param {ListNode} head
 * @return {boolean}
 */
module.exports = function isListPalindrome( head ) {
  if ( head === null || head.next === null ) {
    return true;
  }

  let prev = null;
  let slow = head;
  let fast = head;

  while ( fast !== null && fast.next !== null ) {
    // Pacer for when to split
    fast = fast.next.next;

    // Reverse slow and prev
    // and increment slow to next
    const nextTmp = slow.next;
    slow.next = prev;
    prev = slow;
    slow = nextTmp;
  }

  // If loop terminated because fast.next = null
  // this means fast is the end node, thus list is odd size.
  // So we need to ignore the middle node since
  // middleNode == middleNode will always be true for palin requirements.
  if ( fast !== null ) {
    slow = slow.next;
  }

  // Now we reversed the first half of the list, which also
  // split the list by not reversing all the way to tail.
  // `prev` is our new head of the first reversed half.
  // `slow` marks the beginning of the last half.
  // Note: if we need to keep list in tact, we can put the
  // first half back in order while doing this traversal.
  while ( prev !== null  && slow !== null ) {
    if ( prev.val !== slow.val ) {
      return false;
    }
    prev = prev.next;
    slow = slow.next;
  }

  return true;
};

/*
OVERVIEW:
1. use floyd's tortoise/hare to split linked list
    - to save 1/2 pass, reverse first half of list during split
2. Traverse reversed half and normal half for match
    - if all match -> is palindrome
*/
