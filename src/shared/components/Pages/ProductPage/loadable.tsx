// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Common/Preloader';

export const LoadableProductPage = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableProductPage" */ 'src/shared/components/Pages/ProductPage').then(
      module => module.default,
    ),
  loading: () => <Preloader />,
});
