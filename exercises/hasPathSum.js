const isNull = require( 'loadsh/isNull' );

/**
 * Check if a given tree has a walk
 * from root to leaf that equals the target sum
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 *
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */

// Use DFS + recursion
module.exports = function hasPathSum( root, sum ) {
  if ( !root ) { return false; }

  sum -= root.val;
  if ( sum === 0 && isLeaf( root ) ) { return true; }
  return hasPathSum( root.left, sum ) || hasPathSum( root.right, sum );


  // Helper to determine if leaf
  function isLeaf( root ) {
    return isNull( root.left ) && isNull( root.right );
  }
};
