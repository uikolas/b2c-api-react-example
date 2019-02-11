import produce from 'immer';
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
    CHECKOUT_MUTATE_SHIPMENT_METHOD,
    CHECKOUT_MUTATE_DELIVERY_STEP,
    CHECKOUT_MUTATE_BILLING_STEP,
    CHECKOUT_MUTATE_PAYMENT_METHOD,
    CHECKOUT_MUTATE_PAYMENT_SECTION,
    CHECKOUT_MUTATE_INVOICE_FORM,
    CHECKOUT_MUTATE_CREDIT_CARD_FORM
} from '@stores/actionTypes/pages/checkout';
import { IAddressItemCollection } from 'src/shared/interfaces/addresses/index';
import {
    IPaymentMethod,
    IShipmentMethod
} from 'src/shared/interfaces/checkout/index';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { ICheckoutState, IPageCheckoutAction } from 'src/shared/stores/reducers/pages/checkout/types';
import {
    deliverySelectionDefault,
    deliveryNewAddressDefault,
    stepCompletionCheckoutDefault,
    billingSelectionDefault,
    billingNewAddressDefault,
    paymentCreditCardDefault,
    paymentInvoiceDefault
} from '@components/Pages/CheckoutPage/constants/stateDefaults';

export const initialState: ICheckoutState = {
    deliveryNewAddress: {...deliveryNewAddressDefault},
    deliverySelection: {...deliverySelectionDefault},
    billingSelection: {...billingSelectionDefault},
    billingNewAddress: {...billingNewAddressDefault},
    stepsCompletion: {...stepCompletionCheckoutDefault},
    shipmentMethod: null,
    paymentMethod: null,
    paymentCreditCardData: {...paymentCreditCardDefault},
    paymentInvoiceData: {...paymentInvoiceDefault},
    data: {
        payments: [],
        shipments: [],
        addressesCollection: [],
        orderId: ''
    }
};

