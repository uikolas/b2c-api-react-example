import * as React from 'react';
import { Route, Switch } from 'react-router';

import {ConnectedHome} from '../components/Pages/Home';
import {NotFound} from '../components/Pages/NotFound';
import {ConnectedLogin} from '../components/Pages/LoginPage';
import {ConnectedSearchPage} from '../components/Pages/SearchPage';
import {ConnectedProductPage} from '../components/Pages/ProductPage';

export const getContentRoutes = function() {
  return (
    <Switch>
      <Route path="/" exact render={() => <div>Home Page</div>}/>
      <Route path="/search" component={ConnectedSearchPage} />
      <Route path="/product/:name" component={ConnectedProductPage} />
      <Route path="/login" component={ConnectedLogin} />
      <Route path="/cart" render={() => <div>Cart Page</div>}/>
      <Route path='*' component={NotFound} />
    </Switch>
  );
};
