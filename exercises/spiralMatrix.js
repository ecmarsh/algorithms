module.exports = function spiralOrder( matrix ) {
  const res = [];
  if ( !matrix[0] ) { return []; }

  let topRow = 0,
    leftCol = 0,
    btmRow = matrix.length - 1,
    rightCol = matrix[0].length - 1;

  while ( topRow <= btmRow && leftCol <= rightCol ) {
    // Right -> Left
    for ( let col = leftCol; col <= rightCol; col++ ) {
      res.push( matrix[topRow][col] );
    }
    topRow++;

    // Top -> Bottom
    for ( let row = topRow; row <= btmRow; row++ ) {
      res.push( matrix[row][rightCol] );
    }
    rightCol--;

    // Right -> Left
    if ( topRow <= btmRow ) {
      for ( let col = rightCol; col >= leftCol; col-- ) {
        res.push( matrix[btmRow][col] );
      }
    }
    btmRow--;

    // Bottom -> Top
    if ( leftCol <= rightCol ) {
      for ( let row = btmRow; row >= topRow; row-- ) {
        res.push( matrix[row][leftCol] );
      }
    }
    leftCol++;
  }
  return res;
};
