import * as React from 'react';
import { Route, Switch } from 'react-router';

import {ConnectedHomePage} from '../components/Pages/Home';
import {NotFound} from '../components/Pages/NotFound';
import {ConnectedLogin} from '../components/Pages/LoginPage';
import {ConnectedSearchPage} from '../components/Pages/SearchPage';
import {ConnectedProductPage} from '../components/Pages/ProductPage';
import {ConnectedCartPage} from '../components/Pages/CartPage';
import {ConnectedCustomerPage} from '../components/Pages/CustomerPage';
import config from '../config';

export const pathHomePage = `${config.WEB_PATH}`;
export const pathSearchPage = `${config.WEB_PATH}search`;
export const pathProductPageBase = `${config.WEB_PATH}product`;
export const pathProductPage = `${pathProductPageBase}/:productId`;
export const pathLoginPage = `${config.WEB_PATH}login`;
export const pathCartPage = `${config.WEB_PATH}cart`;

export const pathCustomerPage = `${config.WEB_PATH}customer`;

export const pathWishListsPage = `${pathCustomerPage}/wishlists`;
export const pathWishListPageBase = `${pathCustomerPage}/wishlist`;
export const pathWishListPage = `${pathWishListPageBase}/:name`;

export const pathOrderHistoryPage = `${pathCustomerPage}/order`;
export const pathOrderDetailsPageBase = `${pathOrderHistoryPage}/details`;
export const pathOrderDetailsPage = `${pathOrderDetailsPageBase}/:orderId`;

export const pathCustomerProfilePage = `${pathCustomerPage}/profile`;

export const pathCustomerAddressesPage = `${pathCustomerPage}/addresses`;
export const pathAddressFormPage = `${pathCustomerAddressesPage}/:action`;

export const pathNotFoundPage = `${config.WEB_PATH}*`;

export const getContentRoutes = function() {
  return (
    <Switch>
      <Route path={pathHomePage} exact component={ConnectedHomePage}/>
      <Route path={pathSearchPage} component={ConnectedSearchPage} />
      <Route path={pathProductPage} component={ConnectedProductPage} />
      <Route path={pathLoginPage} component={ConnectedLogin} />
      <Route path={pathCartPage} component={ConnectedCartPage} />
      <Route path={pathCustomerPage} component={ConnectedCustomerPage} />
      <Route path={pathNotFoundPage} component={NotFound} />
    </Switch>
  );
};
