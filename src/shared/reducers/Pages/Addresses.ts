import produce from 'immer';
import {
  ADDRESSES_LIST,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
} from '../../constants/ActionTypes/Pages/Addresses';
import {
  IReduxState,
} from '../../../typings/app';
import {IAddressItem} from '../../interfaces/addresses';

export interface IAddressesState extends IReduxState {
  data: {
    addresses: IAddressItem[],
    currentAddress: IAddressItem | null,
    isInitial: boolean,
  };
}

export const initialState: IAddressesState = {
  data: {
    addresses: [],
    currentAddress: null,
    isInitial: false,
  },
};

export const pageAddresses = produce<IAddressesState>(
  (draft: IAddressesState, action: any) => {
    switch (action.type) {
      case `${ADDRESSES_LIST}_PENDING`:
      case `${ADD_ADDRESS}_PENDING`:
      case `${DELETE_ADDRESS}_PENDING`:
      case `${UPDATE_ADDRESS}_PENDING`:
        draft.error = false;
        draft.pending = true;
        draft.fulfilled = false;
        draft.rejected = false;
        draft.initiated = true;
        break;
      case `${ADDRESSES_LIST}_REJECTED`:
      case `${ADD_ADDRESS}_REJECTED`:
      case `${DELETE_ADDRESS}_REJECTED`:
      case `${UPDATE_ADDRESS}_REJECTED`:
        draft.data.isInitial = false;
        draft.error = action.error;
        draft.pending = false;
        draft.fulfilled = false;
        draft.rejected = true;
        draft.initiated = true;
        break;
      case `${ADDRESSES_LIST}_FULFILLED`:
        draft.data.addresses = action.addresses;
        draft.data.isInitial = true;
        draft.error = false;
        draft.pending = false;
        draft.fulfilled = true;
        draft.rejected = false;
        draft.initiated = true;
        break;
      case `${ADD_ADDRESS}_FULFILLED`: {
        const addresses: IAddressItem[] = [...draft.data.addresses, action.address];
        draft.data.addresses = addresses;
        draft.data.isInitial = true;
        draft.error = false;
        draft.pending = false;
        draft.fulfilled = true;
        draft.rejected = false;
        draft.initiated = true;
        break;
      }
      case `${DELETE_ADDRESS}_FULFILLED`: {
        const addresses: IAddressItem[] = draft.data.addresses.filter((address: IAddressItem) => address.id !== action.addressId);
        draft.data.addresses = addresses;
        draft.data.isInitial = true;
        draft.error = false;
        draft.pending = false;
        draft.fulfilled = true;
        draft.rejected = false;
        draft.initiated = true;
        break;
      }
      case `${UPDATE_ADDRESS}_FULFILLED`: {
        const addresses: IAddressItem[] = draft.data.addresses.filter((address: IAddressItem) => address.id === action.addressId ? action.data : address);
        draft.data.addresses = addresses;
        draft.data.isInitial = true;
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

export function isPageAddressesStateLoading(state: any, props: any): boolean {
  return (state.pageAddresses && state.pageAddresses.pending);
}
