// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Common/Preloader';

export const LoadableOrderDetailsPage = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableOrderDetailsPage" */ 'src/shared/components/Pages/OrderDetailsPage').then(
      module => module.default,
    ),
  loading: () => <Preloader />,
});
