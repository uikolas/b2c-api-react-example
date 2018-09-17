import * as React from 'react';
import { Route, Switch } from 'react-router';

import {ConnectedHomePage} from '../components/Pages/Home';
import {NotFound} from '../components/Pages/NotFound';
import {ConnectedLogin} from '../components/Pages/LoginPage';
import {ConnectedSearchPage} from '../components/Pages/SearchPage';

export const pathHomePage = "/";

export const getContentRoutes = function() {
  return (
    <Switch>
      <Route path={pathHomePage} exact component={ConnectedHomePage}/>
      <Route path="/search" component={ConnectedSearchPage} />
      <Route path="/login" component={ConnectedLogin} />
      <Route path="/cart" render={() => <div>Cart Page</div>}/>
      <Route path='*' component={NotFound} />
    </Switch>
  );
};
