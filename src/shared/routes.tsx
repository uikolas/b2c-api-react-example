import * as React from 'react';
import { Route } from 'react-router';

import {AppHandler} from './containers/AppHandler';


export const getRoutes = function() {
  return (
    <Route path="/" component={AppHandler} />
  );
};
