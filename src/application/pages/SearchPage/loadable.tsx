import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableSearchPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableSearch" */
            'src/application/pages/SearchPage/index').then(
            module => module.SearchPage,
        ),
    loading: () => <div style={{minHeight: '100vh', textAlign: 'center'}}>Loading...</div>,
});
