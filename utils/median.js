const isSorted = require( './isSorted' );

module.exports = function median( sortedArray ) {
  if ( !isSorted( sortedArray ) ) {
    throw new Error( 'Invalid array' );
  }

  const n = sortedArray.length;

  // Odd length
  if ( n % 2 === 1 ) {
    const _medianIdx = Math.floor( n / 2 );
    return sortedArray[_medianIdx];
  }

  // Even length
  const _left = n / 2 - 1,
    _right = n / 2;
  return ( sortedArray[_left] + sortedArray[_right] ) / 2;
};
