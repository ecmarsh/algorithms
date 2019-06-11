/**
 * Given a binary tree, count the number of uni-value subtrees.
 * A Uni-value subtree means all nodes of the subtree have the same value.
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 *
 * Example:
 * Input: root = [5,1,5,5,5,null,5]
 * Output: 4
 *
 * @param {TreeNode} root
 * @return {number}
 */

module.exports = function countUnivalSubtrees( root ) {
  let count = 0;
  if ( !root ) {return count;}

  const isUnival = ( root, val ) => {
    // Base case
    if ( !root ) {return true;}

    // Constructors
    const [left, right] = [isUnival( root.left, root.val ), isUnival( root.right, root.val )];
    if ( left && right ) {
      count++;
      return val == root.val;
    }
    return false;
  };

  // Initialize search
  isUnival( root );

  return count;
};
