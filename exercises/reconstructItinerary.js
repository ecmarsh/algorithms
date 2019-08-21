/**
 * Reconstruct Itinerary
 *
 * Given a list of airline tickets represented by
 * pairs of departure and arrival airports [from, to],
 * reconstruct the itinerary in order.
 * All of the tickets belong to a man who departs from JFK.
 * Thus, the itinerary must begin with JFK.
 *
 * **Note**:
 * 1. If there are multiple valid itineraries,
 *    you should return the itinerary that has the
 *    smallest lexical order when read as a single string.
 *    For example, the itinerary ["JFK", "LGA"] has a
 *    smaller lexical order than ["JFK", "LGB"].
 * 2. All airports are represented by three capital letters (IATA code).
 * 3. You may assume all tickets form at least one valid itinerary.
 *
 * @example
 * Input: ["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]
 * Output: ["JFK", "MUC", "LHR", "SFO", "SJC"]
 *
 * @example
 * Input: ['JFK','SFO'],['JFK','ATL'],['SFO','ATL'],['ATL','JFK'],['ATL','SFO']
 * Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
 * Explanation: Another possible reconstruction is
 * ["JFK","SFO","ATL","JFK","ATL","SFO"],
 * but it is larger in lexographical order.
 *
 * **Analysis**
 * E = edges = 2 * len(tickets)
 * Time: O(E^2) in below implementation or O(E log E) with sort.
 * For this case, below implemenation is practically quicker
 * than sorting tickets in reverse before hand even though better Big O.
 * Space: O(E), the stack.
 *
 */

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
module.exports = function findItinerary( tickets ) {
  const flights = new Map();
  for ( const [from, to] of tickets ) {
    if ( !flights.has( from ) ) {
      flights.set( from, [] );
    }
    // Store in descending order since popping right.
    let i = 0;
    const destinations = flights.get( from );
    while ( i < destinations.length && to < destinations[i] ) {
      i++;
    }
    destinations.splice( i, 0, to );
  }

  const itinerary = [];

  const s = new Stack();
  s.push( 'JFK' );

  while ( s.size() ) {
    // Trace back the flights as far as possible.
    let airport = s.peek();
    while ( flights.has( airport ) && flights.get( airport ).length ) {
      airport = flights.get( airport ).pop(); // Trace its destination
      s.push( airport );
    }
    // Add the airport we got stuck at,
    // the last item on the stack,
    // to the beginning of the route.
    itinerary.unshift( s.pop() );
  }

  return itinerary;
};

class Stack {
  constructor() {
    this.items = [];
  }
  size() {
    return this.items.length;
  }
  push( item ) {
    this.items.push( item );
  }
  peek() {
    return this.items[this.size() - 1];
  }
  pop() {
    return this.items.pop();
  }
}

/*

ticket = [from, to]

1. All itineraries start with JFK. eg tickets[0] = [JFK, to]
2. Choose itinerary with smallest lexical (alphabetical) order.
3. All airports are three capital letters.
4. Each ticket will have at least one valid itinerary.

Goal: Reconstruct valid airport order, alpha order if multiple.

[MUC, LHR], [JFK, MUC], [SFO, SJC], [LHR, SFO]

MUC->LHR
JFK->MUC
SFO->SJC
LHR->SFO

JFK->MUC->LHR->SFO->SJC


--------------

JFK->SFO
JFK->ATL
SFO->ATL
ATL->JFK
ATL->SFO

IN:
JFK: 1
ATL: 2
SFO: 2

Eularian path:
  - each edge (flight) gets visited exactly one time,
  - vertices (airports) may be revisited

We check for exit each time which will have an odd degree,
and add the exit ( last arrival ) to beginning of path.

To check for exit, trace along path until get stuck.
Then add the airport we got stuck at to beginning of path.
Continue doing so until all airports used.

So we start tracing from JFK, add its 'tos'.
Then we trace each it back by checking 'froms' in flight list.
If there's no corresponding from, we know its exit.
Push all items back onto stack in order received.
Then pop the last item back ( the one we got stuck on )
  and add to beginning of route.
Repeat with remaining flights from stack.

Once all flights are gone, the route will have the order of the flights.

Also called Hierholzer's Algorithm.

Analysis:
E = edges = Ticket.length*2

Space: O(E) for map with all airports visited
Time:
Build: O(E)
Worst case is back and forth with ascending order,
and have to go to end of "to's" list every time
= E so E*E = E^2

For making route:
E + E - 1 + E-2, ... 1 -> E
E^2 + E -> E^2

Technically can sort in reverse before (assume E log E ) instead
of nested insertion to make time E log E, but average case
the insertion method performs better.

*/
