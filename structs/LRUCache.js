/**
 * Least Recently Used Cache
 * Removes oldest items first.
 * Thus, item replaced is oldest accessed item.
 *
 * Problem #146
 * Design and implement a data structure for Least Recently Used (LRU) cache.
 *
 * It should support the following operations: `get` and `put`.
 *
 * `get(key)` - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
 * `put(key, value)` - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.
 *
 * The cache is initialized with a positive capacity.
 * Both operations should be completed in constant time ie O(1).
 *
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 *
 */

// Example:
// LRUCache cache = new LRUCache( 2 /* capacity */)
// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // returns 1
// cache.put(3, 3);    // evicts key 2
// cache.get(2);       // returns -1 (not found)
// cache.put(4, 4);    // evicts key 1
// cache.get(1);       // returns -1 (not found)
// cache.get(3);       // returns 3
// cache.get(4);       // returns 4

/**
* @param {number} capacity
*/
function LRUCache( capacity ) {
  return {
    capacity,
    cache: new Map(), // js map stored in order
  };
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function( key ) {
  if ( !this.cache.has( key ) ) {
    return -1;
  }

  const value = this.cache.get( key );
  this.cache.delete( key );
  this.cache.set( key, value );

  return value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function( key, value ) {
  if ( this.cache.has( key ) ) {
    this.cache.delete( key );
  }

  if ( this.cache.size === this.capacity ) {
    // Returns a map iterator
    const [oldestKey] = this.cache.entries().next().value;
    this.cache.delete( oldestKey );
  }

  this.cache.set( key, value );
};
