import { Dispatch } from 'redux';

import { reduxify } from '@lib/redux-helper';
import { ICartTotals } from '@interfaces/cart';
import { getCartTotals } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const totals: ICartTotals = getCartTotals(state, ownProps);

    return (
        {
            totals
        }
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
