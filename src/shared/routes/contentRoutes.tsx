import * as React from 'react';
import { Route, Switch } from 'react-router';

import { ProtectedRoute } from './ProtectedRoute';

import { LoadableHomePage } from '../components/Pages/HomePage/loadable';
import { LoadableLoginPage } from '../components/Pages/LoginPage/loadable';
import { LoadablePasswordForgotPage } from '../components/Pages/LoginPage/ForgotPasswordPage/loadable';
import { LoadablePasswordResetPage } from '../components/Pages/LoginPage/ResetPassword/loadable';
import { LoadableSearchPage } from '../components/Pages/SearchPage/loadable';
import { LoadableProductPage } from '../components/Pages/ProductPage/loadable';
import { LoadableCartPage } from '../components/Pages/CartPage/loadable';
import { LoadableCustomerPage } from '../components/Pages/CustomerPage/loadable';
import { LoadableNotFound } from '../components/Pages/NotFound/loadable';

import { LoadableWishListPage } from '../components/Pages/WishListPage/loadable';
import { LoadableWishlistDetail } from '../components/Pages/WishlistDetail/loadable';

import { LoadableCheckoutPage } from 'src/shared/components/Pages/CheckoutPage/loadable';

import nodeServerConfig from '../configs/node-server-config';
import {AppMain} from "src/shared/components/Common/AppMain/index";
import {AppBackdrop} from "src/shared/components/Common/AppBackdrop/index";
import {LoadableOrderDetailsPage} from "src/shared/components/Pages/OrderDetailsPage/loadable";

export const pathHomePage = `${nodeServerConfig.WEB_PATH}`;
export const pathSearchPage = `${nodeServerConfig.WEB_PATH}search`;

export const pathCategoryPageBase = `${nodeServerConfig.WEB_PATH}category`;
export const pathCategoryPage = `${pathCategoryPageBase}/:categoryId`;

export const pathProductPageBase = `${nodeServerConfig.WEB_PATH}product`;
export const pathProductPage = `${pathProductPageBase}/:productId`;
export const pathLoginPage = `${nodeServerConfig.WEB_PATH}login`;
export const pathCartPage = `${nodeServerConfig.WEB_PATH}cart`;

export const pathCustomerPage = `${nodeServerConfig.WEB_PATH}customer`;

export const pathWishListsPage = `${pathCustomerPage}/wishlists`;
export const pathWishListPageBase = `${pathCustomerPage}/wishlist`;
export const pathWishListPage = `${pathWishListPageBase}/:name`;

export const pathOrderHistoryPage = `${pathCustomerPage}/order`;
export const pathOrderDetailsPageBase = `${pathOrderHistoryPage}/details`;
export const pathOrderDetailsPage = `${pathOrderDetailsPageBase}/:orderId`;
export const pathWishlistPage = `${nodeServerConfig.WEB_PATH}wishlists`;
export const pathWishlistDetailPage = `${nodeServerConfig.WEB_PATH}wishlist/:name`;

export const pathForgotPassword = `${nodeServerConfig.WEB_PATH}password/forgotten`;
export const pathResetPassword = `${nodeServerConfig.WEB_PATH}password/reset`;

export const pathCustomerProfilePage = `${pathCustomerPage}/profile`;

export const pathCustomerAddressesPage = `${pathCustomerPage}/addresses`;
export const pathAddressFormPage = `${pathCustomerAddressesPage}/:action`;

export const pathCheckoutPage = `${nodeServerConfig.WEB_PATH}checkout`;

export const pathNotFoundPage = `${nodeServerConfig.WEB_PATH}*`;

export const getContentRoutes = function(isReadyToShow: boolean) {
  if (!isReadyToShow) {
    return <AppMain><AppBackdrop isOpen={true} /></AppMain>;
  }
  return (
    <Switch>
      <Route path={ pathHomePage } exact component={ LoadableHomePage }/>
      <Route path={ pathSearchPage } component={ LoadableSearchPage }/>
      <Route path={ pathCategoryPage } component={ LoadableSearchPage }/>
      <Route path={ pathProductPage } component={ LoadableProductPage }/>
      <Route path={ pathLoginPage } component={ LoadableLoginPage }/>
      <Route path={ pathCartPage } component={ LoadableCartPage }/>
      <ProtectedRoute path={ pathCustomerPage } component={ LoadableCustomerPage }/>
      <Route path={ pathForgotPassword } exact component={ LoadablePasswordForgotPage }/>
      <Route path={ `${pathResetPassword}/:restoreKey` } component={ LoadablePasswordResetPage }/>

      <ProtectedRoute path={ pathWishlistPage } component={ LoadableWishListPage }/>
      <ProtectedRoute path={ pathWishlistDetailPage } component={ LoadableWishlistDetail }/>

      { /* TODO: Change to ProtectedRoute */ }
      <Route path={ pathCheckoutPage } component={ LoadableCheckoutPage }/>
      <Route path={ pathOrderDetailsPage } component={ LoadableOrderDetailsPage }/>

      <Route path={ pathNotFoundPage } component={ LoadableNotFound }/>
    </Switch>
  );
};
