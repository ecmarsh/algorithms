/**
 * @lc id=105 lang=javascript tag=btree,binarytree,dfs
 *
 * [105] Construct A Binary Tree from Inorder and Preorder Traversal
 *
 * Given preorder and inorder traversal of a tree, construct the binary tree.
 *
 * @constraints
 * - Duplicate values do not exist in the tree.
 *
 * @example
 * Input:
 *  preorder = [3, 9, 20, 15, 7]
 *  inorder  = [9, 3, 15, 20, 7]
 * Output:
 *      3
 *     / \
 *    9  20
 *      /  \
 *     15  17
 *
 * @complexity
 * Time: O(n)
 *  - Master's thereom: T(n) = aT(b/N) + O(N^d)
 *    - We divide into two subtrees, so a=2
 *    - Size of each subproblem after division is 1/2, so b=2
 *    - Division takes constaint time, so d=0
 *  - Case 1: logb(a) > d so O(N^(logb(a))) = O(N^1) = O(N)
 * Space: O(n): Stack space reaches O(H), but map stores entire tree.
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode( val ) {
  this.val = val;
  this.left = this.right = null;
}

/**
  * @param {number[]} preorder
  * @param {number[]} inorder
  * @return {TreeNode}
  */
module.exports = function buildTree( preorder, inorder ) {
  // PREORDER: NLR  |  INORDER: LNR

  // Obtain the root from the preorder traversal at index 0.
  // Use the root to split the inorder list into left and right subtrees.
  // Repeat the process for the left and right subtrees to build.

  // Current index of the root in preorder
  let idxRoot = 0;
  // Map inorder values to its index
  // [val:index]
  const idxMap = inorder.reduce( ( map, val, i ) => {
    map.set( val, i );
    return map;
  }, new Map() );

  // Use left and right idx of inorder traversal
  // to determine when reached end of a subtree
  const buildSubtree = ( idxLeft, idxRight ) => {
    // Termination: no elements to construct subtrees
    if ( idxLeft === idxRight ) return null;

    // Use the current rootIndex to build root node
    const rootVal = preorder[idxRoot];
    const root = new TreeNode( rootVal );

    // Use the root to split
    const idxInorder = idxMap.get( rootVal );

    // Move to the next root node (N->L)
    idxRoot += 1;
    // Build the left subtree, which increments rootIdx to right
    root.left = buildSubtree( idxLeft, idxInorder );
    // Build the right subtree, which increments rootIdx to next root
    root.right = buildSubtree( idxInorder + 1, idxRight );

    return root;
  };

  return buildSubtree( 0, inorder.length );
};
