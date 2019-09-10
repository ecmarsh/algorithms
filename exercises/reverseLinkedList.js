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
module.exports.iterative = function reverseListIterative( head ) {
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


module.exports.recursive = function reverseListRecursive( head ) {
  // Base case only reached if no head for initial call
  // Or when we've reached the tail (aka head.next = null)
  if ( head === null || head.next === null ) {
    return head;
  }

  const tail = reverseListRecursive( head.next ); // Will call until tail
  head.next.next = head; // This iniates reversal, but creates cycle
  head.next = null; // This breaks cycle, putting head as current tail
  return tail; // Tail is the head in reversed
};

/*
PSUEDO (recursive):
We recursively traverse to get to tail,
keeping refs in each frame and reverse backwards:

1. If no head/node (initial call) or reached tail (node.next=null):
        return head/node
2. tail=traverse next (this will get us to tail and always return tail)

Now working backwards (popping off stack):
  3. set cur.next.next to point to cur
  4. set cur.next to null (important, or else cycle)

Ex: 1->2->3->4
Recursive will get us to tail=4
Note in all calls, prev is always the tail.

Reversal 1: (cur=3, prev=4)
 a. (cur.next.next = prev)
    cur.next is 4
    4.next = 3 (cyclical now)
 b. cur.next = null ( break cycle)
    3.next = null (break cycle)
    1->2->3->null
 c. return prev=4(->3->null) to next call

Reversal 2: (cur=2, prev=4->3->null)
 a. (cur.next.next = prev)
    cur.next is 3
    3.next = 2
 b. cur.next = null
    2.next = null
    1->2->null
 c. return prev=4(->3->2->null) to next call

Reversal 3: (cur=1, prev=4->3->2->null)
 a. (cur.next.next = prev)
    cur.next is 2
    2.next = 1
 b. cur.next = null
    1.next = null
    ...1->null
 c. return prev=4->3->2->1->null to next call
          last on stack -> ans

Note this solution is tricker and uses O(N) space compared to iterative

*/
