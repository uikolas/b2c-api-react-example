import {
  CHECKOUT_DATA_INIT_REQUEST,
  SEND_CHECKOUT_DATA,
} from '@stores/actionTypes/pages/checkout';
import { CheckoutService } from '@services/Pages/checkout';
import { ICheckoutRequest } from '@interfaces/checkout';


export const getCheckoutDataInitPendingStateAction = () => ({
  type: CHECKOUT_DATA_INIT_REQUEST + '_PENDING',
});

export const getCheckoutDataInitRejectedStateAction = (message: string) => ({
  type: CHECKOUT_DATA_INIT_REQUEST + '_REJECTED',
  payload: {error: message},
});

export const getCheckoutDataInitFulfilledStateAction = (payload: any) => ({
  type: CHECKOUT_DATA_INIT_REQUEST + '_FULFILLED',
  payload,
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

export const sendCheckoutDataFulfilledStateAction = (orderId: string) => ({
  type: SEND_CHECKOUT_DATA + '_FULFILLED',
  orderId,
});

export const sendCheckoutDataAction = function(payload: ICheckoutRequest, anonymId: string) {
  return (dispatch: Function, getState: Function) => {
    CheckoutService.sendOrderData(dispatch, payload, anonymId);
  };
};
