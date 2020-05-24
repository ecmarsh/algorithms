/**
 * @lc id=1008 lang=javascript tag=bst,preorder
 *
 * [1008] Construct Binary Search Tree from Preorder Traversal
 *
 * Return the root node of a binary search tree that matches
 * the given preorder traversal.
 *
 * @constraints
 * - Guaranteed a valid tree can be constructed from preorder.
 * - 1 <= preorder.length <= 100
 * - 1 <= preorder[i] <= 10^8
 * - The values of preorder are distinct.
 *
 * @example
 * Input: [8,5,1,7,10,12]
 * Output: (inorder) -> [8,5,10,1,7,null,12]
 *        8
 *      /   \
 *     5     10
 *    / \     \
 *   1   7     12
 *
 * @complexity
 * Let N = number of nodes / length of preorder
 * Time: O(N) -> we need to loop through preorder once
 * Space: O(N) for tree
 *      - Note if disregarding output, account for stackspace
 *      -> worst case if all on left side, O(log N) average/balanced
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode( val, left, right ) {
  this.val = ( val===undefined ? 0 : val );
  this.left = ( left===undefined ? null : left );
  this.right = ( right===undefined ? null : right );
}

/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
module.exports = function bstFromPreorder( preorder ) {
  let i = 0;

  const root = new TreeNode( preorder[i++] );
  const stack = [root];

  // Start at 1, since we've already assigned used root node
  for ( let i = 1; i < preorder.length; i++ ) {
    // Parent is top of stack, child is current val in array.
    let parent = stack[stack.length-1];
    const child = new TreeNode( preorder[i] );

    // Move back up the tree until we find a node where the
    // value is less than the child.
    // If child is greater, that means the stack is empty,
    // and we're done with the left side of that subtree,
    // and begin traversing right.
    while ( stack.length && child.val > stack[stack.length-1].val ) {
      parent = stack.pop();
    }

    // Follow BST logic to create parent-child link
    if ( child.val < parent.val ) {
      parent.left = child;
    } else {
      parent.right = child;
    }

    // Add child to stack
    stack.push( child );
  }

  return root;
};

/*
  PREORDER: N L R
  preorder = [];
  const traverse = (node) => {
      if (!node) return;
      preorder.push(node.val);
      traverse(node.left);
      traverse(node.right);
  }

  1. Root first node -> push it to stack
  2. Loop through preorder array
      - Top of stack is parent and arr[i] is child
      - Pop stack while child is smaller than parent
      - Compare values
          - node.val < child.val: node.right = child
          - else: node.left = child
      - Push child node on to stack

  */
