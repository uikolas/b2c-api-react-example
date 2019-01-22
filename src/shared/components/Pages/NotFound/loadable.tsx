// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Common/Preloader';

export const LoadableNotFound = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableNotFound" */ 'src/shared/components/Pages/NotFound').then(
      module => module.default,
    ),
  loading: () => <Preloader />,
});
