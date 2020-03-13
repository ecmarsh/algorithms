/**
 * @lc id=1376 lang=javascript tag=dfs
 *
 * [1376] Time Needed to Inform All Employees
 *
 * A company has n employees with a unique ID for each employee from
 * 0 to n - 1. The head of the company has is the one with headID.
 *
 * Each employee has one direct manager given in the manager array where
 * manager[i] is the direct manager of the i-th employee, manager[headID] = -1.
 * Also it's guaranteed that the subordination relationships
 * have a tree structure.
 *
 * The head of the company wants to inform all the employees of the company
 * of an urgent piece of news. He will inform his direct subordinates and they
 * will inform their subordinates, so on until all employees are informed.
 *
 * The i-th employee needs informTime[i] minutes to inform all of his direct
 * subordinates (i.e After informTime[i] minutes, all of his direct
 * subordinates can start spreading the news).
 *
 * Return the number of minutes needed to inform all of the employees
 * about the urgent news.
 *
 * @constraints
 * - `1 <= n <= 10^5`
 * - `0 <= headID < n`
 * - `manager.length == n`
 * - `0 <= manager[i] < n`
 * - `manager[headID] == -1`
 * - `informTime.length == n`
 * - `0 <= informTime[i] <= 1000`
 * - `informTime[i] == 0 if employee i has no subordinates.`
 * - `It is guaranteed that all the employees can be informed.`
 *
 * @example
 * Input: n = 1, headID = 0, manager = [-1], informTime = [0]
 * Output: 0
 * Explanation: The head of the company is the only employee in the company.
 *
 * @example
 * Input: n = 6, headID = 2,
 *        manager = [2,2,-1,2,2,2],
 *        informTime = [0,0,1,0,0,0]
 * Output: 1
 * Explanation: The head of the company with id = 2 is the direct manager of
 * all the employees in the company and needs 1 minute to inform them all.
 * The tree structure of the employees in the company is shown.
 *                   2
 *             /  /  |  \ \
 *            0  1  3   4  5
 *
 * @example
 * Input: n = 15, headID = 0,
 *        manager = [-1,0,0,1,1,2,2,3,3,4,4,5,5,6,6],
 *        informTime = [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]
 * Output: 3
 * Explanation: The first minute the head will inform employees 1 and 2.
 *              The second minute they will inform employees 3, 4, 5 and 6.
 *              The third minute they will inform the rest of employees.
 *
 * @example
 * Input: n = 4, headID = 2, manager = [3,3,-1,2], informTime = [0,0,162,914]
 * Output: 1076
 *
 *
 * @complexity
 * Time: O(N) to create tree nodes, O(H) for traversal -> O(N)
 * Space: O(N) to hold nodes, O(H) for recursive stack space -> O(N)
 */

/**
 * @param {number} n number of employees
 * @param {number} headID root
 * @param {number[]} manager manager[i] direct manager of ith employee
 * @param {number[]} informTime i-th employee needs informTime[i] mins
 * @return {number} total number of minutes need to inform all employees
 */
module.exports = function timeToInformAllEmployees( n, headID, manager, informTime ) {
  if ( n <= 2 ) return informTime[headID];

  const nodes = Array( n );

  manager.forEach( ( mgr, i ) => {
    nodes[i] = new TreeNode( mgr, informTime[i] );
  } );

  nodes.forEach( ( node, i ) => {
    if ( node.mgr >= 0 ) {
      nodes[node.mgr].children.push( node );
    }
  } );

  let maxTime = 0;

  const traverse = function ( node, curTime ) {
    if ( !node.children.length ) return;
    node.children.forEach( ( childNode ) => {
      maxTime = Math.max( maxTime, curTime + childNode.time );
      traverse( childNode, curTime + childNode.time );
    } );
  };

  traverse( nodes[headID], nodes[headID].time );

  return maxTime;
};

const TreeNode = function ( mgr, time ) {
  return {
    mgr,
    time,
    children: [],
  };
};
