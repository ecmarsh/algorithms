const isInteger = require( 'lodash/isInteger' );
const isNil = require( 'lodash/isNil' );
const { isPrime } = require( '../utils' );

/**
 * Hash Tables
 * FIXED size (must define size up front)
 *
 * Should be:
 * a. Deterministic: Same key --> same value
 * b. Efficient: Should always be O(1) to get/put
 * c. Uniform distribution: % prime numbers
 *
 * Use quadratic probing or double hashing to avoid collisions
 * Linear probing with no second hash can result in clusters
 *
 * Example of hash table in use: localStorage.
 *
 * Load factor = n/k where n is entries stored, k buckets in hash table.
 * - Values closer to 0 means less entries in table,
 *   which means possible wasted memory if not doing much for search.
 * - As load factory approaches 1, or grows larger (entries being filled),
 *   the hash table becomes much slower.
 * - Java uses default load factor of 0.75 for its hash table implementation.
 * - Some proper implementations set an upper bound for load factor,
 *   and double the number of buckets once bound is reached,
 *   thereby halving load.
 *
 */

const HashTable = {
  init( size ) {
    if ( isPrime( size ) ) {
      this.size = size;
      this.keys = Array( size ).fill();
      this.values = Array( size ).fill();
      this.items = 0;
    } else {
      throw Error( `Choose a prime number size to avoid collisions` );
    }
  },
  hash( key ) {
    if ( isInteger( key ) ) {
      // Base hash
      const firstHash = key % this.size;
      // Double hash
      // hash2(x) = R - (hash1() % R)
      // where R is less than this.size
      const R = this.size - 2;
      return R - ( firstHash % R );
    }
  },
  getItem( key ) {
    if ( !~this.keys.indexOf( key ) ) {
      return; // undefined
    }

    let hashedIdx = this.hash( key );

    while ( this.keys[hashedIdx] !== key ) {
      // Simple linear (use quadratic to avoid clusters)
      hashedIdx = ++hashedIdx % this.size;
    }
    return this.values[hashedIdx];
  },
  setItem( key, val ) {
    if ( this.items >= this.size ) {
      throw Error( `Hash table is full!` );
    }
    if ( !isInteger( key ) ) {
      throw Error( `Key must be an integer` );
    }

    // Determine the (unique) hash index
    let hashedIdx = this.hash( key );
    while ( !isNil( this.keys[hashedIdx] ) ) {
      hashedIdx = ++hashedIdx % this.size;
    }

    // Add the new item
    this.keys[hashedIdx] = key;
    this.values[hashedIdx] = val;
    this.items++;
  },
};

module.exports = HashTable;
