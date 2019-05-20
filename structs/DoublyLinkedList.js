/**
 * Doubly Linked List
 * next and prev pointers
 *
 * Prefer double linked list for bidirectional traversal/search
 * Allows for flexible and fast O(1) insert/delete from head or tail
 */

const DoublyLinkedList = {
  init() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  },
  get isEmpty() {
    return this.size === 0;
  },
  decrementSize() {
    if ( !this.isEmpty ) {
      this.size--;
    }
    if ( this.size === 1 ) {
      this.head = this.tail;
    }
  },
  incrementSize() {
    this.size++;
  },
  addFirstNode( data ) {
    // Make new node tail and head
    this.head = new DLLNode( data );
    this.tail = this.head;
    this.incrementSize();
  },
  removeLastNode() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  },
  insertAtHead( data ) {
    // First node
    if ( this.isEmpty ) {
      this.addFirstNode( data );
    } else {
      const newHead = new DLLNode( data );
      newHead.next = this.head;
      this.head.prev = newHead;
      this.head = newHead;
      this.incrementSize();
    }
  },
  insertAtTail( data ) {
    // First node
    if ( this.isEmpty ) {
      this.addFirstNode( data );
    } else {
      const newTail = new DLLNode( data );
      newTail.prev = this.tail;
      this.tail.next = newTail;
      this.tail = newTail;
      this.incrementSize();
    }
  },
  // Similar to dequeuing O(1)
  deleteAtHead() {
    // Store data to return
    const head = this.head;
    if ( this.head === this.tail ) {
      this.removeLastNode();
      return head.data;
    }
    // Shift to head
    this.head = head.next;
    this.head.prev = null;
    this.decrementSize();
    return head.data;
  },
  // 'Dequeue' from either end in O(1)
  deleteAtTail() {
    // Store tail data
    const tail = this.tail;
    if ( this.head === this.tail ) {
      this.removeLastNode();
      return tail.data;
    }
    // Remove tail reference
    this.tail = this.tail.prev;
    this.tail.next = null;
    this.decrementSize();
    return tail.data;
  },
  // Find if value/data exists O(n)
  search( data, startFromHead = true ) {
    // Direction to search in
    const dir = startFromHead ? `next` : `prev`;
    // Starting node
    let node = startFromHead ? this.head : this.tail;
    while ( node[dir] ) {
      if ( node.data === data ) {
        return true;
      }
      node = node[dir];
    }
    return false;
  },
};

// Doubly linked list Node constructor
function DLLNode( data ) {
  this.data = data;
  this.next = null;
  this.prev = null;
}

module.exports = { DoublyLinkedList, DLLNode };
