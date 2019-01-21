import {reduxify} from 'src/shared/lib/redux-helper';
import {getRouterLocation, getRouterMatchParam}  from 'src/shared/helpers/router/router';
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
  isAppInitiated,
  TAppTimeZone
} from '@stores/reducers/common/init';
import {isUserAuthenticated} from '@stores/reducers/pages/login';
import {ICartCreatePayload} from 'src/shared/services/Common/Cart/types';
import {TCartAddItemCollection, TCartId} from 'src/shared/interfaces/cart';
import {TOrderId} from 'src/shared/interfaces/order';
import {getOrderDetailsAction} from '@stores/actions/pages/order';
import {addMultipleItemsToCartAction} from '@stores/actions/common/cart';
import {getCartId} from "@stores/reducers/common/cart/selectors";


const mapStateToProps = (state: any, ownProps: any) => {
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
  const currency = getAppCurrency(state, ownProps);
  const payloadForCreateCart: ICartCreatePayload = getPayloadForCreateCart(state, ownProps);
  const cartId: TCartId = getCartId(state, ownProps);
  const timeZone: TAppTimeZone = getAppTimeZone(state, ownProps);

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
    getOrderData: (orderId: TOrderId) => dispatch(getOrderDetailsAction(orderId)),
    addMultipleItemsToCart: (
      payload: TCartAddItemCollection, cartId: TCartId, payloadCartCreate: ICartCreatePayload,
    ) => dispatch(addMultipleItemsToCartAction(payload, cartId, payloadCartCreate)),
  }),
);
