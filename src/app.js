import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import data from '../data/bio';
import AppRoot from './components/AppRoot'

ReactDOM.render(
  <AppRoot data={data} />,
  document.getElementById('root')
)
