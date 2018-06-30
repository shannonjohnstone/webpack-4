import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Routes from '../components/Routes';

export default () => (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/main.css" />
        <title>Dustins Blog.</title>
      </head>
      <body>
        <div id="root">${ReactDOMServer.renderToString(
          <StaticRouter location={req.url} context={{}}>
            <Routes />
          </StaticRouter>
        )}</div>
        <script src='vendor-bundle.js'></script>
        <script src='main-bundle.js'></script>
      </body>
    </html>
  `)
}
