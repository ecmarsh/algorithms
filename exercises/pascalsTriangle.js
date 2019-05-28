/**
 * Pascal's Triangle
 *
 * Base: f(i,j)=1 where j=1 || j=i
 * Recurrence Relation: f(i,j)=f(i−1,j−1)+f(i−1,j)
 *
 * Example:
 * f(5,3) // third row
 * 1. f(5,3)=f(4,2)+f(4,3)
 *   a. f(4,2)=f(3,1)+f(3,2)=f(3,1)+(f(2,1)+f(2,2))=1+(1+1)=3
 *   b.f(4,3)=f(3,2)+f(3,3)=(f(2,1)+f(2,2))+f(3,3)=(1+1)+1=3
 * 2. f(5,3)=f(4,2)+f(4,3)=3+3=6
 *
 * NOTE The duplicate calculations (need to memo)
 */

/**
 * @param {number} numRows Number of rows.
 * @return {Array<Array<number>>} Pascals triangle.
 *
 * Assume: n is non-negative integer.
 */

module.exports = function pascalsTriangle( numRows ) {
  const triangle = [];
  for ( let i = 0; i < numRows; i++ ) {
    const row = triangle[i] = Array( i + 1 );
    for ( let j = 0; j < i + 1; j++ ) {
      if ( i === 0 ) {
        row[j] = 1;
      }
      else {
        const prevRow = triangle[i - 1];
        row[j] = ( prevRow[j - 1] || 0 ) + ( prevRow[j] || 0 );
      }
    }
  }
  return triangle;
}
;
