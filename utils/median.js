function median( sortedArray ) {
  const n = sortedArray.length;

  // Odd length
  if ( n % 2 === 1 ) {
    const _medianIdx = Math.floor( n / 2 );
    return sortedArray[_medianIdx];
  }

  // Even length
  const _left = n / 2 - 1,
    _right = n / 2,
    _medianIdx = ( _left + _right ) / 2;
  return sortedArray[_medianIdx];
}

export default median;
