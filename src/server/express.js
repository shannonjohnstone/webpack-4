import express from 'express';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import configDevClient from '../../config/webpack.dev-client.js';
import configDevServer from '../../config/webpack.dev-server.js';
import configProdClient from '../../config/webpack.prod-client.js';
import configProdServer from '../../config/webpack.prod-server.js';

const server = express();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  console.log('Middleware enabled');
  const compiler = webpack([configDevClient, configDevServer]);

  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    configDevClient.devServer
  );

  const webpackHotMiddleware = require('webpack-hot-middleware')(
    clientCompiler,
    configDevClient.devServer
  );

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddleware);
  server.use(webpackHotServerMiddleware(compiler))
  console.log('Appliation running in development mode using express webpack middleware ---------------------------');
  server.listen(PORT, () => {
    console.log(`Server is listing on http://localhost:${PORT} in ${NODE_ENV}`);
  });
} else {
  const compiler = webpack([configProdClient, configProdServer])
  compiler.run((err, stats) => {
    console.log(err, 'err...');
    const renderer = require('../../build/prod-server-bundle.js').default;

    const expressStaticGzip = require('express-static-gzip');
    server.use(expressStaticGzip('dist', {
      enableBrotli: true
    }));

    server.use('*', renderer());
    server.listen(PORT, () => {
      console.log(`Server is listing on http://localhost:${PORT} in ${NODE_ENV}`);
    });
  });
}
