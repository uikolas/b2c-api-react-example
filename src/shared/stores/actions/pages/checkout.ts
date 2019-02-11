import {
    CHECKOUT_DATA_INIT_REQUEST,
    SEND_CHECKOUT_DATA,
    CHECKOUT_MUTATE_DELIVERY_ADDRESS
} from '@stores/actionTypes/pages/checkout';
import { CheckoutService } from '@services/Pages/Checkout';
import { ICheckoutRequest } from '@interfaces/checkout';
import { TOrderId } from '@interfaces/order';
import { ICheckoutResponseData, IPageCheckoutAction } from 'src/shared/stores/reducers/pages/checkout/types';

export const getCheckoutDataInitPendingStateAction = () => ({
    type: CHECKOUT_DATA_INIT_REQUEST + '_PENDING',
});

export const getCheckoutDataInitRejectedStateAction = (message: string | React.ReactNode) => ({
    type: CHECKOUT_DATA_INIT_REQUEST + '_REJECTED',
    payloadRejected: {error: message},
});

export const getCheckoutDataInitFulfilledStateAction = (payload: ICheckoutResponseData): IPageCheckoutAction => ({
    type: CHECKOUT_DATA_INIT_REQUEST + '_FULFILLED',
    payloadGetFulfilled: payload,
});

export const getCheckoutDataAction = function (payload: ICheckoutRequest, anonymId: string) {
    return (dispatch: Function, getState: Function) => {
        CheckoutService.getCheckoutData(dispatch, payload, anonymId);
    };
};

export const sendCheckoutDataPendingStateAction = () => ({
    type: SEND_CHECKOUT_DATA + '_PENDING',
});

export const sendCheckoutDataRejectedStateAction = (message: string) => ({
    type: SEND_CHECKOUT_DATA + '_REJECTED',
    payloadRejected: {error: message},
});

export const sendCheckoutDataFulfilledStateAction = (orderId: TOrderId) => ({
    type: SEND_CHECKOUT_DATA + '_FULFILLED',
    payloadSendFulfilled: {orderId},
});

export const sendCheckoutDataAction = function (payload: ICheckoutRequest, anonymId: string) {
    return (dispatch: Function, getState: Function) => {
        CheckoutService.sendOrderData(dispatch, payload, anonymId);
    };
};

export const mutateStateDeliveryAction = (payload: ICheckoutRequest) => ({
    type: CHECKOUT_MUTATE_DELIVERY_ADDRESS,
    payloasssd: payload,
});
