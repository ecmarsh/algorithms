import { partition } from '../utils';

describe( 'partition helper', () => {
  const mockArray = [4, 5, 1, 2, 3]; // N=5
  let pIdx; // partition index
  it( 'runs and returns centered partition index', () => {
    pIdx = partition( mockArray, 0, mockArray.length - 1 );
    expect( pIdx ).toEqual( 2 );
  } );
  it( 'moves smaller elements to lower indices', () => {
    const pivot = mockArray[pIdx];
    expect( mockArray[pIdx - 1] ).toBeLessThanOrEqual( pivot );
    expect( mockArray[pIdx - 2] ).toBeLessThanOrEqual( pivot );
  } );
  it( 'moves larger elements to higher indices', () => {
    const pivot = mockArray[pIdx];
    expect( mockArray[pIdx + 1] ).toBeGreaterThan( pivot );
    expect( mockArray[pIdx + 2] ).toBeGreaterThan( pivot );
  } );
} );
