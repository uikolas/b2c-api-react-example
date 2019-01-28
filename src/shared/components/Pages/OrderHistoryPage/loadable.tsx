// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Common/Preloader';

export const LoadableOrderHistoryPage = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableOrderHistoryPage" */ 'src/shared/components/Pages/OrderHistoryPage').then(
      module => module.default,
    ),
  loading: () => <Preloader />,
});
