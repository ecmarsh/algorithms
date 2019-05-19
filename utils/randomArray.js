const isSorted = require( './isSorted' );
const swap = require( './swap' );

module.exports = function randomArray( requestedLength = 8, duplicates = true ) {
  const array = [];
  while ( array.length < requestedLength ) {
    // Generate random number
    const i = Math.ceil( Math.random() * requestedLength ** 2 );

    // Fill array
    duplicates ? array.push( i ) : treatAsSet();

    function treatAsSet() {
      // Add n if not yet in array
      if ( !array[array.findIndex( ( el ) => el === i )] ) {
        array.push( i );
      }
    }
  }

  // Ensure unsorted for tests
  if ( isSorted( array ) ) {
    swap( array, 0, 1 );
  }

  return array;
};
