import ReactDOMServer from 'react-dom/server';
import AppRoot from '../components/AppRoot';

export const renderer = () => (res, req) => {
  return `
  <html>
    <head>
      <link rel="stylesheet" href="/main.css" />
      <title>Dustins Blog.</title>
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
}
