/* eslint-disable curly */
/**
 * Edit Distance
 *
 * Given two words word1, word2, find the minimum number
 * of operations required to convert word1 to word2.
 *
 * You have the following 3 ops permitted on a word:
 * 1. Insert a character.
 * 2. Delete a character.
 * 3. Replace a character.
 *
 * @example
 * Input: word1 = 'horse', word2 = 'ros'
 * Output: 3
 * Explanation:
 * horse -> rorse (replace 'h' with 'r')
 * rorse -> rose (remove 'r')
 * rose -> ros (remove 'e')
 *
 * @example
 * Input: word1 = 'intention', word2 = 'execution'
 * Output: 5
 * Explanation:
 * intention -> intention (remove 't')
 * intention -> ententiion (replace 'i' with 'e')
 * entention -> exention (replace 'n' with 'x')
 * extention -> exection (replace 'n' with 'c')
 * exection -> execution (insert 'u')
 *
 * Analysis
 * Time: 0(w1 * w2) <-  to fill each cell of table
 * Space: O(w1 * w2) <- DP table...or
 * see _editDistance alt for min(w1,w2) space implementation.
 *
 */

/**
 * @param {string} w1
 * @param {string} w2
 * @return {number}
 */
module.exports = function minDistance( w1, w2 ) {
  if ( !w1 || !w2 )
    return w1.length || w2.length;
  if ( w1 === w2 )
    return 0;

  const rows = w1.length + 1,
    cols = w2.length + 1,
    dp = makeGrid( rows, cols );

  for ( let r = 1; r < rows; r++ ) {
    for ( let c = 1; c < cols; c++ ) {
      if ( w1[r-1] === w2[c-1] ) {
        dp[r][c] = dp[r-1][c-1];
        continue;
      }

      const up = r - 1,
        left = c - 1,
        ins = dp[up][c],
        del = dp[r][left],
        repl = dp[up][left];

      dp[r][c] = Math.min( ins, del, repl ) + 1;
    }
  }

  return dp[w1.length][w2.length];
};


function makeGrid( r, c ) {
  return Array( r ).fill( 0 ).map( ( _, i ) => i === 0
    ? Array( c ).fill( 0 ).map( ( _, i ) => i )
    : Array( c ).fill( i ) );
  /*
   [ [c c c]
   r [0 1 2]
   r [1 1 1]
   r [2 2 2]
   ]
  */
}

/*
 * Same idea, but using min(w1, w2) space
 * by only storing the previous row.
 */
module.exports._editDistance = function ( w1, w2 ) {
  if ( !w1 || !w2 )
    return w1.length || w2.length;

  let min, max;
  if ( w1.length < w2.length ) {
    min = w1;
    max = w2;
  }
  else {
    min = w2;
    max = w1;
  }

  const rows = max.length + 1, cols = min.length + 1;

  let prev = Array( cols ).fill( 0 ).map( ( _, i ) => i );

  for ( let i = 1; i < rows; i++ ) {
    const cur = Array( cols ).fill( 1 );
    cur[0] = i;

    for ( let j = 1; j < cols; j++ ) {
      cur[j] += max[i-1] === min[j-1]
        ? prev[j-1] - 1
        : Math.min( prev[j], cur[j-1], prev[j-1] );
    }

    prev = cur;
  }

  return prev[min.length];
};

/*
DP VISUAL

Operations:
1. INS
2. DEL
3. REPL

        prev2       | curr2
prev1   REPL(c2=c1) | INS (p2+c1)
curr1   DEL(-c2)    | c2==c1 ? [p1,p2] : min(OPS)+1

Base row:
''->T always len(T) ops have to insert chars

Grid:= len(w1+1 for '') * len(w2+1 for '')

Example 1:

w1='horse', w2='ros'

Grid = 5+1=6 x 3+1=4 = 6*4

   '' r o s
   ---------
''| 0 1 2 3
h | 1 1 2 3
o | 2 2 1 3
r | 3 2 2 2
s | 4 3 3 2
e | 5 4 4 3 <-- Min edit distance

Following min numbers backwards:
''->e: insert=up -> c1=e -> 1 edit
se->se: no edit needed -> 1+0= 1 edit
se->rse: insert=up -> c1=r -> 1+1= 2 edit
orse->orse: no edit needed -> 2+0= 2 edit
rorse->horse: replace=diag -> c2=c1=h -> 2+1 edit = 3 edit

-------------------------------------

PSUEDO

0. Handle edges/corner
  0a. No w1 || w2 -> len of other word

1. Grid w1+1 * w2+2
  1a Grid[0] = 0,...,w2
  1b Grid[0,i...,w2][0] = i

2. Start at [1,1]
  2a. w2[1]==w2[1]
       ? [r-1, c-1]
       : min(ins:[r-1, c],del:[r-1,c-1],repl:[r,c-1]) +1 edit

3. Repeat 2 for each from [1,r...w1][1,c,...,w2]

4. Return edit distance for full string -> grid[w1][w2]

*/


/**
 * Recursive solution
 * Time: O(3^(m+n)) -> Each branches off to 3 choices and it can be adding or removing characters.
 */
exports.recursiveSolution = function minDistRecursive( s1, s2, m=new Map ) {
  if ( s1 === s2 ) return 0;
  // If ones an empty string, need to delete all characters to match.
  if ( !s1 || !s2 ) return Math.max( s1.length, s2.length );

  // TLE: Need to use map to memoize returned lengths
  const k = `${s1}||${s2}`;
  if ( m.has( k ) ) return m.get( k );

  const deleteS1 = s1.slice( 1 );
  const deleteS2 = s2.slice( 1 );
  // replace same as is delete both s1/s2 for price of 1
  // insert same as deleting s2, keeping s1 + 1

  // Replace: (deletes1, deletes2) + 1
  // Delete: (deletes1, s2) + 1
  // Insert: (s1, deletes2) + 1

  // If first characters are equal, min distance is going to be
  // min distance of two sliced characters, and don't need to add one.
  if ( s1[0] === s2[0] ) {
    const minDist = minDistRecursive( deleteS1, deleteS2, m );
    m.set( k, minDist );
    return minDist;
  }

  const minDist = 1 + Math.min(
    minDistRecursive( deleteS1, deleteS2, m ), // replace character
    minDistRecursive( deleteS1, s2, m ), // delete char from s1
    minDistRecursive( s1, deleteS2, m ), // insert s2 char to s1, then move forward
  );
  m.set( k, minDist );

  return minDist;
};

/*
Recursive Scratch:

 horse, ros
    d1: orse
    d2: os

    rse,s
    d1: se
    d2: ''


    (se,'') + 1 = 3
    (rse,'') + 1 = 4
    (se,s) + 1 = 2

    se,s

    horse,ros 1 + 3 = 4
    /
 ed(h,r) + min(ed(orse,os)
                \
              ed(o,o) + ed(rse,s)
                        /
                 min(ed(r,s) + ed(se,s), 1+ed(rse,''), 1+ed(srse,s))
                           \
                  ed(r,s) + ed('se', '')     4           4
                      1   +   2
*/


