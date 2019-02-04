import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadablePasswordForgotPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadablePasswordForgot" */
            'src/shared/components/Pages/ForgotPasswordPage/index').then(
            module => module.ForgotPasswordPage,
        ),
    loading: () => <div>Loading...</div>,
});
