/**
 * Diameter of Binary Tree
 *
 * Given a binary tree, you need to compute the length of the diameter tree.
 * The diameter of a binary tree is the length of the longest path between
 * any two nodes in a tree. This path may or may not pass through the root.
 *
 * Definition for a binary tree node.
 *  function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 *  }
 *
 * @example
 * Input: Root of binary tree:
 *        1
 *       / \
 *      2   3
 *     / \
 *    4   5
 * Output: 3
 * Explanation: 3 is length of path [4,2,1,3] or [5,2,1,3]
 *
 * Note the length of the path between two nodes is represented
 * by the number of edges between them.
 *
 *
 * Complexity:
 * V is nodes in tree, H is height of tree
 * Time: O(v) -> every node is traversed
 * Space: O(h) stack space ~ O(logV) dense, O(v) spindly
 */

/**
 * @param {TreeNode} root Root node of binary tree
 * @returns {number} Diameter of binary tree
 */
module.exports = function diameterOfBTree( root ) {
  let diameter = 0;

  const maxDepth = ( root ) => {
    if ( root == null ) {
      return 0;
    }
    const left = maxDepth( root.left );
    const right = maxDepth( root.right );
    // For diameter, we want edges between (where E is V-1)
    diameter = Math.max( diameter, left + right );
    // But depth is number of vertices, so include node (+1)
    return Math.max( left, right ) + 1;
  };

  maxDepth( root );

  return diameter;
};
