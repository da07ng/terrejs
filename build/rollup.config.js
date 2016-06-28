import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup']
    })
  ],
  moduleName: 'Terre',
  targets: [{
    dest: 'dist/terre.js',
    format: 'umd'
  }]
};
