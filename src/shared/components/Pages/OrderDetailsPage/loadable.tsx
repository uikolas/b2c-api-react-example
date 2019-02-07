import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableOrderDetailsPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableOrderDetailsPage" */
            '@components/Pages/OrderDetailsPage').then(
            module => module.default,
        ),
    loading: () => <div>Loading...</div>,
});
