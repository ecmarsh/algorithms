/**
 * K-th Symbol in Grammar
 *
 * On the first row, we write a 0.
 * Now in every subsequent row, we look at the previous row
 * and replace each occurrence of 0 with 01,
 * and each occurrence of 1 with 10.
 *
 * Given row N and index K,
 * return the K-th indexed symbol in row N.
 *
 * Note the values of K and N are 1-indexed.
 */

/**
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
module.exports = function kthGrammar( N, K ) {
  let isParent = 0;

  if ( K < 3 ) {
    return K-1;
  }

  const isEven = n => !( n & 1 );

  for ( N; N > 1; --N ) {
    if ( isEven( K ) ) {
      isParent = !isParent;
    }

    K = Math.ceil( K / 2 );
  }

  // If kth isParent which is now row 1 (0)
  return +isParent;
};

/*
N = 4, K = 5 --> 1

 N
---
1:            0
          /       \
2:      0           1
      /   \       /   \
3:   0     1     1     0
    / \   / \   / \   / \
4: 0   1 1   0 1   0 0   1
---            ^
K: 1   2 3   4*5*  6 7   8

If K is odd, K is same as parent row.
If K is even, K is not same as parent row.
K(n-1) will be ceil(K / 1)
*/
