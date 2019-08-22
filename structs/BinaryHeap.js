/**
 * Binary Heap
 *
 * A min-heap is a _complete_ binary tree and:
 * - Each node is smaller than children...
 * - Therefore, the root is the minimum element.
 * Max heaps are essentially equivalent to min-heaps,
 * but the elements are in descending order rather than ascending order.
 *
 * Two Key Operations (In context of min heap):
 *
 * 1. **Insert** O(log n) where `n` is the number of nodes in the heap.
 * a. Start insert at bottom.
 * b. Insert at next available spot (left to right on bottommost level)
 *    to maintain the _complete_ property.
 * c. Then fix the tree by "bubbling up" minimum elements
 *    via swaps with parent to find place.
 *
 * 2. **Extract Min** O(log n)
 * Since it's a min heap, it will always be at the top.
 * So the question is how to extract it.
 * a. Remove the minimum element and swap it
 * with the last (bottom right-est) element in the heap.
 * b. "Bubble down" the swapped element back to place by swapping with children.
 * c. When choosing right/left child, no inherent order,
 *    but need to compare and choose smaller one to keep the level order.
 *
 */

/**
 * Abstract heap operations.
 * Min and max heap must implement
 * bubble up and bubble down operations.
 */
class Heap {
  // Abstract
  bubbleUp() {}
  bubbleDown() {}

  constructor() {
    this.nodes = [];
  }

  size() {
    return this.nodes.length;
  }

  peek() {
    return this.getNode( 0 );
  }

  add( value ) {
    this.nodes[this.size()] = value;
    this.bubbleUp();
  }
  /**
   * The extract min or max implementation.
   * Ordering is maintained during insertions.
   */
  poll() {
    const minOrMax = this.getNode( 0 );
    const popped = this.nodes.pop();
    if ( this.size() ) {
      this.nodes[0] = popped;
      this.bubbleDown();
    }
    return minOrMax;
  }

  calcParent( idx ) {
    return idx - 1 >> 1;
  }
  calcLeft( idx ) {
    return idx * 2 + 1;
  }
  calcRight( idx ) {
    return idx * 2 + 2;
  }

  getNode( idx ) {
    return this.nodes[idx];
  }
  getParent( idx ) {
    return this.nodes[this.calcParent( idx )];
  }
  getLeft( idx ) {
    return this.nodes[this.calcLeft( idx )];
  }
  getRight( idx ) {
    return this.nodes[this.calcRight( idx )];
  }

  swap( idx1, idx2 ) {
    const tmp = this.nodes[idx1];
    this.nodes[idx1] = this.nodes[idx2];
    this.nodes[idx2] = tmp;
  }
}

module.exports.MinHeap = class MinHeap extends Heap {
  constructor() {
    super();
  }

  bubbleDown() {
    const isGreaterThanLeft = idx =>
      this.getLeft( idx ) && this.getLeft( idx ) < this.getNode( idx );

    const isRightLessThanLeft = idx => {
      const right = this.getRight( idx ),
        left = this.getLeft( idx );

      return right && right < left;
    };

    let curIdx = 0;

    while ( isGreaterThanLeft( curIdx ) ) {
      let smallerIdx = this.calcLeft( curIdx );
      if ( isRightLessThanLeft( curIdx ) ) {
        smallerIdx = this.calcRight( curIdx );
      }

      this.swap( smallerIdx, curIdx );
      curIdx = smallerIdx;
    }
  }

  bubbleUp() {
    const isLessThanParent = idx =>
      this.getParent( idx ) && this.getParent( idx ) > this.getNode( idx );

    let curIdx = this.size() - 1;

    while ( isLessThanParent( curIdx ) ) {
      const parentIdx = this.calcParent( curIdx );
      this.swap( parentIdx, curIdx );
      curIdx = parentIdx;
    }
  }
};

module.exports.MaxHeap = class MaxHeap extends Heap {
  constructor() {
    super();
  }

  bubbleUp() {
    const isGreaterThanParent = idx =>
      this.getParent( idx ) && this.getNode( idx ) > this.getParent( idx );

    let curIdx = this.size() - 1;

    while ( isGreaterThanParent( curIdx ) ) {
      const parentIdx = this.calcParent( curIdx );
      this.swap( parentIdx, curIdx );
      curIdx = parentIdx;
    }
  }

  bubbleDown() {
    const isLessThanAChild = idx => {
      const cur = this.getNode( idx ),
        left = this.getLeft( idx ),
        right = this.getRight( idx );

      return left && ( left > cur || right > cur );
    };
    const isRightGreaterThanLeft = idx => {
      const right = this.getRight( idx ),
        left = this.getLeft( idx );

      return right && right > left;
    };


    let curIdx = 0;

    while ( isLessThanAChild( curIdx ) ) {
      let biggerIdx = this.calcLeft( curIdx );
      if ( isRightGreaterThanLeft( curIdx ) ) {
        biggerIdx = this.calcRight( curIdx );
      }

      this.swap( biggerIdx, curIdx );
      curIdx = biggerIdx;
    }
  }
};
