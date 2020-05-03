/**
 * @lc id=1430 lang=javascript tag=btree
 *
 * [1430] Check If Is a Valid Sequence from Root to Leaves Path in a Binary Tree
 *
 * Given a binary tree where each path going from the root to any leaf form
 * a valid sequence, check if a given array is valid sequence in tree.
 *
 * We get the given string from the concatenation of an array of integers
 * arr and the concatenation of all values of the nodes along a path
 * results in a sequence in the given binary tree.
 *
 * @constraints
 * - 1 <= arr.length <= 5000
 * - 0 <= arr[i] <= 9
 * - Each node's value is between [0 - 9].
 *
 * @example
 * Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,0,1]
 *     *0*
 *    /    \
 *   *1*   0
 *  /   \    \
 * *0*    1   0
 *  \     / \
 *   *1*  0  0
 * Output: true
 * Explanation:
 * The path 0 -> 1 -> 0 -> 1 is a valid sequence (green color in the figure).
 * Other valid sequences are:
 *   0 -> 1 -> 1 -> 0
 *   0 -> 0 -> 0
 *
 * @example
 * Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,0,1]
 * Output: false
 * Explanation: The path 0 -> 0 -> 1 does not exist, therefore it is not even a sequence.
 *
 * @example
 * Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,1]
 * Output: false
 * Explanation: The path 0 -> 1 -> 1 is a sequence, but it is not a valid sequence.
 *
 * @complexity
 * Time: O(N), where N is nodes in tree for DFS.
 * Space: O(H) DFS Stack space O(log n) balanced O(n) worst case for skewed or chubby tree.
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} arr
 * @return {boolean}
 */
module.exports = function isValidSequence( root, arr, i = 0 ) {
  // Termination:
  // - root is null
  // - path is longer than array
  // - the value doesnt match the path
  if ( !root || i >= arr.length || root.val !== arr[i] ) {
    return false;
  }

  // If its a leaf, its valid if its the last item in the array too
  if ( !root.left && !root.right ) {
    return i === arr.length - 1;
  }

  // Continue checking left and right nodes
  return isValidSequence( root.left, arr, i + 1 ) || isValidSequence( root.right, arr, i + 1 );
};
