import { reduxify } from 'src/shared/lib/redux-helper';
import { getRouterMatchParam } from 'src/shared/helpers/router';
import {
    getOrderDetailsFromStore,
    isOrderDetailsFulfilled,
    isOrderDetailsInitiated,
    isOrderDetailsLoading,
    isOrderDetailsPresent,
    isOrderDetailsStateRejected,
} from '@stores/reducers/pages/orderDetails';
import {
    getAppCurrency,
    getAppTimeZone,
    getPayloadForCreateCart,
    isAppInitiated
} from '@stores/reducers/common/init';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getOrderDetailsAction } from '@stores/actions/pages/order';
import { getCartId } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TAppTimeZone } from '@interfaces/locale';
import { ICartCreatePayload } from '@services/Common/Cart/types';
import { TCartId } from '@interfaces/cart';
import { TOrderId } from '@interfaces/order';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading = isOrderDetailsLoading(state, ownProps);
    const isRejected = isOrderDetailsStateRejected(state, ownProps);
    const isFulfilled = isOrderDetailsFulfilled(state, ownProps);
    const isInitiated = isOrderDetailsInitiated(state, ownProps);
    const isAppDataSet = isAppInitiated(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isOrderExist = isOrderDetailsPresent(state, ownProps);
    const order = getOrderDetailsFromStore(state, ownProps);
    const orderIdParam = getRouterMatchParam(state, ownProps, 'orderId');
    const currency = getAppCurrency(state, ownProps);
    const payloadForCreateCart: ICartCreatePayload = getPayloadForCreateCart(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);
    const timeZone: TAppTimeZone = getAppTimeZone(state, ownProps);

    return ({
        isLoading,
        isRejected,
        isFulfilled,
        isAppDataSet,
        isUserLoggedIn,
        isInitiated,
        isOrderExist,
        orderIdParam,
        order,
        currency,
        payloadForCreateCart,
        cartId,
        timeZone
    });
};

export const connect = reduxify(
    mapStateToProps,
    (dispatch: Function) => ({
        dispatch,
        getOrderData: (orderId: TOrderId) => dispatch(getOrderDetailsAction(orderId))
    }),
);
