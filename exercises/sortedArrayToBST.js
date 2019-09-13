/**
 * Convert Sorted Array To Binary Search Tree
 *
 * Given an array where elements are sorted in ascending order,
 * convert it to a height balanced BST.
 *
 * For this problem, a height-balanced binary tree is defined as a binary tree
 * where the depth of any two subtrees never differ by more than 1.
 *
 * @example
 * Given the sorted array: [-10,-3,0,5,9],
 * One possible answer is: [0,-3,9,-10,null,5], representing:
 *     0
 *    / \
 *  -3   9
 *  /   /
 * -10  5
 *
 * Analysis:
 * N is len(nums)
 * Time: O(N)
 * Space: O(log N) <-- Implicit stack space
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
module.exports = function sortedArrayToBST( nums, left, right ) {
  // Edge case
  if ( !nums || !nums.length ) return null;

  // Set default params for first call
  if ( left === void 0 ) left = 0;
  if ( right === void 0 ) right = nums.length - 1;

  // Base case
  if ( left > right ) return null;

  // Root should be middle value
  const mid = ( left + right + 1 ) >> 1;
  const root = new TreeNode( nums[mid] );

  // Construct left half with all values smaller
  root.left = sortedArrayToBST( nums, left, mid - 1 );
  // Construct right half with all values greater
  root.right = sortedArrayToBST( nums, mid + 1, right );

  return root;
};
