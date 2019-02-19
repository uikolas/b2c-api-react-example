import * as React from 'react';
import { Route, Switch } from 'react-router';
import {
    pathAddressFormNew,
    pathAddressFormUpdate,
    pathCustomerAddressesPage,
    pathCustomerPage,
    pathCustomerProfilePage,
    pathOrderDetailsPage,
    pathOrderHistoryPage,
    pathWishlistDetailPage,
    pathWishlistsPage,
} from '@constants/routes';
import { LoadableOrderHistoryPage } from '@components/pages/OrderHistoryPage/loadable';
import { LoadableCustomerAddressPage } from '@components/pages/CustomerAddressesPage/loadable';
import { LoadableWishlistPage } from '@components/pages/WishListPage/loadable';
import { LoadableOrderDetailsPage } from '@components/pages/OrderDetailsPage/loadable';
import { LoadableCustomerProfilePage } from '@components/pages/CustomerProfilePage/loadable';
import { LoadableWishlistDetail } from '@components/pages/WishlistDetail/loadable';
import { CustomerAddressForm } from '@components/pages/CustomerAddressForm';

export const CustomerRouting: React.SFC = (): JSX.Element => (
    <Switch>
        <Route path={ pathCustomerPage } exact component={ LoadableCustomerProfilePage } />
        <Route path={ pathCustomerAddressesPage } exact
               component={ LoadableCustomerAddressPage } />
        <Route path={ pathAddressFormUpdate } component={ CustomerAddressForm }/>
        <Route path={ pathAddressFormNew } component={ CustomerAddressForm } />
        <Route path={ pathWishlistsPage } component={ LoadableWishlistPage } />
        <Route path={ pathWishlistDetailPage } component={ LoadableWishlistDetail } />
        <Route path={ pathOrderHistoryPage } exact component={ LoadableOrderHistoryPage } />
        <Route path={ pathOrderDetailsPage } component={ LoadableOrderDetailsPage } />
        <Route path={ pathCustomerProfilePage } component={ LoadableCustomerProfilePage } />
    </Switch>
);
