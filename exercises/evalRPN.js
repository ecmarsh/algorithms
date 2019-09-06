/**
 * Evaluate Reverse Polish Notation
 *
 * Evaluate the value of an arithmetic expression in Reverse Polish Notation.
 * Valid operators are +, -, *, /.
 * Each operand may be an integer or another expression.
 *
 * Note:
 * Division between two integers should truncate toward zero.
 * The given RPN expression is always valid.
 * That means the expression would always evaluate to a result,
 * and there won't be any divide by zero operation.
 *
 * @example
 * Input: ["2", "1", "+", "3", "*"]
 * Output: 9
 * Explanation: ((2 + 1) * 3) = 9
 *
 * Input: ["4", "13", "5", "/", "+"]
 * Output: 6
 * Explanation: (4 + (13 / 5)) = 6
 *
 * Analysis:
 * Time: O(T), where T is number of tokens.
 * Space: O(N), where N is number of operands.
 *
 */

/**
 * @param {string[]} tokens
 * @return {number}
 */
module.exports = function evalRPN( tokens ) {
  const stack = [];

  tokens.forEach( ( token ) => {
    if ( /^[+\-*/]$/.test( token ) ) {
      const [y, x] = [stack.pop(), stack.pop()];
      stack.push( evaluate( x, y, token ) );
    } else {
      stack.push( +token );
    }
  } );

  return stack.pop();
};

const evaluate = ( x, y, op ) => {
  switch ( op ) {
    case '+': return x + y;
    case '-': return x - y;
    case '*': return x * y;
    case '/': return x / y | 0;
  }
};


/*
---PSUEDO---

for each token in the postfix expression:
  if token is an operator:
    operand_2 ← pop from the stack
    operand_1 ← pop from the stack
    result ← evaluate token with operand_1 and operand_2
    push result back onto the stack
  else if token is an operand:
    push token onto the stack

result ← pop from the stack

*/
