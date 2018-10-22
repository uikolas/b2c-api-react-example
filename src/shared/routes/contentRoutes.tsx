import * as React from 'react';
import { Route, Switch } from 'react-router';

import {ConnectedHomePage} from '../components/Pages/Home';
import {NotFound} from '../components/Pages/NotFound';
import {ConnectedLogin} from '../components/Pages/LoginPage';
import {ConnectedSearchPage} from '../components/Pages/SearchPage/reduxified';
import {ConnectedProductPage} from '../components/Pages/ProductPage';
import {ConnectedCartPage} from '../components/Pages/CartPage';
import {ConnectedWishlistPage} from '../components/Pages/WishListPage';
import {ConnectedWishlistDetailPage} from '../components/Pages/WishlistDetail';
import {ForgotPasswordPage} from '../components/Pages/LoginPage/ForgotPasswordPage';
import {ResetPasswordPage} from '../components/Pages/LoginPage/ResetPassword';
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
export const pathWishlistPage = `${config.WEB_PATH}wishlists`;
export const pathWishlistDetailPage = `${config.WEB_PATH}wishlist/:name`;

export const pathForgotPassword = `${config.WEB_PATH}password/forgotten`;
export const pathResetPassword = `${config.WEB_PATH}password/reset`;

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
      <Route path={pathWishlistPage} component={ConnectedWishlistPage} />
      <Route path={pathWishlistDetailPage} component={ConnectedWishlistDetailPage} />
      <Route path={pathForgotPassword} component={ForgotPasswordPage} />
      <Route path={pathResetPassword} component={ResetPasswordPage} />
      <Route path={pathCustomerPage} component={ConnectedCustomerPage} />
      <Route path={pathNotFoundPage} component={NotFound} />
    </Switch>
  );
};
