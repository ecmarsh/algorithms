/**
 * Balanced Binary Tree
 *
 * Given a binary tree, determine if it is height-balanced.
 *
 * See visuals at bottom for examples.
 *
 * Analysis:
 * O(n) Time -> Post order traversal of every node.
 * O(h) Space -> Recursion stack for height of tree.
 */
/*
...Notes...
Height Balanced:
Binary tree where depth difference of L, R subtrees is at most 1.

------------------------------------
Example: [3,9,20,null,null,15,17]

Height=2         3
                / \
Height=1       9   20
                   / \
Height=0         15   17

Left = 1, Right = 0.
|(1-0)| = 1 -> 1 <= 1 -> isBalanced: true

------------------------------------
Example: [1,2,2,3,3,null,null,4,4]

Height=3         1
                / \
Height=2       2   2
              / \
Height=1     3   3
            / \
Height=0   4   4

Left=0, Right=2
|(0-2)| = 2 -> 1 !<= 1 -> isBalanced: false

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
 * @return {boolean}
 */
module.exports = function isBalanced( root ) {
  return checkBalanced( root ).isBalanced;
};

/**
 * Post order traversal (LRN) to check
 * left and right heights, and accordingly,
 * if its left and right heights meet balance requirements.
 */
const checkBalanced = function( node ) {
  // Base case. No node so do -1 from height
  // since parent height will be 1 + subtree height.
  if ( !node ) {
    return new BalanceStatusWithHeight( true, -1 );
  }

  const leftResult = checkBalanced( node.left );
  if ( !leftResult.isBalanced ) {
    return leftResult;
  }

  const rightResult = checkBalanced( node.right );
  if ( !rightResult.isBalanced ) {
    return rightResult;
  }

  const depthDifference = Math.abs( leftResult.height - rightResult.height ),
    isBalanced = depthDifference <= 1,
    maxSubtreeHeight = Math.max( leftResult.height, rightResult.height );

  return new BalanceStatusWithHeight( isBalanced, maxSubtreeHeight + 1 );
};

/** Defines result for a node's subtrees balance check. */
function BalanceStatusWithHeight( isBalanced, height ) {
  this.isBalanced = isBalanced;
  this.height = height;
}

/*

Height Balanced:
Binary tree where depth difference of L, R subtrees is at most 1.

------------------------------------
Example: [3,9,20,null,null,15,17]

Height=2         3
                / \
Height=1       9   20
                   / \
Height=0         15   17

Left = 1, Right = 0.
|(1-0)| = 1 -> 1 <= 1 -> isBalanced: true

------------------------------------
Example: [1,2,2,3,3,null,null,4,4]

Height=3         1
                / \
Height=2       2   2
              / \
Height=1     3   3
            / \
Height=0   4   4

Left=0, Right=2
|(0-2)| = 2 -> 1 !<= 1 -> isBalanced: false

*/

