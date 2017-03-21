import Promise from 'bluebird';
import webpack from 'webpack';
import proxy from 'http-proxy-middleware';
import express from 'express';

import chalk from 'chalk';

import morgan from 'morgan';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { developmentConfig as config } from './webpack.config';

import packageJson from '../../package.json';
const appName = packageJson.name;
const contextPath = '/'+appName + '/public/';

function serve() {
  return Promise.try(function() {
    const app = express();
    Promise.promisifyAll(app, {suffix: 'Promisified'});

    const compiler = webpack(config);

    const listeningPort = 8080;
    const backendContextRoot = '/api';
    const backendPort = 9080;

    // For JSON mockup of backend
    //app.use(backendContextRoot, express.static('data'));

    app.use(morgan('dev'));

    var backendProxy = proxy({
      target: `http://localhost:${backendPort}`,
      changeOrigin: true,
      logLevel: 'debug'
    })
    app.use(backendContextRoot, backendProxy);

    const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      noInfo: false,
      stats: {
        assets: true,
        chunks: false,
        modules: false,
        children: false,
        cached: false,
        reasons: false,
        source: false,
        chunkOrigins: false,
        colors: true
      }
    });
    Promise.promisifyAll(webpackDevMiddlewareInstance, {suffix: 'Promisified'});

    app.use(contextPath, webpackDevMiddlewareInstance);

    app.use(webpackHotMiddleware(compiler));

    console.log("Building Webpack bundle, it could take some time (between 20 and 40s generally)…");
    return webpackDevMiddlewareInstance.waitUntilValidPromisified()
      .then(() => app.listenPromisified(listeningPort, 'localhost'))
      .then(() => {
        console.warn(chalk.yellow("The size of the final bundle is for development, you can expect a smaller one in production."));
        console.log(chalk.green(`Listening at http://localhost:${listeningPort}${contextPath}…`));
        console.warn(chalk.yellow("Don't forget to test your code against the target browser (IE11)!"));
        console.warn(chalk.yellow("Resources are served for development purpose with ExpressJS, test on the target static Web server (Apache HTTPD)."))
      });
  });
}

export default serve;
