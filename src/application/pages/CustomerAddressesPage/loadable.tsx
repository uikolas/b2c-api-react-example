import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCustomerAddressPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableCustomerAddressPage" */
            'src/application/pages/CustomerAddressesPage/index').then(
            module => module.default
        ),
    loading: () => <div>Loading...</div>,
});
