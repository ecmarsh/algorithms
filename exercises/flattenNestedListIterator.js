/* eslint-disable no-unused-vars */
/**
 * Flatten Nested List Iterator
 *
 * Given a nested list of integers, implement an iterator to flatten it.
 *
 * Each element is either an integer, or a list -- whose elements
 * may also be integers or other lists.
 *
 * @example:
 * Input: [[1,1],2,[1,1]]
 * Output: [1,1,2,1,1]
 * Explanation: By calling next repeatedly until hasNext returns false,
 *              the order of elements returned by next should be: [1,1,2,1,1].
 * @example:
 * Input: [1[4,[6]]]
 * Output: [1,4,6]
 *
 */
/**
 * _This is the interface that allows for creating nested lists._
 * You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/

/**
 * __Option 1__: Unpack entire nested list recursively on initialization.
 * This is a better solution for this problem since entire list is iterated.
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
function NestedIterator1( nestedList ) {
  this.list = [];
  this.index = 0;
  flattenDeep( this.list, nestedList );
}

const flattenDeep = function( flatList, nestedList ) {
  nestedList.forEach( ( el ) => {
    if ( el.isInteger() ) {
      flatList.push( el.getInteger() );
    } else {
      flattenDeep( flatList, el.getList() );
    }
  } );
};

/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator1.prototype.hasNext = function() {
  return this.index < this.list.length;
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator1.prototype.next = function() {
  return this.list[this.index++];
};

/**
 * __Option 2__: Unpack To Integer on Each Call
 * Would be more beneficial if entire list may _not_ be iterated.
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
function NestedIterator2( nestedList ) {
  this.list = nestedList;
  this.index = 0;
  this.stack = [];
  return this;
  // Note: don't need to initialize anything as
  // hasNext() does this for us and is always called first.
}

/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator2.prototype.hasNext = function() {
  if ( this.index === this.list.length && this.stack.length === 0 ) {
    return false;
  }
  // Goal here is to get to point where we can confirm integer is on top
  if ( this.stack.length === 0 ) {
    this.stack[0] = this.list[this.index];
    this.index += 1;
  }
  if ( this.stack[this.stack.length - 1].isInteger() ) {
    return true;
  }
  // Unpack the nested list items in reverse and add back to stack
  const list = this.stack.pop().getList();
  for ( let i = list.length - 1; i >= 0; i -= 1 ) {
    this.stack.push( list[i] );
  }
  // Need to repeat until top is Integer
  // Also defends against empty list vs immediate return true
  return this.hasNext();
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator2.prototype.next = function() {
  return this.stack.pop().getInteger();
};
