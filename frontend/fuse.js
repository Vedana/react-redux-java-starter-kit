const proxy = require('http-proxy-middleware')
const { FuseBox, SVGPlugin, SassPlugin, CSSPlugin, BabelPlugin } = require('fuse-box')

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

const devserver = fuse.devServer('>App.jsx')

// Express server
const app = devserver.httpServer.app

// Proxy to backend java server
const backendContextRoot = '/api'
const backendPort = 9080

var backendProxy = proxy({
  target: `http://localhost:${backendPort}`,
  changeOrigin: true,
  logLevel: 'debug'
})
app.use(backendContextRoot, backendProxy)
