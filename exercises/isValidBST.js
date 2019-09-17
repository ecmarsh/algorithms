/**
 * Validate Binary Search Tree
 *
 * Given a binary tree root, determine if it is a valid binary search tree.
 *
 * For this problem, a BST is defined as follows:
 * - Left subtree contains only nodes with values _less than_ node's value.
 * - Right subtree contains only nodes with values _greater than_ node's value.
 * - All subtrees are valid binary search trees.
 * Note most definitions of BST will be lte or gte comparisons.
 *
 * @example
 * Input: [2, 1, 3]
 *    2
 *   / \
 *  1   3
 * Output: true
 *
 * @example
 * Input: [5, 1, 4, null, null, 3, 6]
 *   5
 *  / \
 * 1   4
 *    / \
 *   3   6
 * Output: false
 *
 * Analsysis:
 * N is number of nodes in tree.
 * Time: O(N), all nodes are checked
 * Space: O(N) worst case for the queue
 *
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
module.exports = function isValidBST( root ) {
  if ( !root ) {
    return true;
  }

  const queue = [new Bound( root, -Infinity, Infinity )];

  while ( queue.length ) {
    const { node, lower, upper } = queue.shift();
    if ( node.val <= lower || node.val >= upper ) {
      return false;
    }
    node.left && queue.push( new Bound( node.left, upper, node.val ) );
    node.right && queue.push( new Bound( node.right, node.val, upper ) );
  }

  return true;
};

function Bound( node, lower, upper ) {
  this.node = node;
  this.lower = lower;
  this.upper = upper;
}
