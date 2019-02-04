import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadablePasswordResetPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadablePasswordReset" */
            'src/shared/components/Pages/ResetPassword/index').then(
            module => module.ResetPasswordPage,
        ),
    loading: () => <div>Loading...</div>,
});
