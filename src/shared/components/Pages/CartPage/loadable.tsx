// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Common/Preloader';

export const LoadableCartPage = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableCartPage" */ 'src/shared/components/Pages/CartPage').then(
      module => module.default,
    ),
  loading: () => <Preloader />,
});
