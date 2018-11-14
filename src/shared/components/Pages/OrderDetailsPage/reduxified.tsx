import * as React from 'react';
import { reduxify } from '../../../lib/redux-helper';
import { OrderDetailsPage } from '.';
import { getRouterHistoryBack, getRouterLocation, getRouterMatchParam } from '../../../selectors/Common/router';
import {
  getOrderDetailsFromStore,
  isOrderDetailsFulfilled,
  isOrderDetailsInitiated,
  isOrderDetailsLoading,
  isOrderDetailsPresent,
  isOrderDetailsStateRejected,
} from '../../../reducers/Pages/OrderDetails';
import { getAppCurrency, getPayloadForCreateCart, isAppInitiated } from '../../../reducers/Common/Init';
import { isUserAuthenticated } from '../../../reducers/Pages/Login';
import { ICartCreatePayload } from '../../../services/Common/Cart';
import { TCartAddItemCollection, TCartId } from '../../../interfaces/cart';
import { getCartId } from '../../../reducers/Common/Cart';
import { TOrderId } from '../../../interfaces/order';
import { getOrderDetailsAction } from '../../../actions/Pages/Order';
import { addMultipleItemsToCartAction } from '../../../actions/Common/Cart';

export const ConnectedOrderDetailsPage = reduxify(
  (state: any, ownProps: any) => {
    const location = getRouterLocation(state, ownProps);
    const isLoading = isOrderDetailsLoading(state, ownProps);
    const isRejected = isOrderDetailsStateRejected(state, ownProps);
    const isFulfilled = isOrderDetailsFulfilled(state, ownProps);
    const isInitiated = isOrderDetailsInitiated(state, ownProps);
    const isAppDataSet = isAppInitiated(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isOrderExist = isOrderDetailsPresent(state, ownProps);
    const order = getOrderDetailsFromStore(state, ownProps);
    const orderIdParam = getRouterMatchParam(state, ownProps, 'orderId');
    const routerGoBack = getRouterHistoryBack(state, ownProps);
    const currency = getAppCurrency(state, ownProps);
    const payloadForCreateCart: ICartCreatePayload = getPayloadForCreateCart(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);

    return ({
      location,
      isLoading,
      isRejected,
      isFulfilled,
      isAppDataSet,
      isUserLoggedIn,
      isInitiated,
      isOrderExist,
      orderIdParam,
      order,
      routerGoBack,
      currency,
      payloadForCreateCart,
      cartId,
    });
  },
  (dispatch: Function) => ({
    getOrderData: (orderId: TOrderId) => dispatch(getOrderDetailsAction(orderId)),
    addMultipleItemsToCart: (
      payload: TCartAddItemCollection, cartId: TCartId, payloadCartCreate: ICartCreatePayload,
    ) => dispatch(addMultipleItemsToCartAction(payload, cartId, payloadCartCreate)),
  }),
)(OrderDetailsPage);
