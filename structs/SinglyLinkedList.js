/**
 * Singly Linked List
 * Dyanmic data structure (no fixed size)
 * Can allocate and deallocate memory @ runtime
 *
 * Each node has a reference to the 'next' node
 */

const SinglyLinkedList = {
  init() {
    this.head = null;
    this.size = 0;
  },
  get isEmpty() {
    return this.size === 0;
  },
  incrementSize() {
    this.size++;
  },
  decrementSize() {
    if ( !this.isEmpty ) {
      this.size--;
    }
  },
  // Insert node at head O(1)
  insert( data ) {
    const tmp = this.head;
    this.head = new SLLNode( data );
    this.head.next = tmp;
    this.incrementSize();
  },
  // Remove a node reference (by value) O(n)
  remove( data ) {
    // Node we are checking
    let node = this.head;

    // If head is node to remove
    if ( node.data === data ) {
      // Shift the list over
      this.head = node.next;
      this.decrementSize();
      return;
    }

    // Check between head and tail
    let prev = node;
    while ( node.next ) {
      if ( node.data === data ) {
        // Remove the reference
        prev.next = node.next;
        prev = node;
        node = node.next;
        break;
      }
      // Check next
      prev = node;
      node = node.next;
    }

    // Check tail, remove prev's ptr
    if ( node.data === data ) {
      prev.next = null;
    }
    this.decrementSize();
  },
  // Traverse and search linearly -> O(n)
  has( data ) {
    let node = this.head;
    while ( node.next ) {
      if ( node.data === data ) {
        return true;
      }
      // next node
      node = node.next;
    }
    // Check the tail
    if ( node.data === data ) {
      return true;
    }

    // Not found
    return false;
  },
};

// Node constructor
function SLLNode( data ) {
  this.data = data;
  this.next = null;
}

module.exports = { SinglyLinkedList, SLLNode };
