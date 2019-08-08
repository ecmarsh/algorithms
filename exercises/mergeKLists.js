/**
 * Merge k Sorted Linked Lists
 *
 * Merge _k_ sorted linked lists and return it as one sorted linked list.
 *
 * Analyze and describe its complexity:
 * Time (Divide & Conquer):
 * - n is total nodes in two lists, k is total lists
 * - Pair k lists merged -> k/2 lists, avg 2N/k length, then k/4, k/8, ...
 * - So we do O(Σ(1..log2k)N) = O(N log k)
 *
 * Space: O(1):
 * - Updating lists in place.
 * - Use iteration for merging two
 *
 * @example
 * Input:
 * [
 *  1->4->5
 *  1->3->4,
 *  2->6
 * ]
 * Output: 1->1->2->3->4->4->5->6
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
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
module.exports = function mergeKLists( lists ) {
  const numLists = lists.length;

  if ( !numLists ) {
    return null;
  }

  if ( numLists === 1 ) {
    return lists[0];
  }

  let interval = 1;

  while ( interval < numLists ) {
    const highest = numLists - interval,
      step = interval << 1;

    for ( let i = 0; i < highest; i+=step ) {
      const next = i + interval,
        [l1, l2] = [lists[i], lists[next]];

      lists[next] = null;
      lists[i] = merge( l1, l2 );
    }

    interval = step;
  }

  return lists[0];
};

function merge( l1, l2 ) {
  let cursor = new ListNode( 0 );
  const buffer = cursor;

  while ( l1 && l2 ) {
    if ( l1.val <= l2.val ) {
      cursor.next = l1;
      l1 = l1.next;
    }
    // l2.val < l1.val
    else {
      cursor.next = l2;
      l2 = l1;
      l1 = cursor.next.next;
    }

    cursor = cursor.next;
  }

  cursor.next = l1 || l2;

  return buffer.next;
}

/*
Merge visual:

eqOp: *cursor* [l1, l2]
....: *0*-> [1->4->5, 1->3->4]
-------------
1<=1: 0->*1*->4->5  [4->5, 1->3->4]
4>1: 0->1->*1*->3->4->  [3->4, 4->5]
3<=4: 0->1->1->*3*->4->  [4, 4->5]
4<=4: 0->1->1->3->*4*->4-> [null, 4->5]
----BREAK----
NXT->l2: 0->1->->3->4->4->5->
-------------
RETURN: 1->3->4->4->5->null

*/

/*
Interval merging visual with k=8
-------------
"0,1,2,3,4,5,6,7,8"
 [ [ 1, 4, 5 ],
  [ 1, 3, 4 ],
  [ 2, 6 ],
  [ 7, 8 ],
  [ 5, 6, 9 ],
  [ 1, 2, 3 ],
  [ 10, 11 ],
  [ 9, 12 ],
  [ 0 ] ]
-------------
"0,2,4,6,8"
 [ [ 1, 1, 3, 4, 4, 5 ],
  undefined,
  [ 2, 6, 7, 8 ],
  undefined,
  [ 1, 2, 3, 5, 6, 9 ],
  undefined,
  [ 9, 10, 11, 12 ],
  undefined,
  [ 0 ] ]
------------
"0,4,8"
 [ [ 1, 1, 2, 3, 4, 4, 5, 6, 7, 8 ],
  undefined,
  undefined,
  undefined,
  [ 1, 2, 3, 5, 6, 9, 9, 10, 11, 12 ],
  undefined,
  undefined,
  undefined,
  [ 0 ] ]
------------
"0,8"
 [ [ 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12 ],
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  [ 0 ] ]
------------
"0"
 [ [ 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12 ],
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined ]
*/
