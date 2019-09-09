/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head The starting head
 * @return {ListNode} The new head
 */
module.exports = function reverseSLLIterative( head ) {
  let prev = null;
  let cur = head;

  while ( cur !== null ) {
    const nextTmp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextTmp;
  }

  return prev;
};
/*
PSUEDO (iterative):

var cur = head
var prev = beforeCur = null

do until cur is null:
  1. var nextTmp = cur.next
  2. cur -> prev
  3. prev = cur
  4. cur = nextTmp

return newHead = prevTail (last cur) = prev


EX: 1->2->3->4

LOOP 1: (cur=1, prev=null)
  1. nextTmp = 2 (next in line)
  2. cur.next = prev
        1->null, 2->3->4->null
  3. prev = cur (prev=1)
  4. cur = nextTmp (cur=2)

LOOP 2: (cur=2, prev=1)
1->null, 2->3->4
  1. nextTmp = 3
  2. cur.next = prev
        2->1->null, 3->4
  3. prev = cur (prev=2)
  4. cur = nextTmp (cur=3)

LOOP 3: (cur=3, prev=2)
2->1->null, 3->4
  1. nextTmp = 4
  2. cur.next = prev
        3->2->1->null, 4->null
  3. prev = cur (prev=3)
  4. cur = nextTmp (cur=4)

LOOP 4: (cur=4, prev=3)
3->2->1->null, 4->null
  1. nextTmp = 4.next=null
  2. cur.next = prev
        4->3->2->1->null
  3. prev = cur (prev=4)
  4. cur = nextTmp (cur=null)-> termination

return new head = last cur = prev = 4

4->3->2->1->null

*/

