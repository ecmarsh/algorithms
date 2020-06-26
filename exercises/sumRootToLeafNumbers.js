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

  // Idea of Morris algorithm is to set temporarily links between
  // the current node and its predecessor. (predecessor.right = root)
  // If there's no link, set it and go to left subtree
  // If there is a link, break it and go to the right subtree
  // If there's no left, then go straight to the right subtree

  let globalSum = 0;
  let localSum = 0;

  while ( root ) {
    // If left child, compute predecessor
    // No link (predessor.right = root) -> set it
    // Is Link (predessor.right = root) -> break it

    if ( root.left ) {
      // Predecessor is one step to left, then dfs right
      let predecessor = root.left;
      let level = 1;

      while ( predecessor.right && predecessor.right !== root ) {
        predecessor = predecessor.right;
        // Keep track of level to backtrack up and keep track of sum
        // and synchronize base 10 multiplier of sum.
        level += 1;
      }

      if ( !predecessor.right ) {
        // Set link (predecessor.right = root), then explore left subtree
        localSum *= 10;
        localSum += root.val;
        predecessor.right = root;
        root = root.left;
      } else {
        // Break link, then once its broken, change subtree and go right.
        // If on leaf, update sum
        if ( !predecessor.left ) {
          globalSum += localSum;
        }
        // Now that this part of tree is explored, backtrack to root
        for ( let i = 0; i < level; i++ ) {
          localSum = Math.floor( localSum / 10 );
        }
        predecessor.right = null;
        root = root.right;
      }
    } else {
      // There is no left child, so just go right
      localSum *= 10;
      localSum += root.val;
      // If you're on the leaf, update the sum
      if ( !root.right ) {
        globalSum += localSum;
      }
      root = root.right;
    }
  }

  return globalSum;
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
