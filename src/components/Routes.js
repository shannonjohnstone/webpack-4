import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';
import universal from 'react-universal-component';
import '../styles/nav.css';

const UniversalComponent = universal(props => import(`./${props.page}`))

const Routes = () => (
  <div>
    <div className="nav">
      <Link to="/">Gallery</Link>
      <Link to="/about">About</Link>
      <Link to="/article">Article</Link>
    </div>
    <Switch>
      <Route exact path="/">
        <UniversalComponent page="Gallery" />
      </Route>
      <Route exact path="/about">
        <UniversalComponent page="About" />
      </Route>
      <Route exact path="/article">
        <UniversalComponent page="Article" />
      </Route>
    </Switch>
  </div>
);

export default Routes;
