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
    pathWishListsPage,
} from 'src/shared/routes/contentRoutes';
import { LoadableOrderHistoryPage } from '@components/Pages/OrderHistoryPage/loadable';
import { LoadableCustomerAddressPage } from '@components/Pages/CustomerAddressesPage/loadable';
import { AddressFormPage } from '@components/Pages/CustomerAddressesPage/AddressForm';
import { LoadableWishListPage } from '@components/Pages/WishListPage/loadable';
import { LoadableOrderDetailsPage } from '@components/Pages/OrderDetailsPage/loadable';
import { LoadableCustomerProfilePage } from '@components/Pages/CustomerProfilePage/loadable';
import { LoadableWishlistDetail } from '@components/Pages/WishlistDetail/loadable';

export const CustomerRouting: React.SFC = (): JSX.Element => (
    <Switch>
        <Route path={ pathCustomerPage } exact component={ LoadableCustomerProfilePage } />
        <Route path={ pathCustomerAddressesPage } exact
               component={ LoadableCustomerAddressPage } />
        <Route path={ pathAddressFormUpdate } component={ AddressFormPage }/>
        <Route path={ pathAddressFormNew } component={ AddressFormPage } />
        <Route path={ pathWishListsPage } component={ LoadableWishListPage } />
        <Route path={ pathWishlistDetailPage } component={ LoadableWishlistDetail } />
        <Route path={ pathOrderHistoryPage } exact component={ LoadableOrderHistoryPage } />
        <Route path={ pathOrderDetailsPage } component={ LoadableOrderDetailsPage } />
        <Route path={ pathCustomerProfilePage } component={ LoadableCustomerProfilePage } />
    </Switch>
);
