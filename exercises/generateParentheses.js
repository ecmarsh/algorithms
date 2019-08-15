/**
 * Generate Parentheses
 *
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 */

/**
 * @param {number} n
 * @return {string[]}
 */
module.exports = function generateParentheses( n ) {
  if ( !n ) {
    return [];
  }

  if ( n === 1 ) {
    return ['()'];
  }

  const combinations = [],
    [left, right] = ['(', ')'];

  placeParen( [], n, n );

  function placeParen( combo, lefts, rights ) {
    // Base case: lefts and rights all used
    if ( !lefts && !rights ) {
      combinations.push( combo );
      return;
    }

    // Constructors: add left if available, close if open
    if ( lefts ) {
      placeParen( combo+left, lefts-1, rights );
    }
    if ( lefts < rights ) {
      placeParen( combo+right, lefts, rights-1 );
    }
  }

  return combinations;
};

/*

n=3

Goal:
  Place 3 lefts, '('
  Place 3 rights, ')'

Well-formed parentheses:
  1. right must have a corresponding left occuring before
     - lefts < rights to place right

  2. all lefts must be closed with a right
     - lefts & rights === 0 denotes end

LR= 33-> [23]-> [13,22]  -> [ 03, 12 ]  ->  [ 02, 11 ]      -> [ 01 ]-> 00
p = ''-> '('->['((','()']->['(((','()(']->['((()', '()()']-> '((()))','()()()'

*/

/* eslint-disable */
/*
Recursion Tree
n = 2
                     
           *2,2,''*
             | L=R
            1,2,'('
           /      \
   0,2,'(('         1,1,'()'
      | !L           | L=R
   0,1,'(()'        0,1,'()('
      |  !L          | !L
   0,0,'(())'       0,0,'()()'

*/
