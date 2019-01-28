// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Common/Preloader';

export const LoadableSearchPage = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableSearch" */ 'src/shared/components/Pages/SearchPage').then(
      module => module.default,
    ),
  loading: () => <Preloader />,
});
