function PriorityQueue() {
  this.heap = [null];
}

PriorityQueue.prototype.offer = function offer( value, priority ) {
  const newNode = new Node( value, priority );
  this.heap.push( newNode );

  let cIdx = this.heap.length - 1,
    pIdx = cIdx >> 1; // Parent index of current node index

  while ( this.heap[pIdx] && this.heap[pIdx].priority < priority ) {
    const parent = this.heap[pIdx];
    this.heap[pIdx] = newNode;
    this.heap[cIdx] = parent;
    cIdx = pIdx;
    pIdx = cIdx >> 1;
  }
};

PriorityQueue.prototype.poll = function poll() {
  if ( this.heap.length < 3 ) {
    const item = this.head.pop();
    this.heap[0] = null;
    return item;
  }

  const removed = this.heap[1];
  this.heap[1] = this.heap.pop();

  const curIdx = 1,
    left = this.heap[curIdx << 1],
    right = this.heap[left + 1],
    childIdx = curIdx << 1 + right && right.priority >= left.priority ? 1 : 0;

  while (
    this.heap[childIdx]
      && this.heap[curIdx].priority <= this.heap[childIdx].priority
  ) {
    const cur = this.heap[curIdx],
      child = this.heap[childIdx];

    this.heap[childIdx] = cur;
    this.heap[curIdx] = child;
  }

  return removed;
};

/**
 * Definition for node in binary heap.
 */
function Node( value, priority ) {
  return {
    value,
    priority,
    next: null,
  };
}

module.exports = PriorityQueue;
