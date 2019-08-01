const { types } = require('@babel/core')
const { declare } = require('@babel/helper-plugin-utils')

module.exports = declare((api) => {
  api.assertVersion(7)

  return {
    name: 'replace-import-extensions',
    visitor: {
      ImportDeclaration(path) {
        path.traverse({
          StringLiteral(path) {
            const source = path.node.value.replace(/\.(js|jsx|ts|tsx)$/, '')
            if (source === path.node.value) {
              return
            }
            path.replaceWith(types.StringLiteral(source))
          }
        })
      }
    }
  }
})
