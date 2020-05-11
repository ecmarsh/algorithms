/**
 * @lc id=460 lang=javascript tag=design,queue,linkedlist
 *
 * [460] LFU Cache
 *
 * Design and implement a data structure for Least Frequently Used (LFU) cache.
 * It should support the following operations: get and put.
 *  - get(key) - Get the value (will always be positive) of the key
 *    if the key exists in the cache, otherwise return -1.
 *  - put(key, value) - Set or insert the value if the key is not already
 *    present. When the cache reaches its capacity, it should invalidate
 *    the least frequently used item before inserting a new item.
 *    For the purpose of this problem, when there is a tie,
 *    (i.e., two or more keys that have the same frequency),
 *    the least recently used key would be evicted.
 *
 * Note: that the number of times an item is used is the number of calls
 * to the get and put functions for that item since it was inserted.
 * This number is set to zero when the item is removed.
 *
 * @example
 * LFUCache cache = new LFUCache( 2 ); // capacity=2
 * cache.put(1, 1);
 * cache.put(2, 2);
 * cache.get(1);       // returns 1
 * cache.put(3, 3);    // evicts key 2
 * cache.get(2);       // returns -1 (not found)
 * cache.get(3);       // returns 3.
 * cache.put(4, 4);    // evicts key 1.
 * cache.get(1);       // returns -1 (not found)
 * cache.get(3);       // returns 3
 * cache.get(4);       // returns 4
 */

/**
 * @param {number} capacity
 */
const LFUCache = function ( capacity ) {
  this.capacity = capacity;
  this.keys = new Map(); // <key, ListNode>
  this.frequencies = new Map(); // <freq, LRUMap()>
  this.minFreq = 1;
  this.size = 0;
};

/**
* @param {number} key
* @return {number}
*/
LFUCache.prototype.get = function ( key ) {
  if ( !this.keys.has( key ) ) {
    return -1;
  }

  const node = this.keys.get( key );

  // Increase the frequency of the node
  this.frequencies.get( node.freq ).delete( node.key );
  this.updateMinFreq( node.freq );
  node.freq += 1;
  this.addNodeToFrequencyList( node );

  return node.val;
};

/**
* @param {number} key
* @param {number} value
* @return {void}
*/
LFUCache.prototype.put = function ( key, val ) {
  // If new key, add it to keys and freq
  if ( !this.keys.has( key ) ) {
    this.addNewNode( {key, val, freq: 1} );
    return;
  }

  // Existing node, update the frequency
  const node = this.keys.get( key );
  node.val = val; // update the val if changed

  // Move node to new frequency in frequency list
  this.frequencies.get( node.freq ).delete( node.key );
  this.updateMinFreq( node.freq );
  node.freq += 1;
  this.addNodeToFrequencyList( node );
};

LFUCache.prototype.addNewNode = function ( node ) {
  this.keys.set( node.key, node );

  this.addNodeToFrequencyList( node );

  // if already at max cap, remove the LFU node
  if ( this.size === this.capacity ) {
    this.evict();
  } else {
    this.size += 1;
  }

  // Adding a new node means min freq is one
  // NOTE: do this after or else newly added node could be deleted
  this.minFreq = node.freq;
};

LFUCache.prototype.evict = function () {
  const leastFreqNodes = this.frequencies.get( this.minFreq );
  const [lruNodeKey] = leastFreqNodes.entries().next().value;
  leastFreqNodes.delete( lruNodeKey );
  this.keys.delete( lruNodeKey );
};

LFUCache.prototype.addNodeToFrequencyList = function ( node ) {
  if ( !this.frequencies.has( node.freq ) ) {
    this.frequencies.set( node.freq, new Map() );
  }
  const frequencyList = this.frequencies.get( node.freq );
  frequencyList.set( node.key, node );
};

LFUCache.prototype.updateMinFreq = function ( removedFreq ) {
  // If min freq was removed and there is no more
  // at the minimum frequency, increment the minimum frequency
  if (
    removedFreq === this.minFreq
      && this.frequencies.get( removedFreq ).size === 0
  ) {
    this.minFreq += 1;
  }
};

/**
* Your LFUCache object will be instantiated and called as such:
* var obj = new LFUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/
module.exports = LFUCache;
