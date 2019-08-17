/**
 * Karp-Rabin String Search
 * (Rabin fingerprint hashing technique)
 *
 * Speeds up equality pattern of substring via hash function.
 * The hash function must be O(1).
 *
 * Fingerprint is calculated via:
 * f(x) = m0 + m1x + m2x^2... + m(n-1)x^(n-1)
 * Where n=# of characters being hashed, x is some prime.
 * Note: Any high prime works, but if too large,
 *  int overflow occurs due to exponential growth.
 *
 * Analysis:
 * Let W be length of the word, the string searching in.
 * Let T be the length of the pattern being searched for.
 * Preprocessing Time: O(W) + O(T) For first hashes = O(W)
 * Match Time: O(W+T) worst case if have to search entire length of string.
 * Space: O(1) We aren't storing anything. Just calculating values.
 *
 * Most useful when continuously searching for matches in long text.
 * For short text, can become similar time to brute force worst case
 * and implementation may be overkill.
 */

/**
 * Defines constructor for hash function.
 * @param {number} prime An irreducable prime number. Defaults to 101.
 * Deducted from Fermat's little theorem: (a^p -a) % p === 0,
 * thus: If a%p != 0, then (a^(p−1) − 1)%p === 0
 */
function KarpRabin( prime ) {
  this.prime = prime || 101;
}

/**
 * Rabin Fingerprint Hashing technique.
 *
 * @param {string} str The string who's characters should be hashed.
 * @param {number} end The index of str to stop hashing at. Defaults to `str` length.
 * @return {number} The fingerprint of the string.
 */
KarpRabin.prototype.hash = function( str, end=str.length ) {
  let fingerprint = 0;

  for ( let i = 0; i < end; i++ )
    fingerprint += str.charCodeAt( i ) + this.prime ** i;

  return fingerprint;
};

/**
 * Updates a given fingerprint using substring shifting
 * via rolling hash, which can calculate fingerprints quicker
 * than a base hash, similar to rolling checksums for moving averages.
 *
 * @param {string} str
 * @param {number} prevIndex The index where the original hash started.
 * @param {number} newIndex The index where the next hash should be calcualted.
 * @param {number} prevHash The previous hash code. The value to shift from.
 * @param {number} size Defaults to size of `str`.
 */
KarpRabin.prototype.recalcHash = function(
  str,
  prevIndex,
  newIndex,
  prevHash,
  size = str.length
) {
  // Subtract the first term, divide by the prime, and then add the new term.
  const baseHash = ( prevHash - str.charCodeAt( prevIndex ) ) / this.prime | 0;
  const shift = str.charCodeAt( newIndex ) * ( this.prime ** ( size - 1 ) );
  return baseHash + shift;
};

/**
 * Simple check for string equality,
 * customized for final check on rk search.
 * Needed because there is a small chance that
 * two hash codes can return equal despite being different strings.
 *
 * @param {string} str1 Comparison string a.
 * @param {number} start1 The index to start searching the first string at.
 * @param {number} end1 `str1` should be searched up to this index.
 * @param {string} str2 Comparison string b.
 * @param {number} start2 The index to start searching the second string at.
 * @param {number} end2 `str2` should be searched up to this index.
 * @return {boolean}
 */
KarpRabin.prototype.confirmEquals = function(
  str1,
  start1,
  end1,
  str2,
  start2,
  end2
) {
  // Different number of chars will never be equal
  if ( ( end1 - start1 ) !== ( end2 - start2 ) ) {
    return false;
  }

  while ( start1 <= end1 && start2 <= end2 ) {
    if ( str1[start1] !== str2[start2] ) {
      return false;
    }
    start1++; start2++;
  }

  // All characters must match
  return true;
};

/**
 * Executes the search for a pattern by looking for equivalent hash,
 * and recalculating fingerprint using rolling hash by index until found.
 *
 * @param {string} text The text string to be searched in.
 * @param {string} pattern The pattern to search for in `text`.
 * @return {number} The index where pattern match starts. -1 if not found.
 */
KarpRabin.prototype.search = function( text, pattern ) {
  const T = text.length,
    W = pattern.length,
    patternHash = this.hash( pattern, W );
  let textHash = this.hash( text, T );


  for ( let i = 1; i < T - W; i++ ) {
    const [start1, end1] = [i-1, i+W-2];
    const [start2, end2] = [0, W-1];

    // If specified portion of fingerprint matches,
    // return index where match starts.
    if (
      patternHash == textHash
      && this.confirmEquals( text, start1, end1, pattern, start2, end2 )
    ) {
      return i - 1;
    }

    // Otherwise get updated fingerprint
    // using a rolling hash from previous fingerprint.
    if ( i <= T - W ) {
      const prevIdx = start1,
        newIdx = end1 + 1,
        prevHash = textHash,
        len = W;

      textHash = this.recalcHash( text, prevIdx, newIdx, prevHash, len );
    }
  }

  return -1;
};
