/**
 * Unique Binary Search Trees II
 *
 * Given an integer n, generate all structurally unique
 * Binary Search Trees that store values 1...n.
 *
 * @example
 * Input: 3
 * Output:
 * [
 *   [1, null, 3, 2],
 *   [3, 2, null, 1],
 *   [3, 1, null, null, 2],
 *   [2, 1, 3],
 *   [1, null, 2, 3]
 * ]
 * Explanation: Output corresponds to preorder traversal of BSTs.
 *
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode( val ) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
module.exports = function generateTrees( n ) {
  if ( !n ) {
    return [];
  }

  if ( n === 1 ) {
    return [new TreeNode( n )];
  }

  return ( function _generateTrees( start, end ) {
    if ( start > end ) {
      return [null];
    }

    const allTrees = [];

    // Check each root and generate
    // possible left/right subtree combinations
    // with remaining nums for given root.
    for ( let i = start; i <= end; i++ ) {
      const leftSubtrees = _generateTrees( start, i-1 );
      const rightSubtrees = _generateTrees( i+1, end );

      // Connect left and right trees to current root
      for ( const left of leftSubtrees ) {
        for ( const right of rightSubtrees ) {
          const root = new TreeNode( i );

          root.left = left;
          root.right = right;

          allTrees.push( root );
        }
      }
    }

    return allTrees;
  } )( 1, n );
};
