/**
 * Binary Tree Vertical Order Traversal (Facebook)
 *
 * Given a binary tree, return the vertical order traversal
 * of its nodes' values. (ie, from **top to bottom**, column by column).
 *
 * If two nodes are in the same row and column,
 * the order should be from **left to right**.
 *
 * @example
 * Input: [3,9,20, null, null, 15, 7] =
 *     3
 *    / \
 *   /   \
 *   9   20
 *       /\
 *      /  \
 *     15   7
 * Output: [
 *  [9],
 *  [3,15],
 *  [20],
 *  [7]
 * ]
 *
 * @example
 * Input: [3,9,8,4,0,1,7,null,null,null,2,5]
 *
 *          3
 *         / \
 *        /   \
 *       9     8
 *       /\   / \
 *      /  \ /   \
 *     4   01    7
 *    /    /\
 *        /  \
 *       5    2 (0's right child is 2 and 1's left child is 5)
 *
 * Output:
 * [
 *   [4],
 *   [9,5],
 *   [3,0,1],
 *   [8,2],
 *   [7]
 * ]
 *
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
 * @return {number[][]}
 */
module.exports = function verticalOrder( root ) {
  if ( !root ) {
    return [];
  }

  let min = 0;
  let max = 0;

  const getBounds = ( cur, x ) => {
    min = Math.min( x, min );
    max = Math.max( x, max );
    cur.left && getBounds( cur.left, x - 1 );
    cur.right && getBounds( cur.right, x + 1 );
  };

  getBounds( root, 0 );

  const width = max - min + 1;
  const traversal = Array( width ).fill( 0 ).map( _ => [] );
  const nodeQueue = [root];
  const colQueue = [0];

  // Level order traversal to get correct top-down, left-right order
  while ( nodeQueue.length ) {
    const node = nodeQueue.shift();
    const col = colQueue.shift();
    traversal[col - min].push( node.val );
    if ( node.left ) {
      nodeQueue.push( node.left );
      colQueue.push( col - 1 );
    }
    if ( node.right ) {
      nodeQueue.push( node.right );
      colQueue.push( col + 1 );
    }
  }

  return traversal;
};
