// tslint:disable:max-line-length
import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Common/Preloader';

export const LoadableCustomerAddressPage = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "LoadableCustomerAddressPage" */ 'src/shared/components/Pages/CustomerAddressesPage').then(
      module => module.default,
    ),
  loading: () => <Preloader />,
});
