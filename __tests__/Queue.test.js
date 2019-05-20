const { Queue } = require( '../structs' );

const q = Object.create( Queue );

describe( 'Queues', () => {
  it( 'initializes', () => {
    const items = [1, 2, 3, 4, 5];
    q.init( items );
    expect( q.array ).toStrictEqual( items );
  } );
  it( 'peeks', () => {
    expect( q.peek ).toEqual( 1 );
  } );
  it( 'enqueues', () => {
    q.enqueue( 6 );
    expect( q.array.length ).toEqual( 6 );
  } );
  it( 'dequeues', () => {
    expect( q.dequeue() ).toEqual( 1 );
    expect( q.dequeue() ).toEqual( 2 );
    expect( q.dequeue() ).toEqual( 3 );
    expect( q.dequeue() ).toEqual( 4 );
    expect( q.dequeue() ).toEqual( 5 );
    expect( q.dequeue() ).toEqual( 6 );
    expect( q.isEmpty ).toBe( true );
  } );
} );
