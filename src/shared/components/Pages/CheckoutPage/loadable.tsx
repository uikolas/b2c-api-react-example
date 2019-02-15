import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCheckoutPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableCheckoutPage" */
            '@components/Pages/CheckoutPage').then(
            module => module.CheckoutPage,
        ),
    loading: () => <div style={{minHeight: '100vh', textAlign: 'center'}}>Loading...</div>,
});
