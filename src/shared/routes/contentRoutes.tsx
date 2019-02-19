import * as React from 'react';
import { Route, Switch } from 'react-router';

import { ProtectedRoute } from '@components/hoc/ProtectedRoute';

import { LoadableHomePage } from '../components/pages/HomePage/loadable';
import { LoadableLoginPage } from '../components/pages/LoginPage/loadable';
import { LoadablePasswordForgotPage } from '../components/pages/ForgotPasswordPage/loadable';
import { LoadablePasswordResetPage } from '../components/pages/ResetPasswordPage/loadable';
import { LoadableSearchPage } from '../components/pages/SearchPage/loadable';
import { LoadableProductPage } from '../components/pages/ProductPage/loadable';
import { LoadableCartPage } from '../components/pages/CartPage/loadable';
import { LoadableCustomerPage } from '../components/pages/CustomerPage/loadable';
import { LoadableNotFound } from '../components/pages/NotFound/loadable';

import { LoadableWishlistPage } from '../components/pages/WishlistPage/loadable';
import { LoadableWishlistDetail } from '../components/pages/WishlistDetail/loadable';

import { LoadableCheckoutPage } from 'src/shared/components/pages/CheckoutPage/loadable';

import config from '../configs/server';
import { AppMain } from 'src/shared/components/Common/AppMain/index';
import { LoadableOrderDetailsPage } from 'src/shared/components/pages/OrderDetailsPage/loadable';
import { CustomerAddressForm } from '@components/pages/CustomerAddressForm';

export const pathHomePage = `${config.WEB_PATH}`;
export const pathSearchPage = `${config.WEB_PATH}search`;

export const pathCategoryPageBase = `${config.WEB_PATH}category`;
export const pathCategoryPage = `${pathCategoryPageBase}/:categoryId`;

export const pathProductPageBase = `${config.WEB_PATH}product`;
export const pathProductPage = `${pathProductPageBase}/:productId`;
export const pathLoginPage = `${config.WEB_PATH}login`;
export const pathCartPage = `${config.WEB_PATH}cart`;

export const pathCustomerPage = `${config.WEB_PATH}customer`;

export const pathWishlistsPage = `${pathCustomerPage}/wishlists`;
export const pathWishlistPageBase = `${pathCustomerPage}/wishlist`;
export const pathWishlistDetailPage = `${pathWishlistPageBase}/:wishlistId`;

export const pathOrderHistoryPage = `${pathCustomerPage}/order`;
export const pathOrderDetailsPageBase = `${pathOrderHistoryPage}/details`;
export const pathOrderDetailsPage = `${pathOrderDetailsPageBase}/:orderId`;
/*export const pathWishlistPage = `${config.WEB_PATH}wishlists`;
export const pathWishlistDetailPage = `${config.WEB_PATH}wishlist/:name`;*/

export const pathForgotPassword = `${config.WEB_PATH}password/forgotten`;
export const pathResetPassword = `${config.WEB_PATH}password/reset`;

export const pathCustomerProfilePage = `${pathCustomerPage}/profile`;

export const pathCustomerAddressesPage = `${pathCustomerPage}/addresses`;
export const pathAddressFormUpdateBase = `${pathCustomerAddressesPage}/update`;
export const pathAddressFormUpdate = `${pathAddressFormUpdateBase}/:addressId`;
export const pathAddressFormNew = `${pathCustomerAddressesPage}/new`;

export const pathCheckoutPage = `${config.WEB_PATH}checkout`;

export const pathNotFoundPage = `${config.WEB_PATH}*`;

export const getContentRoutes = function(isReadyToShow: boolean) {
    if (!isReadyToShow) {
        return <AppMain />;
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

            <ProtectedRoute path={ pathWishlistsPage } component={ LoadableWishlistPage }/>
            <ProtectedRoute path={ pathWishlistDetailPage } component={ LoadableWishlistDetail }/>

            { /* TODO: Change to ProtectedRoute */ }
            <Route path={ pathCheckoutPage } component={ LoadableCheckoutPage }/>
            <Route path={ pathOrderDetailsPage } component={ LoadableOrderDetailsPage }/>
            <Route path={ pathAddressFormUpdate } component={ CustomerAddressForm }/>

            <Route path={ pathNotFoundPage } component={ LoadableNotFound }/>
        </Switch>
    );
};
