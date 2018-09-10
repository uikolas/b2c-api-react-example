import * as React from 'react';
import { Route, Switch } from 'react-router';

import {ConnectedHome} from '../components/Pages/Home';
import {NotFound} from '../components/Pages/NotFound';


export const getContentRoutes = function() {
  return (
    <Switch>
      <Route path="/" component={ConnectedHome} exact />
      <Route path='*' component={NotFound} />
    </Switch>
  );
};
