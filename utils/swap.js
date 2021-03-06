const isArray = require( 'lodash/isArray' );
const isInteger = require( 'lodash/isInteger' );

module.exports = function swap( arr, a, b ) {
  // Validate arguments
  if ( !isArray( arr ) ) {
    throw Error( 'Invalid array.' );
  }
  if ( !isInteger( a ) || arr[a] === undefined ) {
    throw Error( 'First index invalid.' );
  }
  if ( !isInteger( b ) || arr[b] === undefined ) {
    throw Error( 'Second index invalid.' );
  }
  // Swap
  const tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
};
