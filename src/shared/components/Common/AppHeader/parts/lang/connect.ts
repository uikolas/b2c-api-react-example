import { reduxify } from 'src/shared/lib/redux-helper';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ILocaleActionPayload } from '@stores/reducers/common/init/types';
import { switchLocaleAction } from '@stores/actions/common/init';
import { getAppLocale } from '@stores/reducers/common/init';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const appLocale = getAppLocale(state, ownProps);

    return ({
        appLocale,
    });
};

export const connect = reduxify(
    mapStateToProps,
    (dispatch: Function) => ({
        dispatch,
        switchLocaleAction: (payload: ILocaleActionPayload) => dispatch(switchLocaleAction(payload))
    }),
);
