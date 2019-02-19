import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCustomerAddressPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableCustomerAddressPage" */
            'src/shared/components/pages/CustomerAddressesPage').then(
            module => module.default
        ),
    loading: () => <div>Loading...</div>,
});
