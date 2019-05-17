function median( sortedArray ) {
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
}

export default median;
