/**
 * @=lc id=572 lang=javascript tag=tree,btree
 *
 * [572] Subtree of Another Tree
 *
 * Given two non-empty binary trees s and t, check whether tree t has exactly
 * the same structure and node values with a subtree of s.
 * A subtree of s is a tree consists of a node in s and all of this node's descendants.
 * The tree s could also be considered as a subtree of itself.
 *
 * @example
 * Given tree s:
 *      3
 *     / \
 *    4   5
 *   / \
 *  1   2
 * Given tree t:
 *    4
 *   / \
 *  1   2
 * Return true, because t has the same structure and node values with a subtree of s.
 *
 * @example
 * Given tree s:
 *      3
 *     / \
 *    4   5
 *   / \
 *  1   2
 *     /
 *    0
 * Given tree t:
 *    4
 *   / \
 *  1   2
 * Return false.
 *
 *
 * @complexity
 * Time: O(s*t) if s and t are same except one leaf value.
 * Space: O(s*t) queue and is equal stack space check.
 * Note this could be reduced to O(s+t) using Merkle hashing (advanced).
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
module.exports = function isSubtree( s, t ) {
  if ( !s || !t ) return false;

  const queue = [s];
  while ( queue.length ) {
    const len = queue.length;
    for ( let i = 0; i < len; i++ ) {
      const node = queue.shift();
      if ( node.val === t.val && isEqual( node, t ) ) {
        return true;
      }
      node.left && queue.push( node.left );
      node.right && queue.push( node.right );
    }
  }

  return false;
};

// Trees are equal if root values are the same and left and right are equal.
const isEqual = function( s, t ) {
  if ( !s && !t ) return true;
  if ( ( s && !t ) || ( t && !s ) ) return false;
  if ( s.val != t.val ) return false;
  const isLeftEqual = !s.left && !t.left || isEqual( s.left, t.left );
  const isRightEqual = !s.right && !t.right || isEqual( s.right, t.right );
  return isLeftEqual && isRightEqual;
};
