const { HashTable } = require( '../structs' );

const size = 11,
  mockTable = new HashTable( size ),
  keys = [12, 13, 25, 29, 31, 30],
  names = ['john', 'mary', 'bob', 'eric', 'amy', 'zeke'];

describe( 'hash table', () => {
  it( 'throws without prime size', () => {
    expect( () => new HashTable( 4 ) ).toThrow( /Choose a prime number/ );
  } );

  it( 'hashes and puts data', () => {
    // Input mock data to hashtable
    expect( keys.length ).toEqual( names.length );
    for ( let i = 0; i < keys.length; i++ ) {
      mockTable.put( keys[i], names[i++] );
    }
    expect( mockTable.size ).toEqual( size );
    expect( mockTable.values ).toContain( names[0] );
    expect( mockTable.values ).toContain( names[2] );
    expect( mockTable.values ).toContain( names[4] );
  } );

  it( 'gets set with key', () => {
    const john = mockTable.get( 12 );
    const bob = mockTable.get( 25 );
    const amy = mockTable.get( 31 );

    expect( john ).toBe( 'john' );
    expect( bob ).toBe( 'bob' );
    expect( amy ).toBe( 'amy' );
  } );
} );
