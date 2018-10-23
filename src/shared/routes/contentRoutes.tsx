import * as React from 'react';
import { Route, Switch } from 'react-router';

import { ConnectedHomePage } from '../components/Pages/Home';
import { LoadableLoginPage } from '../components/Pages/LoginPage/loadable';
import { LoadablePasswordForgotPage } from '../components/Pages/LoginPage/ForgotPasswordPage/loadable';
import { LoadablePasswordResetPage } from '../components/Pages/LoginPage/ResetPassword/loadable';
import { LoadableSearchPage } from '../components/Pages/SearchPage/loadable';
import { LoadableProductPage } from '../components/Pages/ProductPage/loadable';
import { LoadableCartPage } from '../components/Pages/CartPage/loadable';
import { LoadableCustomerPage } from '../components/Pages/CustomerPage/loadable';
import { LoadableNotFound } from '../components/Pages/NotFound/loadable';

import { ConnectedWishlistPage } from '../components/Pages/WishListPage';
import { ConnectedWishlistDetailPage } from '../components/Pages/WishlistDetail';

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
export const pathWishlistPage = `${config.WEB_PATH}wishlists`;
export const pathWishlistDetailPage = `${config.WEB_PATH}wishlist/:name`;

export const pathForgotPassword = `${config.WEB_PATH}password/forgotten`;
export const pathResetPassword = `${config.WEB_PATH}password/reset/:restoreKey`;

export const pathCustomerProfilePage = `${pathCustomerPage}/profile`;

export const pathCustomerAddressesPage = `${pathCustomerPage}/addresses`;
export const pathAddressFormPage = `${pathCustomerAddressesPage}/:action`;

export const pathNotFoundPage = `${config.WEB_PATH}*`;

export const getContentRoutes = function() {
  return (
    <Switch>
      <Route path={ pathHomePage } exact component={ ConnectedHomePage }/>
      <Route path={ pathSearchPage } component={ LoadableSearchPage }/>
      <Route path={ pathProductPage } component={ LoadableProductPage }/>
      <Route path={ pathLoginPage } component={ LoadableLoginPage }/>
      <Route path={ pathCartPage } component={ LoadableCartPage }/>
      <Route path={ pathCustomerPage } component={ LoadableCustomerPage }/>
      <Route path={ pathForgotPassword } exact component={ LoadablePasswordForgotPage }/>
      <Route path={ pathResetPassword } component={ LoadablePasswordResetPage }/>

      <Route path={ pathWishlistPage } component={ ConnectedWishlistPage }/>
      <Route path={ pathWishlistDetailPage } component={ ConnectedWishlistDetailPage }/>

      <Route path={ pathNotFoundPage } component={ LoadableNotFound }/>
    </Switch>
  );
};
