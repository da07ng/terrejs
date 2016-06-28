var fs = require('fs');
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('uglify-js');
var version = process.env.VERSION || require('../package.json').version;

var banner =
  '/*!\n' +
  ' * Terre.js v' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Daojing Gao\n' +
  ' * Released under the MIT License.\n' +
  ' */';

rollup.rollup({
  entry: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup']
    })
  ]
}).then(function(bundle) {
  var code = bundle.generate({
    format: 'umd',
    moduleName: 'Terre',
    banner: banner
  }).code;

  var result = uglify.minify(code, {
    fromString: true,
    outSourceMap: 'terre.min.js.map',
    output: {
      preamble: banner
    }
  });

  var map = JSON.parse(result.map);
  map.sources = ['terre.js'];
  map.sourcesContent = [code];
  map.file = 'terre.min.js';

  return [
    write('dist/terre.js', code),
    write('dist/terre.min.js', result.code),
    write('dist/terre.min.js.map', JSON.stringify(map))
  ];
}).catch(function(error) {
  console.log(error);
});

function write(dest, code) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(dest, code, function(error) {
      if (error) {
        return reject(error);
      }

      console.log(redAnsiColor(dest) + ' ' + getSize(code));
      resolve();
    });
  });
}

function redAnsiColor(str) {
  return '\x1b[1m\x1b[31m' + str + '\x1b[39m\x1b[22m';
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}
