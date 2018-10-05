import * as React from 'react';
import { Route, Switch } from 'react-router';

import {ConnectedHomePage} from '../components/Pages/Home';
import {NotFound} from '../components/Pages/NotFound';
import {ConnectedLogin} from '../components/Pages/LoginPage';
import {ConnectedSearchPage} from '../components/Pages/SearchPage';
import {ConnectedProductPage} from '../components/Pages/ProductPage';
import {ConnectedCartPage} from '../components/Pages/CartPage';
import config from '../config';
import {ConnectedOrderHistoryPage} from "../components/Pages/OrderHistoryPage/index";

export const pathHomePage = `${config.WEB_PATH}`;
export const pathSearchPage = `${config.WEB_PATH}search`;
export const pathProductPage = `${config.WEB_PATH}product`;
export const pathLoginPage = `${config.WEB_PATH}login`;
export const pathCartPage = `${config.WEB_PATH}cart`;
export const pathOrderHistoryPage = `${config.WEB_PATH}order`;
export const pathNotFoundPage = `${config.WEB_PATH}*`;

export const getContentRoutes = function() {
  return (
    <Switch>
      <Route path={pathHomePage} exact component={ConnectedHomePage}/>
      <Route path={pathSearchPage} component={ConnectedSearchPage} />
      <Route path={pathProductPage} component={ConnectedProductPage} />
      <Route path={pathLoginPage} component={ConnectedLogin} />
      <Route path={pathCartPage} component={ConnectedCartPage} />
      <Route path={pathOrderHistoryPage} component={ConnectedOrderHistoryPage} />
      <Route path={pathNotFoundPage} component={NotFound} />
    </Switch>
  );
};
