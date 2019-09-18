/**
 * Inorder Successor in BST (Next Greatest Val)
 * Given a binary search tree and a node in it,
 * find the in-order successor of that node in the BST.
 *
 * The successor of a node p is the node with the smallest key greater than p.val.
 *
 * Notes:
 * 1. If the given node has no-in order successor in the tree, return `null`.
 * 2. It is guaranteed that the values of the tree are unique.
 *
 * @example
 * Input: p=1, [2,1,3]=
 *     2
 *    / \
 *   1   3
 * Output: 2
 * Explanation: 1's in-order successor node is 2. Note p and return is TreeNode.
 *
 * @example
 * Input: p=6
 *         5
 *        / \
 *       3   6
 *      / \
 *     2   4
 *    /
 *   1
 * Output: null
 * Explanation: There is no next greatest of p, so return null.
 *
 *
 * Analysis:
 * H is height of tree
 * Time: O(H) worst case. Once successor found, can be traversed all the way.
 * Space: O(1)
 *
 */

/**
 * Definition for a BST node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
module.exports = function bstSuccessor( root, p ) {
  if ( !root || !p ) {
    return null;
  }

  let cur = root;
  let next = null; // Store most recent successor

  /**
   * Searching for next greatest value of LEFT->ROOT->RIGHT
   * - Successor of LEFT is ROOT
   * - Successor of ROOT is RIGHT
   * - Successor of RIGHT is ROOT.ROOT
   */
  while ( cur ) {
    /**
     * Since next of left is root, update most recent successor as root.
     * If p is root (and next is right), next will not be updated again
     * since after traversing left, no other values will meet cur > p.
     */
    if ( cur.val > p.val ) {
      next = cur;
      cur = cur.left;
    }
    else {
      /** Don't update next since successor of right is root's root. */
      cur = cur.right;
    }
  }

  return next;
};
