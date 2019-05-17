import { isArray, isInteger } from 'lodash';

function swap( arr, a, b ) {
  // Validate arguments
  if ( !isArray( arr ) ) {
    throw new Error( 'Invalid array' );
  }
  if ( !isInteger( a ) || arr[a] === 'undefined' ) {
    throw new Error( 'First index invalid' );
  }
  if ( !isInteger( b ) || arr[b] === 'undefined' ) {
    throw new Error( 'Second index invalid' );
  }
  // Swap
  const tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

export default swap;
