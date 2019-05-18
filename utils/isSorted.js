const isArrayLike = require( 'lodash/isArrayLike' );

// NOTE: Adds an extra loop to searches/sorts
//       but only for validation purposes

module.exports = function isSorted( array ) {
  if ( !isArrayLike( array ) ) {
    return false;
  }

  for ( let i = 1; i < array.length; i++ ) {
    if ( array[i - 1] > [array[i]] ) {
      return false;
    }
  }

  return true;
};
