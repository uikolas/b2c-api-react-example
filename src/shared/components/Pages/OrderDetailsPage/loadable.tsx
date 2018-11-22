// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableConnectedOrderDetailsPage = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableConnectedOrderDetailsPage" */ 'src/shared/components/Pages/OrderDetailsPage/reduxified').then(
      module => module.default,
    ),
  loading: () => <div>Loading...</div>,
});
