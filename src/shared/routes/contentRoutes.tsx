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
import {ConnectedOrderDetailsPage} from "../components/Pages/OrderDetailsPage/index";

export const pathHomePage = `${config.WEB_PATH}`;
export const pathSearchPage = `${config.WEB_PATH}search`;
export const pathProductPageBase = `${config.WEB_PATH}product`;
export const pathProductPage = `${pathProductPageBase}/:productId`;
export const pathLoginPage = `${config.WEB_PATH}login`;
export const pathCartPage = `${config.WEB_PATH}cart`;
export const pathOrderHistoryPage = `${config.WEB_PATH}order`;
export const pathOrderDetailsPageBase = `${config.WEB_PATH}order/details`;
export const pathOrderDetailsPage = `${pathOrderDetailsPageBase}/:orderId`;
export const pathNotFoundPage = `${config.WEB_PATH}*`;

export const getContentRoutes = function() {
  return (
    <Switch>
      <Route path={pathHomePage} exact component={ConnectedHomePage}/>
      <Route path={pathSearchPage} component={ConnectedSearchPage} />
      <Route path={pathProductPage} component={ConnectedProductPage} />
      <Route path={pathLoginPage} component={ConnectedLogin} />
      <Route path={pathCartPage} component={ConnectedCartPage} />
      <Route path={pathOrderDetailsPage} component={ConnectedOrderDetailsPage} />
      <Route path={pathOrderHistoryPage} exact component={ConnectedOrderHistoryPage} />
      <Route path={pathNotFoundPage} component={NotFound} />
    </Switch>
  );
};
