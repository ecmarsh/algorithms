const { MinHeap, MaxHeap } = require( '../structs' );


describe( 'Binary Heap (Heap Sort)', () => {
  const arbitraryNumbers = [1, 10, 5, 100, 27, 8, 33];

  test( 'Min Heap', () => {
    const minHeap = new MinHeap();
    arbitraryNumbers.forEach( num => minHeap.add( num ) );
    expect( minHeap.size() ).toEqual( arbitraryNumbers.length );

    const ascendingOrder = [...arbitraryNumbers].sort( ( a, b ) => a - b );
    for ( const min of ascendingOrder ) {
      expect( minHeap.poll() ).toEqual( min );
    }
  } );

  test( 'Max Heap', () => {
    const maxHeap = new MaxHeap();
    arbitraryNumbers.forEach( num => maxHeap.add( num ) );
    expect( maxHeap.size() ).toEqual( arbitraryNumbers.length );

    const descendingOrder = [...arbitraryNumbers].sort( ( a, b ) => b - a );
    for ( const max of descendingOrder ) {
      expect( maxHeap.poll() ).toEqual( max );
    }
  } );
} );
