import { reduxify } from '../../../lib/redux-helper';
import { getOrdersCollectionAction } from '@stores/actions/pages/order';
import {
    getOrdersCollectionFromStore,
    isOrderHistoryFulfilled,
    isOrderHistoryInitiated,
    isOrderHistoryItems,
    isOrderHistoryLoading,
    isOrderHistoryStateRejected,
} from '@stores/reducers/Pages/OrderHistory';
import { isAppInitiated } from '@stores/reducers/common/Init/index';
import { isUserAuthenticated } from '@stores/reducers/Pages/Login';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading: boolean = isOrderHistoryLoading(state, ownProps);
    const isRejected: boolean = isOrderHistoryStateRejected(state, ownProps);
    const isFulfilled = isOrderHistoryFulfilled(state, ownProps);
    const isInitiated = isOrderHistoryInitiated(state, ownProps);
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isHasOrders = isOrderHistoryItems(state, ownProps);
    const orders = getOrdersCollectionFromStore(state, ownProps);

    return ({
        isLoading,
        isRejected,
        isFulfilled,
        isAppDataSet,
        isUserLoggedIn,
        isInitiated,
        isHasOrders,
        orders,
    });
};

export const connect = reduxify(
    mapStateToProps,
    (dispatch: Function) => ({
        dispatch,
        getOrdersCollection: () => dispatch(getOrdersCollectionAction()),
    }),
);
