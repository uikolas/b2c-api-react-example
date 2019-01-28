// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Common/Preloader';

export const LoadableCustomerPage = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableCustomerPage" */ 'src/shared/components/Pages/CustomerPage').then(
      module => module.default,
    ),
  loading: () => <Preloader />,
});
