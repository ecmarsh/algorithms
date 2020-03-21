/**
 * @lc id=226 lang=javascript tag=btree,bintree
 *
 * [226] Invert Binary Tree
 *
 * Invert a binary tree and return the inverted tree root node.
 *
 * Definition for a binary tree node:
 * ```js
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 * ```
 *
 *
 * @example
 * Input:
 *       4
 *     /   \
 *    2     7
 *   / \   / \
 *  1   3 6   9
 * Output:
 *       4
 *     /   \
 *    7     2
 *   / \   / \
 *  9   6 3   1
 */

/**
 * Recursive solution
 * @param {TreeNode} root
 * @return {TreeNode}
 * @complexity
 * Time: O(n) every node must be visited
 * Space: O(h) stack space
 *  - O(log n) if balanced tree. O(n) otherwise.
 */
module.exports = function invertTree( root ) {
  // termination case
  if ( !root ) return root;

  // recursively invert left, then right
  invertTree( root.left );
  invertTree( root.right );

  // inversion: swap the left and right nodes
  const tmp = root.left;
  root.left = root.right;
  root.right = tmp;

  return root;
};

/**
 * DFS Solution
 * @param {TreeNode} root
 * @return {TreeNode}
 * @complexity
 * Time: O(n) - every node visited
 * Space: Same as recurisve but using our own stack.
 */
module.exports.dfs = function invertTree( root ) {
  const stack = [root];

  while ( stack.length ) {
    const n = stack.pop();
    if ( n != null ) {
      [n.left, n.right] = [n.right, n.left];
      stack.push( n.left, n.right );
    }
  }

  return root;
};

/**
 * BFS solution
 * @param {TreeNode} root
 * @return {TreeNode}
 * @complexity
 * Time: Time: O(n) - every node visited
 * Space: O(w) queue length
 *  - O(n) worst case for chubby tree or 1 node
 */
module.exports.bfs = function invertTree( root ) {
  const queue = [root];

  while ( queue.length ) {
    const n = queue.shift();
    if ( n != null ) {
      [n.left, n.right] = [n.right, n.left];
      queue.push( n.left, n.right );
    }
  }

  return root;
};
