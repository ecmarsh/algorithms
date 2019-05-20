const { DoublyLinkedList, DLLNode } = require( '../structs' );

const list = Object.create( DoublyLinkedList );
const data = { text: `some data`, int: 1 };
let mockSize = 0;

describe( 'Doubly Linked List', () => {
  it( 'initializes', () => {
    list.init();
    const expectedList = {
      head: null,
      tail: null,
      size: mockSize,
    };
    expect( list ).toMatchObject( expectedList );
    expect( Object.getPrototypeOf( list ) ).toMatchObject( Object.getPrototypeOf( DoublyLinkedList ) );
  } );

  it( 'constructs nodes', () => {
    const mockNode = new DLLNode( data );
    expect( mockNode ).toBeInstanceOf( DLLNode );
    const expectedNode = { data, next: null, prev: null };
    expect( mockNode ).toMatchObject( expectedNode );
  } );

  it( 'adds first node as head and tail', () => {
    list.insertAtHead( data );
    mockSize++;
    expect( list.size ).toEqual( mockSize );
    expect( list.head ).toMatchObject( list.tail );
  } );

  it( 'inserts at the head', () => {
    const headData = `some data here`;
    list.insertAtHead( headData );
    mockSize++;
    expect( list.head.data ).toStrictEqual( headData );
    // Check pointers
    expect( list.head.prev ).toBeNull();
    expect( list.head.next ).not.toBeNull();
    expect( list.head.next.prev ).toBe( list.head ); // Object.is() equality
    expect( list.head.next.next ).toBeNull();
  } );

  it( 'inserts at the tail', () => {
    const tailData = [`new`, `tail`, `data`];
    list.insertAtTail( tailData );
    mockSize++;
    expect( list.size ).toEqual( mockSize );
    expect( list.tail.data ).toStrictEqual( tailData );
    // Check pointers
    expect( list.tail.prev ).toBeDefined();
    expect( list.tail.prev.next ).toBe( list.tail );
    expect( list.tail.next ).toBeNull();
  } );

  it( 'deletes at head or tail', () => {
    // Insert something to delete at both ends
    const [headData, tailData] = [`head to delete`, `tail to delete`];
    // Track size
    list.insertAtHead( headData );
    mockSize++;
    list.insertAtTail( tailData );
    mockSize++;
    expect( list.size ).toEqual( mockSize );

    // Delete at head --> expect what we added
    const deleteAtHead = list.deleteAtHead();
    mockSize--;
    expect( deleteAtHead ).toBe( headData );
    expect( list.size ).toEqual( mockSize );
    // Delete at tail --> expect what we added
    const deleteAtTail = list.deleteAtTail();
    mockSize--;
    expect( deleteAtTail ).toBe( tailData );
    expect( list.size ).toEqual( mockSize );
    // Ensure still connected
  } );

  it( 'searches correctly from head', () => {
    // Check for some data not in list
    expect( list.search( `i am not in list` ) ).toBe( false );
    // Check for some data in the list
    expect( list.search( data ) ).toBe( true );
  } );

  it( 'searches correctly from tail', () => {
    // Check for some data not in list
    // `false` param to indicate start at tail
    expect( list.search( `wont find me!`, false ) ).toBe( false );
    // Check for some data in the list
    expect( list.search( data, false ) ).toBe( true );
  } );
} );
