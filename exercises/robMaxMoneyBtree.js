/**
 * House Robber III
 *
 * The thief has found himself a new place for his thievery again.
 * There is only one entrance to this area, called the "root."
 * Besides the root, each house has one and only one parent house.
 * After a tour, the smart thief realized that "all houses in this
 * place forms a _binary tree_". It will automatically contact the police
 * if two directly-linked houses were broken into on the same night.
 *
 * Determine the maximum amount of money the thief can rob
 * tonight without alerting the police.
 *
 * @example
 * Input: [3,2,3,null,3,null,1]
 *
 *     *3*
 *     / \
 *    2   3
 *     \   \
 *     *3* *1*
 *
 * Output: 7
 * Explanation: Max amount is 3 + 3 + 1 = 7
 *
 * @example
 * Input: [2,1,3,null,4]
 *
 * 	    2
 *     / \
 *    1  *3*
 *     \
 *     *4*
 *
 * Output: 9
 * Explanation: Max money is 4+3=7
 *
 * Definition for a binary tree node:
 *  function TreeNode(val) {
 *	  this.val = val;
 *    this.left = this.right = null;
 *  }
 *
 *
 * Complexity:
 * V is nodes in tree.
 * Time: O(V), we visit each node to calculate options.
 * Space: O(V) for:
 *       - Each result for each V at any time is O(2)
 *       - Recursion goes all the way to leaf with left&right nodes -> O(V)
 *       - Space in each frame * total frames = O(2V) = O(V)
 */

/**
 * Greedy solution: see explanation/alternatives below.
 * @param {TreeNode} root
 * @return {number} Max amount of money that can be robbed.
 */
module.exports = function robMaxMoneyBtree( root ) {
  const rootOptions = getOptions( root );
  return Math.max( rootOptions.rob, rootOptions.skip );
};

/**
 * Calculates maximum amount of money for robbing node root
 * or for not robbing at node, root.
 * @param {TreeNode} root
 * @return {RobOptions}
 */
function getOptions( root ) {
  if ( root === null ) {
    return new RobOptions( 0, 0 );
  }

  const left = getOptions( root.left );
  const right = getOptions( root.right );

  // If we skip the root, then we're free to take left, or right
  // If either child calculates its better to skip (eg for example 2 in stment)
  // then we need to take that instead, so just take max of two opts for L/R
  const maxIfSkip = Math.max( left.rob, left.skip ) + Math.max( right.rob, right.skip );
  // If we take root, we have to skip both left and right child nodes
  const maxIfRob = root.val + left.skip + right.skip;

  return new RobOptions( maxIfRob, maxIfSkip );
}

/**
 * Stores max if robbed or not robbed at each node.
 * @constructor
 * @param {number} rob
 * @param {number} skip
 */
function RobOptions( rob, skip ) {
  this.rob = rob;
  this.skip = skip;
}

/*

BRUTE FORCE: treat it as same as house robbers I
At each node, we can either rob cur node + grand children:
1. cur, cur.left.left, cur.left.right, cur.right.left, cur.left.right, or
2. skip cur and grandchildren and just do children: cur.left + cur.right

function rob(root) {
    if (root === null) {
        return 0;
    }
    var val = 0;
    if (root.left !== null) {
        val += rob(root.left.left) + rob(root.left.right);
    }
    if (root.right !== null) {
        val += rob(root.right.left) + rob(root.right.right);
    }
    return Math.max(val + root.val, rob(root.left) + rob(root.right));
}

MEMOIZE: Cache overlaping results from brute force.
When we calculate the child (left, right), that also
calculates its grandchildren, so we are calculating each node twice.
Whenever we calculate the max at a certain node, store the max money there.

function _rob(root) {
    var map = new Map();
    var _rob = (root) => {
        if (root === null) {
            return 0;
        }
        if (map.has(root)) {
            return map.get(root);
        }
        var val = 0;
        if (root.left !== null) {
            val += _rob(root.left.left) + _rob(root.left.right);
        }
        if (root.right !== null) {
            val += _rob(root.right.left) + _rob(root.right.right);
        }
        var max = Math.max(val + root.val, _rob(root.left) + _rob(root.right));
        map.set(root, max);

        return max;
    };
    return _rob(root);
};

GREEDY: Solution Implemented
In above solution, we are storing results for the entire tree.
What this actually comes down to is determining amount if we rob it or skip it.
If we rob it, we can't take the children, but we factor in grandchildren.
If we skip it, then we are free to take the left and right greatest, whatever that may be (skip or keep).
So at each node, all we need to do is determine the max if skipped or kept.
And at the root, this will be the same.

 */
