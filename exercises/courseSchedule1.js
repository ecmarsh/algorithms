/**
 * @lc id=207 lang=javascript tag=graph,directed,bfs,topological
 *
 * [207] Course Schedule 1
 *
 * There are a total of numCourses courses you have to take,
 * labeled from 0 to numCourses-1.
 *
 * Some courses may have prerequisites, for example to take course 0,
 * you have to first take course 1, which is expressed as a pair: [0,1]
 *
 * Given the total number of courses and a list of prerequisite pairs,
 * is it possible for you to finish all courses?
 *
 * @constraints
 * - The input prerequisites is a graph represented by a list of edges,
 *   not adjacency matrices.
 * - You may assume that there are no duplicate edges in the
 *   input prerequisites.
 * - 1 <= numCourses <= 10^5
 *
 * @example
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: true
 * Explanation: There are a total of 2 courses to take.
 *  To take course 1 you should have finished course 0. So it is possible.
 *
 * @example
 * Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
 * Output: false
 * Explanation: There are a total of 2 courses to take.
 *  To take course 1 you should have finished course 0, and to take course 0
 *  you should also have finished course 1. So it is impossible.
 *
 * @complexity
 * Let: V = Number of courses, E = prereqs (prereq.length)
 * Time: O(V + E)
 *  - O(E) -> Add edges / prerequisites and create DG
 *  - O(V) -> Worst case gathering all nodes with indegree 0
 *  - O(V) -> Visit node at most once
 * Space: O(V + E)
 *  - O(E) -> Graph and edge list
 *  - O(V) -> Worst case all items in queue
 */

/**
 * Directed Graph - represents courses and their prerequisites.
 * @constructor
 * @param {number} N - number of courses / nodes
 * @property {Map<number>number[]} edges - { courseNum => [...prereq courses] }
 * @property {number[]} inDegrees - index corresponds to node number and indegrees in number of prerequisite courses
 * @method {([course, prereq] []number) => void} addEdge
 */
function DirectedGraph( N ) {
  return {
    edges: new Map,
    inDegrees: Array( N ).fill( 0 ),
    addEdge( [tail, head] ) {
      if ( !this.edges.has( head ) ) {
        this.edges.set( head, [] );
      }
      this.edges.get( head ).push( tail );
      this.inDegrees[tail] += 1;
    },
  };
}

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
module.exports.bfs = function canFinishAllCourses( numCourses, prerequisites ) {
  // Early return if only 1 course or no prequisites
  if ( numCourses <= 1 || prerequisites.length <= 1 ) {
    return true;
  }

  // Build directed graph representation of courses,
  // where each nodes neighbors are that nodes preqeuisites.
  // Eg for [1,0], meaning you need to take course 0 before 1,
  // we'd add edges: { 1 -> [0] }.
  const graph = new DirectedGraph( numCourses );
  prerequisites.forEach( ( prereq ) => {
    graph.addEdge( prereq );
  } );


  // Start traversal from nodes with indegrees of 0,
  // which means that no prerequistes are required to take course.
  const queue = [];
  graph.inDegrees.forEach( ( inDegree, node ) => {
    if ( inDegree === 0 ) {
      queue.push( node );
    }
  } );

  // Nodes (courses) in the queue mean all prerequisites have
  // been satisfied. When this happens, we can begin to visit, "take"
  // the courses depending on that course as a prerequisite.
  // inDegrees represents number of prerequisites for course,
  // so when we take its dependent course, we decrease the inDegree.
  // And when all of that prerequistes courses have been satisfied,
  // we add it to the queue to repeat the process.
  let coursesTaken = 0;

  while ( queue.length ) {
    const node = queue.shift();

    // We know that if it's in the queue, the courses is 0,
    // so we can add this course as taken.
    coursesTaken += 1;
    // All courses can be taken/visited.
    if ( coursesTaken === numCourses ) {
      return true;
    }

    const neighbors = graph.edges.get( node ) || [];
    neighbors.forEach( ( neighbor ) => {
      // Mark it as visited/taken by decreasing indegree
      graph.inDegrees[neighbor] -= 1;
      // This means all prereqs were satisfied/visited
      // so its now safe to take this course and try to
      // complete courses depending on this node.
      if ( graph.inDegrees[neighbor] === 0 ) {
        queue.push( neighbor );
      }
    } );
  }

  return coursesTaken >= numCourses;
};
