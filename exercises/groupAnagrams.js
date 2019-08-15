/**
 *
 * Given an array of strings, group anagrams together.
 *
 * @example
 * Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
 * Output:
 * [
 *   ["ate","eat","tea"],
 *   ["nat","tan"],
 *   ["bat"]
 * ]
 *
 * Note:
 * - All inputs will be in lowercase.
 * - The order of your output does not matter.
 *
 *
 * Analysis
 * Time: O(NK) where N is # of strings, K is max len of strings
 * Space: O(NK) Map to hold values of anagrams
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
module.exports = function groupAnagrams( strs ) {
  const groups = new Map();

  for ( const str of strs ) {
    const key = makeKey( str ),
      group = groups.get( key ) || [];

    group.push( str );
    groups.set( key, group );
  }

  return Array.from( groups.values() );
};

const makeKey = str =>
  [...str].reduce( ( acc, cur ) =>
    acc + cur.charCodeAt( 0 ) ** 4, 0 );
