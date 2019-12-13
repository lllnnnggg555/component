import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
// import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
// import typescript from 'rollup-plugin-typescript'
// import visualizer from 'rollup-plugin-visualizer'

process.env.BABEL_ENV = 'rollup'

const sdkName = 'Form' // 输出的全局变量名称

export default {
  input: 'src/index',
  output: {
    format: 'umd',
    name: sdkName,
    file: 'dist/index.js',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  },
  external: [ 'react', 'react-dom' ],
  plugins: [
    resolve(),
    // typescript(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    cjs()
    // terser()
    // visualizer({
    //   filename: './dist/statistics.html',
    //   title: 'My Bundle'
    // })
  ]
}
