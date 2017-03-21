import Promise from 'bluebird';
import webpack from 'webpack';
Promise.promisifyAll(webpack, {suffix: 'Promisified'});

import {productionConfig as webpackConfig} from './webpack.config';

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  console.log("Building Webpack bundle, it could take a while (around 3 minutes generally)…");
  return webpack(webpackConfig).runPromisified()
    .then(stats => console.log(stats.toString({assets: true,
      chunks: false,
      modules: false,
      children: false,
      cached: false,
      reasons: false,
      source: false,
      chunkOrigins: false,
      colors: true
    })));
}

export default bundle;
