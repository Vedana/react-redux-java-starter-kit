const { FuseBox, SVGPlugin, SassPlugin, CSSPlugin, BabelPlugin } = require('fuse-box')
const cpx = require('cpx')

cpx.copy('./src/index.html', './build')

// Create FuseBox Instance
let fuse = new FuseBox({
  homeDir: 'src/',
  sourcemaps: true,
  outFile: './build/out.js',

  plugins: [
    SVGPlugin(),
    CSSPlugin(),
    ['.scss', SassPlugin(), CSSPlugin()],
    BabelPlugin()
  ]
})

fuse.bundle('>App.jsx')
