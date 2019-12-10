module.exports = api => {
  const presets = []
  let plugins = []

  const isTest = api.env('test')
  if (isTest) {
    presets.push([
      '@babel/preset-env',
      {
        modules: 'cjs'
      }
    ])
    plugins = plugins.concat([
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: false
        }
      ]
    ])
  } else {
    plugins = plugins.concat([
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true
        }
      ],
      [
        'replace-import-extensions',
        {
          '\\.(js|jsx|ts|tsx)$': ''
        }
      ]
    ])
  }

  return {
    presets: [...presets, '@babel/preset-react'],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ],
      ...plugins
    ]
  }
}
