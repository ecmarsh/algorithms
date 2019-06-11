/**
 * Google Palindrome Split Question
 * Given 2 strings a and b with the same length.
 * Strings are alligned one under the other.
 * We can choose an index and split both strings into 4 subtrings: a1 + a2 and b1 + b2.
 * Find out if it's possible to split a and b such that a1 + b2 or a2 + b1 forms a palindrome.
 *
 * @param {string} a
 * @param {string} b
 * @return {boolean}
 *
 * Example
 * Input: a="abcbbbb", b="xxxbcba"
 * Output: true
 * Explanation:
 * abc|bbbb
 * xxx|bcba
 *
 * We can split the strings at index 3. We will get a1 = "abc", a2 = "bbbb" and b1 = "xxx", b2 = "bcba".
 * a1+b2 forms a palindrome "abcbcba" so return true.
 *
 * Follow-up:
 * Now its allowed to split the strings independently:
 * a|bcbbbb
 * xxxbcb|a
 *
 */

module.exports = function splitPalindrome(a, b) {
	isString(a, b);
	if (isEmpty(a) || isEmpty(b)) {
		return false;
	}

	const partition = 1;
	const start = 0;
	const end = a.length;

	while (start < partition) {
		// Check first combo

		// Check last combo
	}


};

function isString(...strs) {
	strs.forEach(str => {
		if (typeof str !== 'string') {
			throw Error('Expecting a string!');
		}
	});
}

function isEmpty(str) {
	str ? true : false;
}
