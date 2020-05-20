/**
 * @lc id=203 lang=javascript tag=bst
 *
 * [203] Kth Smallest Element in Binary Search Tree
 *
 * Given a binary search tree, write a function `kthSmallest` to find
 * the `k`th smallest element in it.
 *
 * Definition for a binary tree node:
 * ```js
 *  function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 *  }
 * ```
 *
 * @constraints
 * - k is always valid, 1 <= k <= N, where N is nodes in BST
 *
 * @example
 * Input: root=[3,1,4,null,2], k=2
 *     3
 *   /   \
 *  1     4
 *   \
 *    2
 * Output: 1
 *
 * @example
 * Input: root=[5,3,6,2,4,null,null,1], k=3
 *        5
 *      /   \
 *     3     6
 *    / \
 *   2   4
 *  /
 * 1
 * Output: 3
 *
 * @complexity
 * Let N = nodes in tree, k = k (param), H = height of tree
 * Time: O(h + k), since we have to go down to leaf before we
 *       start searching for khen start searching for k
 * Space: O(h + k), for same reason as time.
 *        O(N + k) in worst case (k is last node spindly tree)
 *        O(log N + k) in average case (balanced case, average k)
 */

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
module.exports.recursive = function kthSmallestRecursive( root, k ) {
  let res = -1;

  // In order traversal, counting elements seen to k.
  const traverse = ( node ) => {
    if ( !node ) return;
    traverse( node.left );
    if ( --k === 0 ) {
      res = node.val;
      return;
    }
    traverse( node.right );
  };

  traverse( root );

  return res;
};

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
module.exports.iterative = function kthSmallestIterative( root, k ) {
  const stack = [];

  while ( stack.length || root ) {
    // Start from the smallest element in subtree (left most)
    while ( root ) {
      stack.push( root );
      root = root.left;
    }
    // When we don't have an element, get it off stack
    root = stack.pop();

    // Count an element and decrement k
    if ( --k === 0 ) {
      return root.val;
    }

    // Traverse right of tree next loop.
    // Note that if there's no root.right, it will go left or if it's a leaf,
    // if it's a leaf, it will just become next on stack for
    root = root.right;
  }

  return -1;
};
