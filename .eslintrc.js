const path = require('path')

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 10,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'import'],
  extends: ['standard', 'standard-react', 'plugin:import/recommended'],
  rules: {
    'no-var': 2,
    'no-debugger': 2,
    semi: [2, 'never'],
    'no-unused-vars': 0,
    'linebreak-style': 0,
    'object-curly-newline': 0,
    'space-before-function-paren': 0,
    'jsx-quotes': [2, 'prefer-double'],
    'prefer-const': [
      2,
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],
    'standard/no-callback-literal': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-max-props-per-line': [
      2,
      {
        maximum: 5,
        when: 'multiline'
      }
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ],
    'react/prop-types': [
      0,
      {
        ignore: ['children']
      }
    ]
  },
  env: {
    browser: true,
    amd: true,
    es6: true,
    node: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      [path.resolve('./plugin/resolver')]: {
        antd: 'antd'
      }
    }
  }
}
