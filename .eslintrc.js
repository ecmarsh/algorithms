module.exports = {
  extends: ['eslint:recommended'],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true,
      objectLiteralDuplicateProperties: false,
    },
  },
  globals: {
    BigInt: true
  },
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    curly: ['off'],
    'eol-last': ['error'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'keyword-spacing': ['error'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-else-return': ['error'],
    'no-mixed-spaces-and-tabs': ['error'],
    'no-multiple-empty-lines': ['error'],
    'func-call-spacing': ['error', 'never'],
    'no-trailing-spaces': ['error'],
    'no-unexpected-multiline': ['error'],
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        vars: 'all',
      },
    ],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    semi: ['warn', 'always'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'space-in-parens': ['warn', 'always'],
    'space-unary-ops': [
      'error',
      {
        nonwords: false,
        overrides: {},
      },
    ],
    // ES6 env
    'arrow-body-style': [
      'error',
      'as-needed',
      {
        requireReturnForObjectLiteral: false,
      },
    ],
    'arrow-spacing': [
      'error',
      {
        after: true,
        before: true,
      },
    ],
    'no-class-assign': ['error'],
    'no-const-assign': ['error'],
    'no-dupe-class-members': ['error'],
    'no-duplicate-imports': ['error'],
    'no-new-symbol': ['error'],
    'no-useless-rename': ['error'],
    'no-var': ['error'],
    'object-shorthand': [
      'error',
      'always',
      {
        avoidQuotes: true,
        ignoreConstructors: false,
      },
    ],
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],
    'prefer-const': ['error'],
    'prefer-rest-params': ['error'],
    'prefer-template': ['error'],
    'template-curly-spacing': ['error', 'never'],
  },
};
