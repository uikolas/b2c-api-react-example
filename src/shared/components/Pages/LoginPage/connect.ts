import { reduxify } from 'src/shared/lib/redux-helper';
import { isUserAuthenticated } from '@stores/reducers/Pages/Login';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { ICustomerLoginData, ICustomerProfile } from '@interfaces/customer';
import { customerRegisterAction, loginCustomerAction } from '@stores/actions/pages/login';
import { getCustomerCartsAction } from '@stores/actions/common/cart';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isAuth = isUserAuthenticated(state, ownProps);

    return ({
        isAuth
    });
};

export const connect = reduxify(
    mapStateToProps,
    (dispatch: Function) => ({
        dispatch,
        handleSubmitRegisterForm: (data: ICustomerProfile): void => dispatch(customerRegisterAction(data)),
        handleSubmitLoginForm: (payload: ICustomerLoginData): void => dispatch(loginCustomerAction(payload)),
        getCustomerCart: () => dispatch(getCustomerCartsAction()),
    }),
);
