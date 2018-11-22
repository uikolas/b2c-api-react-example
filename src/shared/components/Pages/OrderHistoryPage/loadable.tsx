// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableConnectedOrderHistoryPage = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableConnectedOrderHistoryPage" */ 'src/shared/components/Pages/OrderHistoryPage/reduxified').then(
      module => module.default,
    ),
  loading: () => <div>Loading...</div>,
});
