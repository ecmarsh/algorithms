/**
 * @param {number} rowIndex
 * @return {number[]}
 */

module.exports = function getRow( rowIndex ) {
  // Base case
  if ( rowIndex === 0 ) {
    return [1];
  }

  const prev = getRow( rowIndex - 1 ); // Previous row [...]
  const row = []; // Init requested row

  for ( let i = 0; i <= rowIndex; i++ ) {
    if ( i === 0 || i === rowIndex ) {
      row.push( 1 ); // First or last is 1
    } else {
      row.push( prev[i - 1] + prev[i] );
    }
  }

  return row;
};
