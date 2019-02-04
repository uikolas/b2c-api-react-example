import { reduxify } from 'src/shared/lib/redux-helper';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { forgotPasswordAction } from '@stores/actions/pages/login';
import { getRouterHistoryBack } from '@helpers/router';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const routerGoBack = getRouterHistoryBack(state, ownProps);

    return ({
        routerGoBack
    });
};

export const connect = reduxify(
    mapStateToProps,
    (dispatch: Function) => ({
        dispatch,
        sendForgotRequest: (email: string) => dispatch(forgotPasswordAction(email))
    }),
);
