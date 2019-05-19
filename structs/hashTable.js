const isInteger = require( 'lodash/isInteger' );
const isNull = require( 'lodash/isNull' );
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
 */

function HashTable( size ) {
  this.size = size;
  this.keys = this.init( size );
  this.values = this.init( size );
  this.limit = 0;
}

// Intialize k/v array
HashTable.prototype.init = function( size ) {
  if ( !isPrime( size ) ) {
    throw Error( 'Choose a prime number size to avoid collisions.' );
  }
  return Array( size ).fill( null );
};

// Base hash function
HashTable.prototype.hash = function( k ) {
  if ( !isInteger( k ) ) {
    throw Error( `Key must be an integer` );
  }

  const firstHashedKey = k % this.size;
  return this.secondHash( firstHashedKey );
};

HashTable.prototype.secondHash = function( firstHashedKey ) {
  // hash2(x) = R - (hash1() % R)
  const R = this.size - 2;
  return R - ( firstHashedKey % R );
};

// Setter O(1) - Double hash w/ linear probing
HashTable.prototype.put = function( k, v ) {
  if ( this.limit >= this.size ) {
    throw Error( `Hash table is full` );
  }

  let hashedIdx = this.hash( k );

  while ( !isNull( this.keys[hashedIdx] ) ) {
    hashedIdx++;
    hashedIdx = hashedIdx % this.size;
  }

  this.keys[hashedIdx] = k;
  this.values[hashedIdx] = v;
  this.limit++;
};

// Getter O(1) - Double hash w/ linear probing
HashTable.prototype.get = function( k ) {
  let hashedIdx = this.hash( k );

  while ( this.keys[hashedIdx] != k ) {
    hashedIdx++;
    hashedIdx = hashedIdx % this.size;
  }

  return this.values[hashedIdx];
};

module.exports = HashTable;
