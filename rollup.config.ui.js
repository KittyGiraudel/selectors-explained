import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/ui.js',
  output: {
    name: 'App',
    file: 'dist/bundle.js',
    format: 'iife',
  },
  plugins: [commonjs(), resolve(), terser()],
}
