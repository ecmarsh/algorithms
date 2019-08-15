/**
 * Remove Invalid Parentheses
 *
 * Remove the minimum number of invalid parentheses
 * that make the input string valid.
 * Return all possible results.
 * The input string may contain letters other than the parentheses ( and ).
 *
 * @example
 * Input: "()())()"
 * Output: ["()()()", "(())()"]
 *
 * Input: "(a)())()"
 * Output: ["(a)()()", "(a())()"]
 *
 * Input: ')('
 * Output: ['']
 *
 *
 * Analysis
 * Time: O(2^N) worst case. If we have remove & consider options for all chars.
 * Space: O(N) <-- recursion space & not including output
 * Below beats 99% time & 100% space on LC by maximizing pruning with checks.
 *
 */


/**
 * @param {string} str
 * @return {string[]}
 */
module.exports = function removeInvalidParentheses( str ) {
  if ( str.len < 2 )
    return [str.replace( /[()]/g, '' )];

  let [lefts, rights] = [0,0],
    [badLefts, badRights] = [0,0];

  for ( const char of str ) {
    if ( isLeft( char ) )
      lefts++;
    else if ( isRight( char ) )
      lefts <= rights ? badRights++ : rights++;
  }

  badLefts = lefts - rights;
  lefts -= badLefts;

  if ( !lefts || !rights )
    return [str.replace( /[()]/g, '' )];

  const set = new Set(),
    validate = getValidate( str, set );

  validate( '', 0, lefts, rights, badLefts, badRights );

  return Array.from( set );
};

const getValidate = ( str, set ) =>
  function validate( cur, i, lCnt, rCnt, lRmv, rRmv ) {
    if ( i === str.length )
      return set.add( cur );

    const char = str[i],
      cur_ = cur + char;

    i++;

    if ( isLeft( char ) ) {
      lRmv && validate( cur, i, lCnt, rCnt, lRmv-1, rRmv );
      lCnt && validate( cur_, i, lCnt-1, rCnt, lRmv, rRmv );
    }
    else if ( isRight( char ) ) {
      rRmv && validate( cur, i, lCnt, rCnt, lRmv, rRmv-1 );
      rCnt > lCnt && validate( cur_, i, lCnt, rCnt-1, lRmv, rRmv );
    }
    else {
      validate( cur_, i, lCnt, rCnt, lRmv, rRmv );
    }
  };

const isLeft = char => char === '(';
const isRight = char => char === ')';

/*

...Planning...

GOAL
Remove any parentheses that:
  - are not closed (left, no right)
  - were not opened (right, no left)
# left in end === # right in end

CHOICES
1. Keep bracket.
2. Remove bracket.


str:'())(()'
bad rights: 1, bad lefts: 1

             **'())(()'**
               '' 1,1
                | s=(, !R
              '(' 1,1
              / .s=)  \
         '()' 1,1      '(' 1,0
          | !L    s=)       | !badRight
    '()' 1,0               '()' 1,0
      /     \     s=(      /     \
 '()('1,0   '()'0,0   '()('1,0   '()'0,0
    |          |  s=(    |           | !bads
  '()('0,0   '()()'    '()()'       '()()'
    |
  '()()'

  Do we need to check if included?
  Or can we prune tree with a check to continue if result in same?
   ...condition?
  Immediately finish when no bad lefts or rights?


[x] When place for sure:
  - No bad lefts && no bad rights -> finish
  - Not a parentheses

[X] When remove for sure:
  - Right && lefts > rights
  - Right && bad rights remaining, but no rights remaining
  - Left && bad lefts remaining, but no lefts remaining

[X] When branch:
  - Right && left < right && rights remaining
  - Left && bad lefts remaining and lefts remaining

[x] When add:
  - Cur is expected len ( strLen - badLefts - badRights )
  - Entire string processed

VARS:
  - current char...or str position?
  - current string building
  - Left & right count remaining
  - Bad left, bad right remaining
  - Output arr
*/
