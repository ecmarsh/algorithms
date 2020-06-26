/**
 * @lc id=129 lang=javascript tag=binarytree,bintree
 *
 * [129] Sum Root to Leaf Numbers
 *
 * Given a binary tree containing digits from 0-9 only,
 * each root-to-leaf path could represent a number.
 *
 * An example is the root-to-leaf path 1->2->3 which represents the number 123.
 *
 * Find the total sum of all root-to-leaf numbers.
 *
 * Note: A leaf is a node with no children.
 *
 * Definition for a binary tree node.
 * ```js
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * ```
 *
 * @example
 * Input: [1,2,3]
 *    1
 *   / \
 *  2   3
 * Output: 25
 * Explanation:
 *  The root-to-leaf path 1->2 represents the number 12.
 *  The root-to-leaf path 1->3 represents the number 13.
 *  Therefore, sum = 12 + 13 = 25.
 *
 * @example
 * Input: [4,9,0,5,1]
 *      4
 *     / \
 *    9   0
 *   / \
 *  5   1
 * Output: 1026
 * Explanation:
 *  The root-to-leaf path 4->9->5 represents the number 495.
 *  The root-to-leaf path 4->9->1 represents the number 491.
 *  The root-to-leaf path 4->0 represents the number 40.
 *  Therefore, sum = 495 + 491 + 40 = 1026.
 *
 * @complexity See corresponding solutions
 */

/**
 * Morris Preorder Traversal Solution
 * @param {TreeNode} root
 * @return {number}
 * @complexity
 * Time: O(N)
 * Space: O(1)
 */
module.exports.morrisPreorder = function sumRootToLeafMorris( root ) {
};

/**
 * DFS Recursive Solution
 * NOTE: Could also do this iteratively, with same complexity.
 * @param {TreeNode} root
 * @return {number}
 * @complexity
 * Time: O(N) -> each node traversed once
 * Space: O(H) -> recursion stack, log n for balanced, n worst case spindly
 */
module.exports.dfsRecursive = function sumRootToLeafDFSRecursive( root ) {
  if ( !root ) return 0;

  let globalSum = 0;

  const addNode = ( node, localSum ) => {
    // Update the local path sum
    localSum *= 10;
    localSum += node.val;

    const hasLeft = !!node.left;
    const hasRight = !!node.right;

    // If it's a leaf, add it to global sum, and no need to continue
    if ( !hasLeft && !hasRight ) {
      globalSum += localSum;
      return;
    }

    if ( hasLeft ) {
      addNode( node.left, localSum );
    }

    if ( hasRight ) {
      addNode( node.right, localSum );
    }
  };

  // Initialize recursion function
  addNode( root, 0 );

  return globalSum;
};
