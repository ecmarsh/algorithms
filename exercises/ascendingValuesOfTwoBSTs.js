/**
 * @lc id=1305 lang=javascript tag=bst,inorder
 *
 * [1305] All Elements in Two Binary Search Trees
 *
 * Given two binary search trees, `root1` and `root2`,
 * return a list containing _all of the integers_ from _both trees_,
 * sorted in ascending order.
 *
 * @constraints
 *  - Each tree has at most 5000 nodes.
 *  - Each node's value is between [-10^5, 10^5].
 *
 *
 * @example
 * Input: root1=[2,1,4], root2=[1,0,3]
 *                2        1
 *               / \      / \
 *              1   4    0   3
 * Output: [0, 1, 1, 2, 3, 4]
 *
 * @example
 * Input: root1=[0,-10,10], root2=[5,1,7,0,2]
 * Output: [-10, 0, 0, 1, 2, 5, 7, 10]
 *
 * @example
 * Input: root1=[0,-10,10], root2=[]
 * Output: [0,-10,10]
 *
 * @example
 * Input: root1=[1, null, 8], root2=[8, 1]
 *                   1            8
 *                    \          /
 *                     8        1
 * Output: [1,1,8,8]
 *
 *
 * @complexity
 * Let: N1,N2 = nodes in bst1,2 H1,H2 = height of each BST.
 * Time: O(N1+N2) to traverse every node of the tree.
 * Space: stacks are O(H1+H2), output vals are O(N1+N2).
 */


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
module.exports = function( root1, root2 ) {
  if ( !root1 || !root2 ) {
    return inorder( root1 || root2 );
  }

  const stack1 = [];
  const stack2 = [];
  const values = [];

  // Traverse left as possible, adding roots to stack
  root1 = traverseLeft( root1, stack1 );
  root2 = traverseLeft( root2, stack2 );

  while ( root1 || root2 || stack1.length || stack2.length ) {
    if ( !root1 && stack1.length ) root1 = stack1.pop();
    if ( !root2 && stack2.length ) root2 = stack2.pop();

    // If no root1 or root2, add the other to values
    // Otherwise, compare the values and add the lower one
    if ( !root1 ) {
      values.push( root2.val );
      root2 = traverseLeft( root2.right, stack2 );
    }
    else if ( !root2 ) {
      values.push( root1.val );
      root1 = traverseLeft( root1.right, stack1 );
    }
    else {
      if ( root1.val === root2.val ) {
        values.push( root1.val );
        values.push( root2.val );
        root1 = traverseLeft( root1.right, stack1 );
        root2 = traverseLeft( root2.right, stack2 );
      }
      else if ( root1.val < root2.val ) {
        values.push( root1.val );
        root1 = traverseLeft( root1.right, stack1 );
      }
      else {
        values.push( root2.val );
        root2 = traverseLeft( root2.right, stack2 );
      }
    }
  }

  return values;
};

function traverseLeft( root, stack ) {
  while ( root && root.left ) {
    stack.push( root );
    root = root.left;
  }
  return root;
}

function inorder( root ) {
  if ( !root ) return [];
  const values = [];
  const traverse = ( root ) => {
    root.left && traverse( root.left );
    values.push( root.val );
    root.right && traverse( root.right );
  };
  traverse( root );
  return values;
}
