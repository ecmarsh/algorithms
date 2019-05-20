const { SinglyLinkedList, SLLNode } = require( '../structs' );

const list = Object.create( SinglyLinkedList );
const data = { text: `some mock data`, int: 123 };
let mockSize = 0;

describe( 'Singly Linked List', () => {
  it( 'initializes', () => {
    list.init();
    const expectedList = { head: null, size: mockSize };
    expect( list ).toMatchObject( expectedList );
    expect( list.isEmpty ).toBe( true );
    expect( Object.getPrototypeOf( list ) ).toMatchObject( Object.getPrototypeOf( SinglyLinkedList ) );
  } );

  it( 'constructs nodes', () => {
    const mockNode = new SLLNode( data );
    expect( mockNode ).toBeInstanceOf( SLLNode );
    const expectedNode = { data, next: null };
    expect( mockNode ).toMatchObject( expectedNode );
  } );

  it( 'inserts (always at head)', () => {
    list.insert( data );
    mockSize++;
    expect( list.size ).toEqual( mockSize );
    expect( list.head ).not.toBeNull();
    expect( list.head.data ).toStrictEqual( data );
    expect( list.head.next ).toBeNull();
  } );

  it( 'searches list correctly', () => {
    const mockData = 12345;
    list.insert( mockData );
    mockSize++;
    // Check for some data not in list
    expect( list.has( 54321 ) ).toBe( false );
    // Check for some data in the list
    expect( list.has( mockData ) ).toBe( true );
  } );

  it( 'deletes if data is at head', () => {
    // Insert head to remove
    const headData = `head to remove`;
    // Track size
    list.insert( headData );
    mockSize++;
    expect( list.size ).toEqual( mockSize );
    expect( list.has( headData ) ).toBe( true );

    // Remove with last added `head data`
    list.remove( headData );
    mockSize--;
    expect( list.size ).toEqual( mockSize );
    expect( list.has( headData ) ).toBe( false );
    // Ensure existing data still there
    expect( list.has( data ) ).toBe( true );
  } );

  it( 'removes and reconnects if data is in middle', () => {
    // Insert two to test middle removal
    const headData = `new head`,
      middleData = { middle: `middle data` };
    list.insert( middleData );
    mockSize++;
    list.insert( headData );
    mockSize++;
    expect( list.size ).toEqual( mockSize );
    expect( list.head.data ).not.toBe( middleData );

    // Remove middle
    list.remove( middleData );
    mockSize--;
    expect( list.size ).toEqual( mockSize );
    expect( list.head.data ).toBe( headData );
    expect( list.has( middleData ) ).toBe( false );
    expect( list.head.next ).not.toBeNull();
  } );
} );
