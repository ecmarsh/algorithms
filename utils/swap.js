import isValidArray from './isValidArray';
import isNumber from './isNumber';

function swap( arr, a, b ) {
  // Validate arguments
  if ( !isValidArray( arr ) ) {
    throw new Error( 'Invalid arguments' );
  }
  if ( !isNumber( a ) || arr[a] === 'undefined' ) {
    throw new Error( 'First index invalid' );
  }
  if ( !isNumber( b ) || arr[b] === 'undefined' ) {
    throw new Error( 'Second index invalid' );
  }
  // Swap
  const tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

export default swap;
