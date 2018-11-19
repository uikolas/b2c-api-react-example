import produce from 'immer';
import {
  CHECKOUT_DATA_INIT_REQUEST,
  SEND_CHECKOUT_DATA,
} from 'src/shared/constants/ActionTypes/Pages/Checkout';
import {
  IReduxState,
} from 'src/typings/app';
import { IAddressItem } from "src/shared/interfaces/addresses";
import {
  IPayment,
  IShipment,
} from 'src/shared/interfaces/checkout';

export interface ICheckoutState extends IReduxState {
  data: {
    billingAddress?: IAddressItem | null;
    shippingAddress?: IAddressItem | null;
    payments?: Array<IPayment>;
    shipments?: Array<IShipment>;
  };
}

export const initialState: ICheckoutState = {
  data: {
    billingAddress: null,
    shippingAddress: null,
    payments: [],
    shipments: [],
  },
};

export const pageCheckout = produce<ICheckoutState>(
  (draft: ICheckoutState, action: any) => {
    switch (action.type) {
      case `${CHECKOUT_DATA_INIT_REQUEST}_PENDING`:
      case `${SEND_CHECKOUT_DATA}_PENDING`:
        draft.error = false;
        draft.pending = true;
        draft.fulfilled = false;
        draft.rejected = false;
        draft.initiated = true;
        break;
      case `${CHECKOUT_DATA_INIT_REQUEST}_REJECTED`:
      case `${SEND_CHECKOUT_DATA}_REJECTED`:
        draft.error = action.error;
        draft.pending = false;
        draft.fulfilled = false;
        draft.rejected = true;
        draft.initiated = true;
        break;
      case `${CHECKOUT_DATA_INIT_REQUEST}_FULFILLED`:
        draft.data.billingAddress = action.billingAddress || null;
        draft.data.shippingAddress = action.shippingAddress || null;

        draft.error = false;
        draft.pending = false;
        draft.fulfilled = true;
        draft.rejected = false;
        draft.initiated = true;
        break;
      case `${SEND_CHECKOUT_DATA}_FULFILLED`: {

        draft.error = false;
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

export function isPageCheckoutStateLoading(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.pageCheckout.pending);
}

export function isPageCheckoutStateRejected(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.pageCheckout.rejected);
}

export function isPageCheckoutFulfilled(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.pageCheckout.fulfilled);
}

function isStateExist(state: any, props: any): boolean {
  return Boolean(state.pageCheckout.data);
}
