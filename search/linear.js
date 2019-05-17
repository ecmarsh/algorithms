import isArrayLike from 'lodash/isArrayLike';

function linearSearch( arr, v ) {
  if ( !isArrayLike( arr ) || typeof v === 'undefined' ) {
    throw new Error( 'Invalid arguments' );
  }
  // Loop and evaluate
  for ( let i = 0; i < arr.length; i++ ) {
    if ( arr[i] === v ) {
      return i;
    }
  }
  // Not found
  return -1;
}

// [best, worst] = [O(1), O(n)]
// Time: O(n)

export default linearSearch;
