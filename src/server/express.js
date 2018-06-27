import express from 'express';
import path from 'path';

const server = express();

const isProd = process.env.NODE_ENV === 'production';

console.log(isProd, 'isProd...');
if (!isProd) {
  const webpack = require('webpack');
  const config = require('../../config/webpack.dev.js');
  const compiler = webpack(config);
  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer);

  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddleware);
  console.log('Running express webpack middleware ---------------------------');
}

server.use(express.static('dist'));

server.listen(process.env.PORT, () => {
  // const message = isProd ? 'Server Listening' : `Server is listing on http://localhost:${process.env.PORT}`
  console.log(`Server is listing on http://localhost:${process.env.PORT}`);
});
