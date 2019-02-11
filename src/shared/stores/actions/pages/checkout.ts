import {
    CHECKOUT_DATA_INIT_REQUEST,
    SEND_CHECKOUT_DATA,
    CHECKOUT_MUTATE_DELIVERY_ADDRESS,
    CHECKOUT_MUTATE_DELIVERY_SELECTION_ADD_NEW,
    CHECKOUT_MUTATE_DELIVERY_SELECTION_ADDRESS_ID,
    CHECKOUT_MUTATE_BILLING_SELECTION_ADD_NEW,
    CHECKOUT_MUTATE_BILLING_SELECTION_ADDRESS_ID,
    CHECKOUT_MUTATE_BILLING_SELECTION_SAME_AS_DELIVERY,
    CHECKOUT_MUTATE_BILLING_ADDRESS,
    CHECKOUT_MUTATE_DELIVERY_STEP,
    CHECKOUT_MUTATE_BILLING_STEP,
    CHECKOUT_MUTATE_SHIPMENT_METHOD,
    CHECKOUT_MUTATE_PAYMENT_METHOD,
    CHECKOUT_MUTATE_PAYMENT_SECTION,
    CHECKOUT_MUTATE_CREDIT_CARD_FORM,
    CHECKOUT_MUTATE_INVOICE_FORM
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

export const mutateStateNewAddressDeliveryAction = (payload: any) => ({
    type: CHECKOUT_MUTATE_DELIVERY_ADDRESS,
    payload,
});

export const mutateStateNewAddressBillingAction = (payload: any) => ({
    type: CHECKOUT_MUTATE_BILLING_ADDRESS,
    payload,
});

export const mutateStateDeliverySelectionAddNewAction = () => ({
    type: CHECKOUT_MUTATE_DELIVERY_SELECTION_ADD_NEW
});

export const mutateStateBillingSelectionAddNewAction = () => ({
    type: CHECKOUT_MUTATE_BILLING_SELECTION_ADD_NEW
});

export const mutateStateDeliverySelectionAddressIdAction = (payload: string) => ({
    type: CHECKOUT_MUTATE_DELIVERY_SELECTION_ADDRESS_ID,
    payload,
});

export const mutateStateBillingSelectionAddressIdAction = (payload: string) => ({
    type: CHECKOUT_MUTATE_BILLING_SELECTION_ADDRESS_ID,
    payload,
});

export const mutateStateBillingSelectionSameAsDeliveryAction = () => ({
    type: CHECKOUT_MUTATE_BILLING_SELECTION_SAME_AS_DELIVERY
});

export const mutateDeliveryStepAction = (payload: boolean) => ({
    type: CHECKOUT_MUTATE_DELIVERY_STEP,
    payload,
});

export const mutateBillingStepAction = (payload: boolean) => ({
    type: CHECKOUT_MUTATE_BILLING_STEP,
    payload,
});

export const mutateShipmentMethodAction = (payload: string) => ({
    type: CHECKOUT_MUTATE_SHIPMENT_METHOD,
    payload,
});

export const mutatePaymentMethodAction = (payload: string) => ({
    type: CHECKOUT_MUTATE_PAYMENT_METHOD,
    payload,
});

export const mutatePaymentSectionAction = (payload: boolean) => ({
    type: CHECKOUT_MUTATE_PAYMENT_SECTION,
    payload,
});

export const mutateStateCreditCardAction = (payload: any) => ({
    type: CHECKOUT_MUTATE_CREDIT_CARD_FORM,
    payload,
});

export const mutateStateInvoiceFormAction = (payload: any) => ({
    type: CHECKOUT_MUTATE_INVOICE_FORM,
    payload,
});
