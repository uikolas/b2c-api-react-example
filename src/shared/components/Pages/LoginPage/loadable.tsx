// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Common/Preloader';

export const LoadableLoginPage = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableLoginPage" */ 'src/shared/components/Pages/LoginPage').then(
      module => module.default,
    ),
  loading: () => <Preloader />,
});
