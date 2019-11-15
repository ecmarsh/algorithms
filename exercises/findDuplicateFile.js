/**
 * Find Duplicate File in System ( Dropbox )
 *
 * Given a list of directory info including directory path,
 * and all the files with contents in this directory,
 * you need to find out all the groups of duplicate files
 * in the file system in terms of their paths.
 *
 * A group of duplicate files consists of at least two files
 * that have exactly the same content.
 *
 * A single directory info string in the input list
 * has the following format:
 * "root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content)
 * ... fn.txt(fn_content)"
 *
 * The output is a list of group of duplicate file paths.
 * For each group, it contains all the file paths
 * of the files that have the same content.
 * A file path is a string that has the following format:
 * "directory_path/file_name.txt"
 *
 * @example
 * Input:
 * [
 *  "root/a 1.txt(abcd) 2.txt(efgh)",
 *  "root/c 3.txt(abcd)",
 *  "root/c/d 4.txt(efgh)",
 *  "root 4.txt(efgh)"
 * ]
 * Output:
 * [
 *  ["root/a/2.txt","root/c/d/4.txt","root/4.txt"], // 'efgh'
 *  ["root/a/1.txt","root/c/3.txt"] // 'abcd'
 * ]
 *
 * Note:
 * - No order is required for the final output.
 * - You may assume the directory name, file name and
 *   file content only has letters and digits,
 *   and the length of file content is in the range of [1,50].
 * - The number of files given is in the range of [1,20000].
 * - You may assume no files or directories share the same name
 *   in the same directory.
 * - You may assume each given directory info represents a unique directory.
 *   Directory path and file info are separated by a single blank space.
 *
 */

/**
 * @param {string[]} paths
 * @return {string[][]}
 */
module.exports = function findDuplicate( paths ) {
  if ( !paths || !paths.length ) {
    return [];
  }

  const map = new Map();

  for ( const path of paths ) {
    const [dir, ...files] = path.split( /\s/ );

    for ( const file of files ) {
      const { 1: content, index } = file.match( /\((.*)\)$/ ),
        dirents = map.get( content ) || [],
        filePath = `${dir}/${file.slice( 0, index )}`;

      dirents.push( filePath );
      map.set( content, dirents );
    }
  }

  const res = [];

  const addDupToRes = dirents => {
    if ( dirents.length > 1 ) {
      res.push( dirents );
    }
  };

  Map.prototype.forEach.call( map, addDupToRes );

  return res;
};

/*

'dir + '/' + filename

first word is a directory
hold file content as key, dir/file
for res, grab values of each key

time and space: o(entries + avgLen(entry))


*/
