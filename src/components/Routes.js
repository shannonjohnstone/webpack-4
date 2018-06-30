import React from 'react';
import { Route, Link } from 'react-router-dom';
import '../styles/nav.css'

import Gallery from './Gallery';
import Article from './Article';
import About from './About';

const Routes = () => (
  <div>
    <div className="nav">
      <Link to="/">Gallery</Link>
      <Link to="/about">About</Link>
      <Link to="/article">Article</Link>
    </div>
    <Route exact path="/" component={Gallery} />
    <Route exact path="/about" component={About} />
    <Route exact path="/article" component={Article} />
  </div>
);

export default Routes;
