import path from 'path';
import extend from 'extend';

import webpack from 'webpack';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import applicationJson from '../../src/application.json';
const appTitle = applicationJson.title;

// Useless, imported by Neat: var bourbon = require('node-bourbon').includePaths;
// Note: I changed some var/arg names.
import {with as sassNeatPathsAndMore} from 'node-neat';
const sassFontAwesomePath = __dirname + '/../../node_modules/font-awesome/scss';

const extensionDotRegExPrefix = '\\.';
const queryStringRegExSuffix = '(\\?.*)?$'
const extensionMatchRegEx = function(...extensions) {
  return new RegExp(extensionDotRegExPrefix + '(' + extensions.join('|') + ')' + queryStringRegExSuffix);
}

const appEntryPoint = './src/app.jsx';

const loaders = {
  jsLoader: {
    test: extensionMatchRegEx('js', 'jsx', 'es6'),
    exclude: /node_modules/,
    loader: 'babel'
  },
  cssAsStyleLoader: {
    test: extensionMatchRegEx('css', 'scss'),
    loaders: ['style', 'css', 'sass']
  },
  cssAsExternalFileLoader: {
    test: extensionMatchRegEx('css', 'scss'),
    loader: ExtractTextPlugin.extract(['css', 'sass'])
  },
  graphicalResourcesLoader: {
    test: extensionMatchRegEx('png', 'svg', 'jpg', 'jpeg', 'gif', 'ttf', 'eot', 'woff', 'woff2'),
    loader: 'file'
  },
  jsonLoader: {
    test: extensionMatchRegEx('json'),
    loader: 'json'
  }
};

const commonPlugins = {
  dedupePlugin: new webpack.optimize.DedupePlugin(),
  occurenceOrderPlugin: new webpack.optimize.OccurenceOrderPlugin(),
  providePlugin: new webpack.ProvidePlugin({
    '_': 'lodash',
    'Immutable': 'immutable',
    'React': 'react',
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  }),
  htmlWebpackPlugin: new HtmlWebpackPlugin({
    title: appTitle,
    inject: false,
    template: 'tools/index.ejs'
  }),
  uglifyJSPlugin: new webpack.optimize.UglifyJsPlugin({
    compress: {
      'warnings': false
    }
  })
};

const commonConfig = {
  resolve: {
    root: path.resolve('../../src'),
    moduleDirectories: 'node_modules',
    extensions: ['', '.js', '.jsx', '.es6', '.scss', '.css']
  },
  output: {
    path: __dirname + '/../../public/',
    filename: "app.[hash].js",
    chunkFilename: "[id].[hash].js",
    publicPath: '',
    hot: true,
    library: 'App',
    libraryTarget: 'umd'
  },
  cssLoader: {
    sourceMap: true,
    modules: true
  },
  sassLoader: {
    sourceMap: true,
    includePaths: sassNeatPathsAndMore(path.resolve(__dirname, '/src/styles', sassFontAwesomePath))
  }
};

const developmentConfig = extend(true, {}, commonConfig, {
  devtool: '#inline-source-map',
  entry: {
    'app': [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      appEntryPoint
    ]
  },
  plugins: [
    commonPlugins.dedupePlugin,
    commonPlugins.occurenceOrderPlugin,
    commonPlugins.providePlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify("development")
      }
    }),
    commonPlugins.htmlWebpackPlugin
  ],
  module: {
    loaders: [
      loaders.jsLoader,
      loaders.cssAsStyleLoader,
      loaders.graphicalResourcesLoader,
      loaders.jsonLoader
    ]
  }
});

const productionConfig = extend(true, {}, commonConfig, {
  devtool: '#source-map',
  entry: {
    'app': [
      appEntryPoint
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      root: path.resolve('.')
    }),
    commonPlugins.dedupePlugin,
    commonPlugins.occurenceOrderPlugin,
    commonPlugins.providePlugin,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    }),
    commonPlugins.htmlWebpackPlugin,
    commonPlugins.uglifyJSPlugin
  ],
  module: {
    loaders: [
      loaders.jsLoader,
      loaders.cssAsExternalFileLoader,
      loaders.graphicalResourcesLoader,
      loaders.jsonLoader
    ]
  }
});

export {
  developmentConfig,
  productionConfig
};
