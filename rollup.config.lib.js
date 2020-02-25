import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/explain/index.js',
  output: {
    file: './selectors-explained.min.js',
    format: 'cjs',
  },
  plugins: [commonjs(), resolve(), terser()],
}
