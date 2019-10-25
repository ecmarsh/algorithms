/**
 * @=lc id=437 lang=javascript tag=tree
 *
 * [437] Path Sums III
 *
 * You are given a binary tree in which each node contains an integer value.
 *
 * Find the number of paths that sum to a given value.
 *
 * The path does not need to start or end at the root or a leaf, but it
 * must go downwards (traveling only from parent nodes to child nodes).
 *
 * The tree has no more than 1000 nodes, whose values are between 1e-9 to 1e9.
 *
 * @example
 * Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
 *
 * 	      10
 * 	     /  \
 * 	    5   -3
 * 	   / \    \
 * 	  3   2   11
 * 	 / \   \
 * 	3  -2   1
 *
 * Output: 3
 * Explanation: The paths that sum to 8 are:
 * 		1.  5 -> 3
 * 		2.  5 -> 2 -> 1
 * 		3. -3 -> 11
 *
 * @complexity
 * Time: O(n), where n is nodes in tree. Each node visited once.
 * Space: O(n) using map and worst case if spindly tree all ll positive values.
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
 * @param {number} target
 * @return {number}
 */
module.exports = function pathSums( root, target ) {
  if ( !root ) return 0;

  const sumCounts = [1]; // one way to get to zero sum
  let total = 0;

  const dfs = ( root, sum ) => {
    sum += root.val;
    // add total ways to get to sum from path
    total += sumCounts[sum-target] || 0;
    // count sum in path for subtrees
    sumCounts[sum] = sumCounts[sum] + 1 || 1;
    // traverse subtrees
    root.left && dfs( root.left, sum );
    root.right && dfs( root.right, sum );
    // remove count for non-subtree traversals
    sumCounts[sum]--;
  };

  dfs( root, 0 );

  return total;
};

