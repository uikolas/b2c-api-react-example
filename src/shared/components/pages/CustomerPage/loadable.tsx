import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCustomerPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableCustomerPage" */
            'src/shared/components/pages/CustomerPage').then(
            module => module.default,
        ),
    loading: () => <div>Loading...</div>,
});
