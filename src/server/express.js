import express from 'express';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import AppRoot from '../components/AppRoot';

const server = express();

const isProd = process.env.NODE_ENV === 'production';

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

const expressStaticGzip = require('express-static-gzip');
server.use(expressStaticGzip('dist', {
  enableBrotli: true
}));

server.get('*', (req, res) => {
  // const html = ReactDOMServer.renderToString();
  const html = `
    <html>
      <head>
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <div id="root">
          ${ReactDOMServer.renderToString(<AppRoot />)}
        </div>
        <script src='vendor-bundle.js'></script>
        <script src='main-bundle.js'></script>
      </body>
    </html>
  `
  res.send(html);
})

server.listen(process.env.PORT, () => {
  console.log(`Server is listing on http://localhost:${process.env.PORT}`);
});
