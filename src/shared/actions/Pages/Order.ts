import {
  ORDERS_COLLECTION_REQUEST,
} from '../../constants/ActionTypes/Pages/Order';
import {OrderService} from "../../services/Pages/Order";

export const ordersCollectionPendingStateAction = () => ({
  type: ORDERS_COLLECTION_REQUEST + '_PENDING',
});

export const ordersCollectionRejectedStateAction = (message: string) => ({
  type: ORDERS_COLLECTION_REQUEST + '_REJECTED',
  payload: {error: message},
});

// TODO: Change interface payload
export const ordersCollectionFulfilledStateAction = (payload: any) => ({
  type: ORDERS_COLLECTION_REQUEST + '_FULFILLED',
  payload,
});

export const getOrdersCollectionAction = function () {
  return (dispatch: Function, getState: Function) => {
    OrderService.getOrdersCollection(dispatch);
  };
};
