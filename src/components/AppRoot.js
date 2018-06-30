import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader'
import Routes from './Routes';

class AppRoot extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    )
  }
}

/* hot reload
 * this module will let you hot reloaded changes to components
 * and at the same time hold the state it may currently hold
 */

export default hot(module)(AppRoot);
