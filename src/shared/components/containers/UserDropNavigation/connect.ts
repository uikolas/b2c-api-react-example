import { bindActionCreators, Dispatch } from 'redux';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { reduxify } from 'src/shared/lib/redux-helper';
import { logout } from '@stores/actions/pages/login';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { getAppLocale } from '@stores/reducers/common/init';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const locale = getAppLocale(state, ownProps);

    return ({ isUserLoggedIn, locale });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            logout,
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
