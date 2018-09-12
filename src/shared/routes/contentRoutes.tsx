import * as React from 'react';
import { Route, Switch } from 'react-router';

import {ConnectedHome} from '../components/Pages/Home';
import {NotFound} from '../components/Pages/NotFound';
import {ConnectedLogin} from '../components/Pages/LoginPage';
import {ConnectedSearchPage} from '../components/Pages/SearchPage';


export const getContentRoutes = function() {
  return (
    <Switch>
      <Route path="/search" component={ConnectedSearchPage} />
      <Route path="/" component={ConnectedLogin} exact />
      <Route path='*' component={NotFound} />
    </Switch>
  );
};
