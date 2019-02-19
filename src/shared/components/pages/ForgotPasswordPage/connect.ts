import { reduxify } from 'src/shared/components/hoc/Reduxify/index';
import { forgotPasswordAction } from '@stores/actions/pages/login';
import { getRouterHistoryBack } from '@helpers/router';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const routerGoBack = getRouterHistoryBack(state, ownProps);

    return ({
        routerGoBack
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    sendForgotRequest: (email: string) => dispatch(forgotPasswordAction(email))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
