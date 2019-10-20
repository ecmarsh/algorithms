/**
 * @=lc id=1232 lang=javascript
 *
 * [1232] Check If It Is a Straight Line
 * Weekly Contest 159
 *
 * You are given an array `coordinates`, where
 * `coordinates[i] = [x,y]` and `[x,y]` corresponds
 * to a point on the cartesian plane.
 *
 * Check if these points make a straight line in the plane.
 *
 * @constraints
 *   - `2 <= coordinates.length <= 1000`
 *   - `coordinates[i].length == 2`
 *   - `10^4 <= coordinates[i][0], coordinates[i][1] <= 10^4`
 *   - coordinates contains no duplicate point.
 *
 *
 * @example
 * Input: [[1,2],[2,3],[3,4],[4,5],[5,6]]
 *        ⌃
 *        |
 *        |         x
 *        |       x
 *        |     x
 *        |   x
 *        | x
 *        |
 *        + - - - - - - - >
 * Output: true
 *
 * @example
 * Input: [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]
 *        ⌃
 *        |             x
 *        |         x
 *        |       x
 *        |     x
 *        |
 *        |   x
 *        | x
 *        + - - - - - - - >
 * Output: false
 *
 *
 * @complexity
 * n is number of points
 * Time: O(n)
 * Space: O(1)
 */

/**
 * @param {number[][]} P, points, coordinates
 * @returns {boolean}
 */
module.exports = function isStraightLine( P ) {
  if ( !P || P.length === 2 ) {
    return true;
  }

  const [x1, y1] = P[0];
  const [x2, y2] = P[1];

  for ( let i = 0; i <= P.length; i++ ) {
    const [X, Y] = P[i];
    if ( ( Y - y1 )*( X - x2 ) !== ( Y - y2 )*( X - x1 ) ) {
      return false;
    }
  }

  return true;
};

/*

Definition of a straight line:
  If any two points in the coordinates have the same slope.
The point through two points (x',y') and (x'', y'') is given:
  (y'' - y') / (x'' - x')
Now if we have a third point, (x''', y'''), the slope to each of
the other points should be equal to each other. That is:
  (y''' - y') / (x''' - x') = (y''' - y'') / (x''' - x'')
In case (x* - x*) is zero, we'll get a zero division error,
so move around the formula to create multiplication instead:
  (y''' - y') * (x''' - x'') = (y''' - y'') * (x''' - x')

It doesn't matter what the x',y' or x'', y'' are for comparison,
as long as they are in the same set, so we can use the first two points.
And avoid an out-of-bounds error by checking if number of points > 2,
since the line between just two points is a straight line.

If for all points [3:n] the test passes, it's a straight line.
*/
