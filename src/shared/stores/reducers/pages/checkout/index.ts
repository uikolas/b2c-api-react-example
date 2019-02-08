import produce from 'immer';
import {
    CHECKOUT_DATA_INIT_REQUEST,
    SEND_CHECKOUT_DATA,
} from '@stores/actionTypes/pages/checkout';
import { IAddressItemCollection } from 'src/shared/interfaces/addresses/index';
import {
    IPaymentMethod,
    IShipmentMethod,
} from 'src/shared/interfaces/checkout/index';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { ICheckoutState, IPageCheckoutAction } from 'src/shared/stores/reducers/pages/checkout/types';

export const initialState: ICheckoutState = {
    data: {
        payments: [],
        shipments: [],
        addressesCollection: [],
        orderId: '',
    },
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
            default:
                break;
        }
    },
    initialState,
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
