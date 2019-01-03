import {
  CHECKOUT_DATA_INIT_REQUEST,
  SEND_CHECKOUT_DATA,
} from "src/shared/constants/ActionTypes/Pages/Checkout";
import { CheckoutService } from 'src/shared/services/Pages/Checkout/index';
import {
  ICheckoutRequest,
} from 'src/shared/interfaces/checkout';
import {TOrderId} from "src/shared/interfaces/order/index";
import {ICheckoutResponseData, TPageCheckoutAction} from "src/shared/reducers/Pages/Checkout/types";


export const getCheckoutDataInitPendingStateAction = () => ({
  type: CHECKOUT_DATA_INIT_REQUEST + '_PENDING',
});

export const getCheckoutDataInitRejectedStateAction = (message: string) => ({
  type: CHECKOUT_DATA_INIT_REQUEST + '_REJECTED',
  payload: {error: message},
});

export const getCheckoutDataInitFulfilledStateAction = (payload: ICheckoutResponseData): TPageCheckoutAction => ({
  type: CHECKOUT_DATA_INIT_REQUEST + '_FULFILLED',
  payloadGetFulfilled: payload,
});

export const getCheckoutDataAction = function(payload: ICheckoutRequest, anonymId: string) {
  return (dispatch: Function, getState: Function) => {
    CheckoutService.getCheckoutData(dispatch, payload, anonymId);
  };
};

export const sendCheckoutDataPendingStateAction = () => ({
  type: SEND_CHECKOUT_DATA + '_PENDING',
});

export const sendCheckoutDataRejectedStateAction = (message: string) => ({
  type: SEND_CHECKOUT_DATA + '_REJECTED',
  payload: {error: message},
});

export const sendCheckoutDataFulfilledStateAction = (orderId: TOrderId) => ({
  type: SEND_CHECKOUT_DATA + '_FULFILLED',
  payloadSendFulfilled: orderId,
});

export const sendCheckoutDataAction = function(payload: ICheckoutRequest, anonymId: string) {
  return (dispatch: Function, getState: Function) => {
    CheckoutService.sendOrderData(dispatch, payload, anonymId);
  };
};
