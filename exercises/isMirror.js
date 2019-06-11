const isNull = require( 'lodash/isNull' );
/**
 *
 * Given a binary tree, check if it is symmetric/mirrored.
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 *
 * @param {TreeNode} root
 * @return {boolean}
 */

module.exports = function isSymmetric( root ) {
  if ( !root ) { return true; }

  const check = ( leftNode, rightNode ) => {
    if ( isNull( leftNode ) && isNull( rightNode ) ) { return true; }
    if ( isNull( leftNode ) || isNull( rightNode ) || leftNode.val !== rightNode.val ) { return false; }
    return check( leftNode.left, rightNode.right ) && check( leftNode.right, rightNode.left );
  };

  return check( root.left, root.right );
};
