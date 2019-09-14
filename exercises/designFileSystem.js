/**
 * Design File System (medium)
 *
 * You are asked to design a file system which provides two functions:
 *
 * 1. `createPath(path, value)`:
 *  Creates a new path and associates a value to it and returns True.
 *  Returns False if the path already exists or its parent path doesn't exist.
 * 2. `get(path)`: Returns the value associated with a path
 *                 or returns -1 if the path doesn't exist.
 *
 * The format of a path is one or more concatenated strings of the form:
 * `/` followed by one or more lowercase English letters.
 * For example, `/leetcode` and `/leetcode/problems` are valid paths
 * while an empty string and `/` are not.
 *
 * Implement the two functions.
 *
 * Please refer to the examples for clarifications.
 *
 * @example
 * Input:
 * ["FileSystem","createPath","get"]
 * [[],["/a",1],["/a"]]
 * Output:
 * [null,true,1]
 * Explanation:
 *  FileSystem fileSystem = new FileSystem();
 *  fileSystem.createPath("/a", 1); // return true
 *  fileSystem.get("/a"); // return 1
 *
 * @example
 * Input:
 * ["FileSystem","createPath","createPath","get","createPath","get"]
 * [[],["/leet",1],["/leet/code",2],["/leet/code"],["/c/d",1],["/c"]]
 * Output:
 * [null,true,true,2,false,-1]
 * Explanation:
 * FileSystem fileSystem = new FileSystem();
 *
 * fileSystem.createPath("/leet", 1); // return true
 * fileSystem.createPath("/leet/code", 2); // return true
 * fileSystem.get("/leet/code"); // return 2
 * fileSystem.createPath("/c/d", 1); // return false as no parent path "/c"
 * fileSystem.get("/c"); // return -1 because this path doesn't exist.
 *
 * Constraints:
 * - The number of calls to the two functions is
 *   less than or equal to 10^4 in total.
 * - `2 <= path.length <= 100`
 * - `1 <= value <= 10^9`
 *
 */

/**
 * Constructor for file system
 */
const FileSystem = function() {
  this.fs = new Map();
};

/**
 * @param {string} path
 * @param {number} value
 * @return {boolean}
 */
FileSystem.prototype.createPath = function( path, value ) {
  if ( !path || path === '/' || this.fs.has( path ) ) {
    return false;
  }

  const lastIndex = path.lastIndexOf( '/' );
  const parent = path.slice( 0, lastIndex );

  if ( this.fs.has( parent ) || !lastIndex ) {
    this.fs.set( path, value );
    return true;
  }

  return false;
};

/**
 * @param {string} path
 * @return {number}
 */
FileSystem.prototype.get = function( path ) {
  return this.fs.get( path ) || -1;
};

/**
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.createPath(path,value)
 * var param_2 = obj.get(path)
 */

module.exports = FileSystem;