export const pageCheckout = produce<ICheckoutState>(
    (draft: ICheckoutState, action: IPageCheckoutAction) => {
        switch (action.type) {
            case `${CHECKOUT_DATA_INIT_REQUEST}_PENDING`:
            case `${SEND_CHECKOUT_DATA}_PENDING`:
                draft.data.orderId = '';
                draft.error = null;
                draft.pending = true;
                draft.fulfilled = false;
                draft.rejected = false;
                draft.initiated = false;
                break;
            case `${CHECKOUT_DATA_INIT_REQUEST}_REJECTED`:
            case `${SEND_CHECKOUT_DATA}_REJECTED`:
                draft.data.orderId = '';
                draft.error = action.error || action.payloadRejected.error;
                draft.pending = false;
                draft.fulfilled = false;
                draft.rejected = true;
                draft.initiated = false;
                break;
            case `${CHECKOUT_DATA_INIT_REQUEST}_FULFILLED`:
                draft.data.payments = action.payloadGetFulfilled.payments || null;
                draft.data.shipments = action.payloadGetFulfilled.shipments || null;
                draft.data.addressesCollection = action.payloadGetFulfilled.addressesCollection || null;

                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            case `${SEND_CHECKOUT_DATA}_FULFILLED`: {
                draft.data.orderId = action.payloadSendFulfilled.orderId;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            }
            case CHECKOUT_MUTATE_DELIVERY_ADDRESS: {
                draft.deliveryNewAddress = {
                    ...draft.deliveryNewAddress,
                    [action.payload.key]: {
                        value: action.payload.value,
                        isError: action.payload.isError
                    }
                };
                break;
            }
            case CHECKOUT_MUTATE_DELIVERY_SELECTION_ADD_NEW: {
                draft.deliverySelection = {
                    selectedAddressId: null,
                    isAddNew: true
                };
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    first: false
                };
                break;
            }
            case CHECKOUT_MUTATE_DELIVERY_SELECTION_ADDRESS_ID: {
                draft.deliverySelection = {
                    selectedAddressId: action.payload,
                    isAddNew: false
                };
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    first: true
                };
                break;
            }
            case CHECKOUT_MUTATE_DELIVERY_STEP: {
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    first: action.payload
                };
                break;
            }
            case CHECKOUT_MUTATE_BILLING_SELECTION_ADD_NEW: {
                draft.billingSelection = {
                    selectedAddressId: null,
                    isAddNew: true,
                    isSameAsDelivery: false
                };
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    second: false
                };
                break;
            }
            case CHECKOUT_MUTATE_BILLING_SELECTION_ADDRESS_ID: {
                draft.billingSelection = {
                    selectedAddressId: action.payload,
                    isAddNew: false,
                    isSameAsDelivery: false
                };
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    second: true
                };
                break;
            }
            case CHECKOUT_MUTATE_BILLING_SELECTION_SAME_AS_DELIVERY: {
                draft.billingSelection = {
                    selectedAddressId: null,
                    isAddNew: false,
                    isSameAsDelivery: true
                };
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    second: true
                };
                break;
            }
            case CHECKOUT_MUTATE_BILLING_STEP: {
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    second: action.payload
                };
                break;
            }
            case CHECKOUT_MUTATE_BILLING_ADDRESS: {
                draft.billingNewAddress = {
                    ...draft.billingNewAddress,
                    [action.payload.key]: {
                        value: action.payload.value,
                        isError: action.payload.isError
                    }
                };
                break;
            }
            case CHECKOUT_MUTATE_SHIPMENT_METHOD: {
                draft.shipmentMethod = action.payload;
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    third: true
                };
                break;
            }
            case CHECKOUT_MUTATE_PAYMENT_METHOD: {
                draft.paymentMethod = action.payload.value;
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    fourth: action.payload.isFourthStepCompleted
                };
                break;
            }
            case CHECKOUT_MUTATE_PAYMENT_SECTION: {
                draft.stepsCompletion = {
                    ...draft.stepsCompletion,
                    fourth: action.payload
                };
                break;
            }
            case CHECKOUT_MUTATE_CREDIT_CARD_FORM: {
                draft.paymentCreditCardData = {
                    ...draft.paymentCreditCardData,
                    [action.payload.key]: {
                        value: action.payload.value,
                        isError: action.payload.isError
                    }
                };
                break;
            }
            case CHECKOUT_MUTATE_INVOICE_FORM: {
                draft.paymentInvoiceData = {
                    ...draft.paymentInvoiceData,
                    [action.payload.key]: {
                        value: action.payload.value,
                        isError: action.payload.isError
                    }
                };
                break;
            }
            default:
                break;
        }
    },
    initialState
);

export function isPageCheckoutStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageCheckout.pending);
}

export function isPageCheckoutStateRejected(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageCheckout.rejected);
}

export function isPageCheckoutFulfilled(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageCheckout.fulfilled);
}

export function getShipmentMethodsFromStore(state: IReduxStore, props: IReduxOwnProps): IShipmentMethod[] | null {
    return isShipmentMethodsExist(state, props) ? state.pageCheckout.data.shipments : null;
}

export function isShipmentMethodsExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageCheckout.data.shipments);
}

export function getPaymentMethodsFromStore(state: IReduxStore, props: IReduxOwnProps): IPaymentMethod[] | null {
    return isPaymentMethodsExist(state, props) ? state.pageCheckout.data.payments : null;
}

export function isPaymentMethodsExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageCheckout.data.payments);
}

export function getAddressesCollectionFromCheckoutStore(state: IReduxStore, props: IReduxOwnProps):
    IAddressItemCollection[] | null {

    return checkAddressesCollectionExist(state, props) ? state.pageCheckout.data.addressesCollection : null;
}

export function checkAddressesCollectionExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props)
        && state.pageCheckout.data.addressesCollection
        && state.pageCheckout.data.addressesCollection.length
    );
}

export function getCreatedOrder(state: IReduxStore, props: IReduxOwnProps): string {
    return isStateExist(state, props) ? state.pageCheckout.data.orderId : '';
}

function isStateExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(state.pageCheckout.data);
}
