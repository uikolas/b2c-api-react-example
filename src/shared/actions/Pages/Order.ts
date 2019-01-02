import { ORDER_DETAILS_REQUEST, ORDERS_COLLECTION_REQUEST } from '../../constants/ActionTypes/Pages/Order';
import { OrderService } from '../../services/Pages/Order';
import { IOrderCollectionParsed, IOrderDetailsParsed, TOrderId } from '../../interfaces/order';
import {IPageOrderHistoryAction} from "src/shared/reducers/Pages/OrderHistory/types";
import {IPageOrderDetailsAction} from "src/shared/reducers/Pages/OrderDetails/types";

/**
 *  Order History
 */

export const ordersCollectionPendingStateAction = () => ({
  type: ORDERS_COLLECTION_REQUEST + '_PENDING',
});

export const ordersCollectionRejectedStateAction = (message: string): IPageOrderHistoryAction => ({
  type: ORDERS_COLLECTION_REQUEST + '_REJECTED',
  payloadRejected: {error: message},
});

export const ordersCollectionFulfilledStateAction = (payload: IOrderCollectionParsed): IPageOrderHistoryAction => ({
  type: ORDERS_COLLECTION_REQUEST + '_FULFILLED',
  payloadFulfilled: payload,
});

export const getOrdersCollectionAction = function() {
  return (dispatch: Function, getState: Function) => {
    OrderService.getOrdersCollection(dispatch);
  };
};

/**
 *  Order Detail
 */

export const orderDetailsPendingStateAction = (): IPageOrderDetailsAction => ({
  type: ORDER_DETAILS_REQUEST + '_PENDING',
});

export const orderDetailsRejectedStateAction = (message: string): IPageOrderDetailsAction => ({
  type: ORDER_DETAILS_REQUEST + '_REJECTED',
  payloadRejected: {error: message},
});

export const orderDetailsFulfilledStateAction = (payload: IOrderDetailsParsed): IPageOrderDetailsAction => ({
  type: ORDER_DETAILS_REQUEST + '_FULFILLED',
  payloadFulfilled: payload,
});

export const getOrderDetailsAction = function(orderId: TOrderId) {
  return (dispatch: Function, getState: Function) => {
    OrderService.getOrderDetails(dispatch, orderId);
  };
};
