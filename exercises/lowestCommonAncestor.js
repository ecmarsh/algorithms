/**
 * @=lc id=236 lang=javascript tag=tree,btree,lca
 *
 * [236] Lowest Common Ancestor of a Binary Tree
 *
 * Given a binary tree, find the lowest common ancestor (LCA)
 * of two given nodes in the tree.
 *
 * According to the definition of LCA on Wikipedia:
 * “The lowest common ancestor is defined between two nodes p and q
 *  as the lowest node in T that has both p and q as descendants
 *  (where we allow a node to be a descendant of itself).”
 *
 * @constraints
 * - All of the nodes' values will be unique.
 * - p and q are different and both values will exist in the tree.
 *
 * @examples
 * Given root = [3,5,1,6,2,0,8,null,null,7,4]
 *
 *             3
 *            / \
 *          5    1
 *        /  \  / \
 *       6   2 0   8
 *          / \
 *         7   4
 *
 * Input: p=5, q=1
 * Output: 3
 * Explanation: LCA of nodes 5 and 1 is 3
 *
 * Input: p=5, q=4
 * Output: 5
 * Explanation: LCA is 5 since a node can be a descendent of itself according to def.
 *
 *
 * @complexity
 * Time: O(n) each node explored once.
 * Space: O(h) for stack space.
 * Note the similar structure to a recursive postorder traversal.
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
module.exports = function lowestCommonAncestor( root, p, q ) {
  // base case: no root
  if ( !root ) return;
  // case 1: root is target, since in subtree, return current
  if ( root === p || root === q ) {
    return root;
  }
  // search left and right subtrees
  const left = lowestCommonAncestor( root.left, p, q );
  const right = lowestCommonAncestor( root.right, p, q );
  // case 2: current root is lca if marks split between left and right
  if ( left && right ) {
    return root;
  }
  // case 3: both in left or both in right, return one with both
  return left || right;
};

/*

Applications of LCA computation:
- rendering web pages and computing CSS applicable to particular DOM element

LCA of any two nodes in btree is node furthest from root
that is an ancestor of both nodes.

Brute force: see if p, q are in diff immediate subtreees or if p, q is the root.
Otherwise if both in left or both in right, recurse on that subtree accordingly.
Worst case is n^2 when both nodes at bottom of tree on a skewed tree.

Improvement: eliminate multiple passes of the nodes by calculating LCA directly in recursion.

recursion returns number of matches for p, q in subtree (0,1,2)
if both p, q are present (nodes=2) -> returns their LCA directly:
    base case: no tree -> (0 nodes, No LCA)

    Recursive case 1: both nodes in left or both nodes in right
    recurse on left:
        if 2 nodes -> return left result's LCA
    recurse on right:
        if 2 nodes -> return right result's LCA

    Recursive case 2:
        1 on left, 1 on right (or 1 of either is the root) -> return current as LCA

    Default:
        return (left+right+root, no common ancestor)

*/

