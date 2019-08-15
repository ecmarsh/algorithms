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
  if ( !root ) {
    return 0;
  }

  let depth = 0;
  const queue = [root];

  // Do Level-Order Traversal until max-depth.
  while ( queue.length ) {
    depth++;

    // We need to empty the queue since one
    // iteration of the while loop is a level.
    // If !left or !right in iteration, we've reached the end.
    for ( let i = 0; i < queue.length; i++ ) {
      const node = queue.shift();

      node.left && queue.push( node.left );
      node.right && queue.push( node.right );
    }
  }

  return depth;
};
