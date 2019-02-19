import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableOrderDetailsPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableOrderDetailsPage" */
            '@components/pages/OrderDetailsPage').then(
            module => module.OrderDetailsContainer,
        ),
    loading: () => <div>Loading...</div>,
});
