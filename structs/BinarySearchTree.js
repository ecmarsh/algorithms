const isNull = require( 'lodash/isNull' );

/**
 * Binary Search Tree (BST)
 *
 * Optimized for search/insert/removal in logarithmic time O(log n)
 * Left.value < Parent.value
 * Right.value > Parent.value
 *
 * Height of perfectly balanced tree is log(n)
 * But unbalanced can increase to O(n) linear time (worst)
 *
 * Insertion: Loop and compare values
 * Removal: if no children, remove. if children, replace
 */

const BinarySearchTree = {
  init() {
    this._root = null;
  },
  newNode( value ) {
    return {
      value,
      left: null,
      right: null,
    };
  },
  insert( value ) {
    if ( value === 0 ) {
      throw Error( `Cannot choose zero as value` );
    }
    // Create new node
    const node = this.newNode( value );

    // Assign to root if none
    if ( !this._root ) {
      this._root = node;
    } else {
      let curr = this._root;
      for ( ;; ) {
        // Smaller -> insert left
        if ( curr.value > value ) {
          // Null ? increment : insert
          if ( !isNull( curr.left ) ) {
            curr = curr.left;
            continue;
          } else {
            curr.left = curr;
            break;
          }
        } else if ( curr.value < value ) {
          // Larger --> insert right
          if ( !isNull( curr.right ) ) {
            curr = curr.right;
            continue;
          } else {
            curr.right = curr;
            break;
          }
        } else {
          // Both are the same
          break;
        }
      }
    }
  },
  remove( value ) {
    return rmvRecursively( this._root, value );
    // Recursively remove
    function rmvRecursively( node, val ) {
      if ( !node ) {
        return;
      } else if ( val < node.value ) {
        node.left = rmvRecursively( node.left, value );
      } else if ( val > node.value ) {
        node.right = rmvRecursively( node.right, value );
      } else {
        if ( !node.left && !node.right ) {
          return;
        } else if ( !node.left ) {
          node = node.right;
          return node;
        } else if ( !node.right ) {
          node = node.left;
          return node;
        }
        // Node has both left and right
        const tmp = findMin( node.right );
        node.value = tmp.value;
        node.right = rmvRecursively( node.right, tmp.value );
        return node;
      }
      return node;
    }
    // Helper
    function findMin( node ) {
      while ( node.left ) {
        node = node.left;
      }
      return node;
    }
  },
  find( value ) {
    let node = this._root,
      isFound = false;

    while ( node ) {
      if ( node.value > value ) {
        node = node.left;
      } else if ( node.value < value ) {
        node = node.right;
      } else {
        // node.value === value
        isFound = true;
        break;
      }
    }
    return isFound;
  },
};

module.exports = BinarySearchTree;
