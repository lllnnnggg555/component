module.exports = {
  presets: [
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', {
      legacy: true
    }],
    ['@babel/plugin-proposal-class-properties', {
      loose: true
    }],
    ['import', {
      'libraryName': 'fish',
      'libraryDirectory': 'es',
      'style': true
    }],
    ['replace-import-extensions', {
      '.(js|jsx|ts|tsx)$': ''
    }]
  ]
}
