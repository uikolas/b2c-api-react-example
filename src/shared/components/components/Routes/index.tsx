import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ProtectedRoute } from '@components/hoc/ProtectedRoute';
import { AppMain } from '@components/components/AppMain';
import { LoadableHomePage } from '@components/pages/HomePage/loadable';
import { LoadableSearchPage } from '@components/pages/SearchPage/loadable';
import { LoadableProductPage } from '@components/pages/ProductPage/loadable';
import { LoadableLoginPage } from '@components/pages/LoginPage/loadable';
import { LoadableCartPage } from '@components/pages/CartPage/loadable';
import { LoadableCustomerPage } from '@components/pages/CustomerPage/loadable';
import { LoadablePasswordForgotPage } from '@components/pages/ForgotPasswordPage/loadable';
import { LoadablePasswordResetPage } from '@components/pages/ResetPasswordPage/loadable';
import { LoadableWishlistPage } from '@components/pages/WishlistPage/loadable';
import { LoadableWishlistDetail } from '@components/pages/WishlistDetail/loadable';
import { LoadableCheckoutPage } from '@components/pages/CheckoutPage/loadable';
import { LoadableOrderDetailsPage } from '@components/pages/OrderDetailsPage/loadable';
import { CustomerAddressForm } from '@components/pages/CustomerAddressForm';
import { LoadableNotFound } from '@components/pages/NotFound/loadable';
import {
    pathAddressFormUpdate,
    pathCartPage,
    pathCategoryPage, pathCheckoutPage, pathCustomerPage, pathForgotPassword,
    pathHomePage,
    pathLoginPage, pathNotFoundPage, pathOrderDetailsPage,
    pathProductPage, pathResetPassword,
    pathSearchPage, pathWishlistDetailPage, pathWishlistsPage
} from '@constants/routes';

export const getContentRoutes = (isReadyToShow: boolean): JSX.Element => {
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
