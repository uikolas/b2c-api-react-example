import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableOrderHistoryPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableOrderHistoryPage" */
            'src/shared/components/Pages/OrderHistoryPage').then(
            module => module.OrderHistoryContainer,
        ),
    loading: () => <div style={{minHeight: '100vh', textAlign: 'center'}}>Loading...</div>,
});
