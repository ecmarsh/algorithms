const { HashTable } = require( '../structs' );

// Mock data
const size = 11,
  mockTable = Object.create( HashTable ),
  keys = [12, 13, 25, 29, 31, 27],
  names = [`john`, `mary`, `bob`, `eric`, `amy`, `zeke`];

describe( `Hash Table delegator`, () => {
  it( 'initalizes', () => {
    mockTable.init( size );
    expect( mockTable.size ).toEqual( size );
    expect( mockTable.keys.length ).toEqual( size );
    expect( mockTable.values.length ).toEqual( size );
    expect( mockTable.items ).toEqual( 0 );

    const proto = Object.getPrototypeOf( mockTable );
    expect( proto ).toHaveProperty( `hash` );
    expect( proto ).toHaveProperty( `getItem` );
    expect( typeof proto.getItem ).toBe( `function` );
    expect( proto ).toHaveProperty( `setItem` );
    expect( typeof proto.setItem ).toBe( `function` );
  } );

  it( `sets items`, () => {
    // Ensure mock keys/names correct
    expect( keys.length ).toEqual( names.length );
    // Input mock data to hashtable
    for ( let i = 0; i < keys.length; i++ ) {
      mockTable.setItem( keys[i], names[i] );
    }
    // Sets keys
    expect( mockTable.keys ).toContain( 13 );
    expect( mockTable.keys ).toContain( 31 );
    // Sets values
    expect( mockTable.values ).toContain( names[0] );
    expect( mockTable.values ).toContain( names[2] );
    expect( mockTable.values ).toContain( names[4] );
  } );

  it( `gets items given original key`, () => {
    const john = mockTable.getItem( 12 );
    const bob = mockTable.getItem( 25 );
    const amy = mockTable.getItem( 31 );

    expect( john ).toBe( `john` );
    expect( bob ).toBe( `bob` );
    expect( amy ).toBe( `amy` );
  } );

  it( `resolves collisions`, () => {
    // 29 = hashedKeyIndex[2]
    expect( mockTable.keys[2] ).toEqual( 29 );

    // hash(51) -> (11-2) - (51 % 11) % (11-2) = 2 -> collision
    mockTable.setItem( 51, `collider` );
    expect( mockTable.keys ).toContain( 51 );
    expect( mockTable.keys[3] ).toEqual( 51 );
  } );

  it( `allows duplicates without overwrites`, () => {
    // Create another table
    const anotherTable = Object.create( HashTable );
    const differentSize = 7;
    anotherTable.init( differentSize );

    // Check each size
    expect( mockTable.size ).toEqual( size );
    expect( anotherTable.size ).toEqual( differentSize );

    // Ensure no interactions between tables
    const anotherName = `juanita`;
    anotherTable.setItem( 18, anotherName );
    expect( mockTable.getItem( 18 ) ).toBe( undefined );
    expect( anotherTable.getItem( 18 ) ).toBe( anotherName );
  } );
} );
