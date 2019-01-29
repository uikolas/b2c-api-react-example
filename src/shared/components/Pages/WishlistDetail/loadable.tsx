// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Common/Preloader';

export const LoadableWishlistDetail = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableWishlistDetail" */ 'src/shared/components/Pages/WishlistDetail').then(
      module => module.default,
    ),
  loading: () => <Preloader />,
});
