/**
 * Max Level Sum
 * _Weekly Contest 150 Submission_
 *
 * Given the root of a binary tree, the level of its root is 1,
 * the level of its children is 2, and so on.
 * Return the smallest level X such that
 * the sum of all the values of nodes at level X is maximal.
 *
 * @example
 * Input: [1,7,0,7,-8,null,null] or
 *     1
 *    / \
 *   7   0
 *  / \
 * 7  -8
 *
 * Output: 2
 * Explanation:
 * Level 1 sum = 1.
 * Level 2 sum = 7 + 0 = 7.
 * Level 3 sum = 7 + -8 = -1.
 * The maximum level sum is 7, so return its level, 2.
 *
 * Analysis:
 * Time: O(n) To explore every node at each level.
 * Space: O(max(levelNodes)) The queue which holds a level.
 *
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
 * @return {number}
 */
module.exports = function maxLevelSum( root ) {
  let level = 0,
    levelWithMax = 0,
    max = -Infinity;

  const queue = [[root]];

  while ( queue.length ) {
    let sum = 0;
    const levelNodes = queue.shift(),
      nextLevelNodes = [];

    for ( const { val, left, right } of levelNodes ) {
      sum += val;
      left && nextLevelNodes.push( left );
      right && nextLevelNodes.push( right );
    }

    level++;

    if ( sum > max ) {
      max  = sum;
      levelWithMax = level;
    }

    nextLevelNodes.length && queue.push( nextLevelNodes );
  }

  return levelWithMax;
};
