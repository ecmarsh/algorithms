/**
 * Serialize and Deserialize Binary Tree
 *
 * Serialization is the process of converting a data structure or object
 * into a sequence of bits so that it can be stored in a file or memory buffer,
 * or transmitted across a network connection link to be
 * reconstructed later in the same or another computer environment.
 *
 * Design an algorithm to serialize and deserialize a binary tree.
 * There is no restriction on how your serialization/deserialization
 * algorithm should work. You just need to ensure that a binary tree
 * can be serialized to a string and this string
 * can be deserialized to the original tree structure.
 *
 * @example
 * You may serialize the following tree:
 *
 *       1
 *      / \
 *     2   3
 *        / \
 *       4   5
 * as '[1,2,3,null,null,4,5]' for example.
 *
 */

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode( val ) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * DFS
 * Time: O(N) for both serialization and deseralization.
 * Visiting each node once.
 * Space: O(N) -> N*V + 2N, where V is size of value, 2N for markers.
 * N*V is called natural serialization.
 *
 *     1
 *    / \
 *   2   3
 *      /  \
 *     4    5
 *
 * PreOrder (w child markers):
 * [ 1, 2, null, null, 3, 4, null, null, 5, null, null ]
 *
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
module.exports.serializeDFS = function serializeDFS( root ) {
  const visited = [],
    stack = [root];

  // PreOrder Traversal
  // with null children markers
  while ( stack.length ) {
    const node = stack.pop();

    if ( !node ) {
      visited.length++;
    }
    else {
      visited.push( node.val );
      stack.push( node.right );
      stack.push( node.left );
    }
  }

  return visited.toString();
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
module.exports.deserializeDFS = function deserializeDFS( serialized ) {
  const data = serialized.split( ',' ).map( val => val ? +val : null );

  let index = 0;

  const reconstructPreOrder = () => {
    const val = data[index++];

    if ( val == null )
      return null;

    const treeNode = new TreeNode( val );
    treeNode.left = reconstructPreOrder();
    treeNode.right = reconstructPreOrder();

    return treeNode;
  };

  return reconstructPreOrder();
};

/**
 * BFS
 * Time & Space same as DFS.
 *
 *     1
 *    / \
 *   2   3
 *      /  \
 *     4    5
 *
 * BFS Traversal:
 * [ 1, 2, 3, null, null, 3, 4, 5, null, null, null, null ]
 *
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
module.exports.serializeBFS = function serializeBFS( root ) {
  if ( !root ) {
    return '';
  }

  const queue = [root],
    visited = [];

  while ( queue.length ) {
    const root = queue.shift();

    if ( !root ) {
      visited.push( null );
    }
    else {
      visited.push( root.val );
      queue.push( root.left );
      queue.push( root.right );
    }
  }

  return visited.toString();
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
module.exports.deserializeBFS = function deserializeBFS( serialized ) {
  const data = serialized.split( ',' );

  if ( !data[0] ) {
    return null;
  }

  const root = new TreeNode( +data[0] ),
    queue = [root];

  let i = 1;

  while ( i < data.length ) {
    const node = queue.shift(),
      left = data[i++],
      right = data[i++];

    if ( left ) {
      node.left = new TreeNode( +left );
      queue.push( node.left );
    }
    if ( right ) {
      node.right = new TreeNode( +right );
      queue.push( node.right );
    }
  }

  return root;
};
