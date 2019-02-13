import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadablePasswordForgotPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadablePasswordForgot" */
            '@components/Pages/ForgotPasswordPage').then(
            module => module.ForgotPasswordPage,
        ),
    loading: () => <div>Loading...</div>,
});
