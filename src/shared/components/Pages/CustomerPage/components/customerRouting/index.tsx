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
} from '@routes/contentRoutes';
import { LoadableOrderHistoryPage } from '@components/Pages/OrderHistoryPage/loadable';
import { LoadableCustomerAddressPage } from '@components/Pages/CustomerAddressesPage/loadable';
import { LoadableWishlistPage } from '@components/Pages/WishListPage/loadable';
import { LoadableOrderDetailsPage } from '@components/Pages/OrderDetailsPage/loadable';
import { LoadableCustomerProfilePage } from '@components/Pages/CustomerProfilePage/loadable';
import { LoadableWishlistDetail } from '@components/Pages/WishlistDetail/loadable';
import { CustomerAddressForm } from '@components/Pages/CustomerAddressForm';

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
