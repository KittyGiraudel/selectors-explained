import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    name: 'explain',
    file: 'src/ui/bundle.js',
    format: 'iife',
  },
  plugins: [commonjs(), resolve()],
}
