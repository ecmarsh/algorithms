/**
 * Binary Tree
 * Binary tree nodes only have two child nodes (left, right)
 * Always have top ("root") node
 *
 * Traversing (All linear time to visit all nodes)
 * I. Pre-order :: CURR>L>R (Roots before leaves)
 * II. In-Order :: L>CURR>R (Leaves before roots)
 * III. Post-Order :: L>R>CURR (Flatten tree, when inherent sequence)
 * IV. Level Order (breath) :: level x level (vs direction)
 *
 */

const BinaryTree = {
  init() {
    this._root = null;
  },
  traversePreOrder() {
    // Initialize recursion starting @ root
    traverse( this._root );

    function traverse( node ) {
      if ( !node ) {
        return;
      }
      // Do something with the node value
      console.log( node.value );
      // Continue traversing
      traverse( node.left );
      traverse( node.right );
    }
  },
  traverseInOrder() {
    // Initialize recursion
    traverse( this._root );

    function traverse( node ) {
      if ( !node ) {
        return;
      }

      // 1. Left
      traverse( node.left );
      // 2. Do something w/ current node
      console.log( node.value );
      // 3. Right
      traverse( node.right );
    }
  },
  traversePostOrder() {
    traverse( this._root );

    function traverse( node ) {
      // 1. Left
      if ( node.left ) {
        traverse( node.left );
      }
      // 2. Right
      if ( node.right ) {
        traverse( node.right );
      }
      // 3. Do something w/ current
      console.log( node.value );
    }
  },
  traverseLevelOrder() {
    // Breadth-first search
    const root = this._root;
    const queue = [];

    if ( !root ) {
      return;
    }
    // Add root to queue
    queue.push( root );

    while ( queue.length ) {
      // Get first and do something w
      const tmp = queue.shift();
      console.log( tmp.value );

      // Add left to queue
      if ( tmp.left ) {
        queue.push( tmp.left );
      }
      // Add right to queue
      if ( tmp.right ) {
        queue.push( tmp.right );
      }
    }
  },
};

// Binary Tree Node
function BTNode( data ) {
  this.data = data;
  this.left = null;
  this.right = null;
}

module.exports = { BinaryTree, BTNode };
