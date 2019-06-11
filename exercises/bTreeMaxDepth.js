/**
 * Given a binary tree, find its maximum depth.
 * The maximum depth is the number of nodes along the longest
 * path from the root node down to the farthest leaf node.
 * Example:
 * Given binary tree [3,9,20,null,null,15,7],
 * Max depth is 3
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
 * @return {number}
 */

module.exports = function maxDepth( root ) {

  const queue = [];
  let depth = 0; // depth counter

  // Handle no tree
  if ( !root ) { return depth; }

  // Init traversal
  queue.push( root );

  // level order traversal
  while ( queue.length ) {
    const size = queue.length;
    depth++;

    for ( let i = 0; i < size; i++ ) {
      const currVtx = queue.shift();
      if ( currVtx.left ) { queue.push( currVtx.left ); }
      if ( currVtx.right ) { queue.push( currVtx.right ); }
    }
  }

  return depth;
};
