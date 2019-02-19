import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableProductPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableProductPage" */
            'src/application/pages/ProductPage').then(
            module => module.ProductPageContainer,
        ),
    loading: () => <div>Loading...</div>,
});
