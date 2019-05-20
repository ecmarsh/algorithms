const { Stack, accessStack, stackHas } = require( '../structs' );

describe( 'Stack and helpers', () => {
  // initalization
  it( 'initalizes a stack object', () => {
    const s = Object.create( Stack );
    const items = `stack`;
    s.init( items );
    expect( s.array ).toStrictEqual( Array.from( items ) );
    expect( s.isEmpty ).toBe( false );
  } );

  // methods
  it( 'adds items and does peek', () => {
    const s = Object.create( Stack );
    s.init();
    expect( s.isEmpty ).toBe( true );
    s.push( `item1` );
    s.push( `item2` );
    expect( s.isEmpty ).toBe( false );
    expect( s.top ).toEqual( `item2` );
  } );

  // accessStack
  it( 'can access with `accessStack` helper', () => {
    const s = Object.create( Stack );
    s.init( [5, 4, 3, 2, 1] );
    const third = accessStack( s, 3 );
    expect( third ).toEqual( 3 );
  } );

  // stackHas
  it( 'can be searched with `stackHas` helper', () => {
    const s = Object.create( Stack );
    s.init( [5, 4, 3, 2, 1] );
    expect( stackHas( s, 4 ) ).toBe( true );
    expect( stackHas( s, 0 ) ).toEqual( false );
  } );
} );
