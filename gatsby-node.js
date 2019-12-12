exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `babel-plugin-import`,
    options: {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }
  })
}
