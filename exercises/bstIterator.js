/**
 * Binary Search Tree Iterator
 *
 * Implement an iterator over a binary search tree (BST).
 * Your iterator will be initialized with the root node of a BST.
 *
 * Calling next() should return the next smallest number in the BST.
 *
 *
 * @example
 *    7
 *  /   \
 * 3     15
 *      / \
 *     9   20
 *
 * BSTIterator iterator = new BSTIterator(root);
 * iterator.next();    // return 3
 * iterator.next();    // return 7
 * iterator.hasNext(); // return true
 * iterator.next();    // return 9
 * iterator.hasNext(); // return true
 * iterator.next();    // return 15
 * iterator.hasNext(); // return true
 * iterator.next();    // return 20
 * iterator.hasNext(); // return false
 *
 * **Note:**
 * 1. `next()` and `hasNext()` should run in average O(1) time
 *     and use **O(h) memory**, where _h_ is the height of the tree.
 * 2. You may assume that `next()` call will always be valid,
 *    that is, there will be at least a next smallest number
 *    in the BST when next() is called.
 *
 * **Analysis:**
 * If we did not have to keep memory to O(h), we could do a
 * simple in-order or out order search to get items and just
 * return them until no more. O(n) space and O(n) time for construction.
 * But in order to keep it to O(h), we start with just the left halfs.
 * When a node is called, we take the right half of that node and
 * traverse its lefts, if any.
 * Although sometimes traversal requires extra time, next calls will still
 * be O(1) amortized:
 *  - Each node gets pushed and popped exactly once in `next()`
 *   when iterating over all N nodes.
 * - That comes out to 2N * O(1) over N calls to next(),
 *   making it O(1) on average, or O(1) amortized.
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
 */
function BSTIterator( root ) {
  this.stack = [];
  this.traverseLeft( root );
}

/**
 * DFS left nodes.
 * @param {TreeNode} root
 */
BSTIterator.prototype.traverseLeft = function( root ) {
  if ( !root ) return;
  this.stack.push( root );
  root.left && this.traverseLeft( root.left );
};

/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function() {
  const next = this.stack.pop();
  next.right && this.traverseLeft( next.right );
  return next.val;
};

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
  return !!this.stack.length;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

module.exports = BSTIterator;
