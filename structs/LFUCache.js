/**
 * Least Frequently Used Caching
 *
 * - Used by the operating system to manage memory.
 * - Tracks number of times a block is referenced in memory.
 * - When cache exceeds its limit, system deletes item with the lowest reference frequency.
 * - The easiest implementation is to reference count blocks.
 * - Not ideal when item in memory is referenced repeatedly for a short amount of time.
 * - LFU is less common but has its uses such as mobile keyboard apps with suggested words.
 *
 * Implementation: Uses a doubly linked list for constant O(1) retrieval and deletion time.
 *
 */

function LFUNode( key, value ) {
  return {
    key,
    data: value,
    prev: null,
    next: null,
    freq: 1,
  };
}


function LFUList() {
  const head = new LFUNode( 'buffer head', null );
  const tail = new LFUNode( 'buffer tail', null );
  const size = 0;

  head.next = tail;
  tail.prev = head;

  return {
    head,
    tail,
    size,
  };
}

LFUList.prototype.insertAtHead = function( node ) {
  node.next = this.head.next;
  this.head.next.prev = node;
  this.head.next = node;
  node.prev = this.head;
  this.size++;
};

LFUList.prototype.removeAtTail = function() {
  const dataTail = this.tail.prev;
  dataTail.prev.next = this.tail;
  this.tail.prev = dataTail.prev;
  this.size--;
  return dataTail;
};

LFUList.prototype.removeNode = function( node ) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
  this.size--;
};


function LFUCache( capacity ) {
  return {
    keys: {}, // LFUNodes,
    freq: {}, /// LFUList,
    capacity,
    minFreq: 0,
    size: 0,
  };
}

LFUCache.prototype.get = function( key ) {
  const node = this.keys[key];

  if ( !node ) {
    return;
  }

  const prevFreq = node.freq;
  node.freq++;

  this.freq[prevFreq].removeNode( node );
  this.freq[node.freq] = this.freq[node.freq] || new LFUList();
  this.freq[node.freq].insertAtHead( node );
  this.syncMinFreq( prevFreq );

  return node.data;
};

LFUCache.prototype.set = function( key, value ) {
  const addNodeToFreq = ( f, node ) => {
    this.freq[f] = this.freq[f] || new LFUList();
    this.freq[f].insertAtHead( node );
  };

  let node = this.keys[key];

  if ( !node ) {
    node = new LFUNode( key, value );
    this.keys[key] = node;

    if ( this.size === this.capacity ) {
      const tail = this.freq[ this.minFreq ].removeAtTail();
      delete this.keys[ tail.key ];
    } else {
      this.size++;
    }

    addNodeToFreq( 1, node );
    return;
  }

  const prevFreq = node.freq;
  node.data = value;
  node.freq++;

  this.freq[prevFreq].removeNode( node );
  addNodeToFreq( node.freq, node );
  this.syncMinFreq( prevFreq );
};

LFUCache.prototype.syncMinFreq = function( prevFreq ) {
  const isOutdatedFreq = prevFreq === this.minFreq
    && !Object.keys( this.freq[ prevFreq ] ).length;

  if ( isOutdatedFreq ) {
    this.minFreq++;
  }
};
