import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCartPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableCartPage" */
            'src/application/pages/CartPage').then(
            module => module.default,
        ),
    loading: () => <div>Loading...</div>,
});
