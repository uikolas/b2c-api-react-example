import {
  ADD_ADDRESS,
  ADDRESSES_LIST,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
} from '../../constants/ActionTypes/Pages/Addresses';
import {IAddressItem} from '../../interfaces/addresses';
import {AddressesService} from '../../services/Pages/Addresses';


export const getAllListPendingState = {
  type: ADDRESSES_LIST + '_PENDING',
};

export const addAddressPendingState = {
  type: ADD_ADDRESS + '_PENDING',
};

export const updateAddressPendingState = {
  type: UPDATE_ADDRESS + '_PENDING',
};

export const deleteAddressPendingState = {
  type: DELETE_ADDRESS + '_PENDING',
};

export const getAddressesAction = function (customerId: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(getAllListPendingState);
    AddressesService.getCustomerAddresses(ADDRESSES_LIST, dispatch, customerId);
  };
};

export const addAddressAction = function (payload: IAddressItem, customerId: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(addAddressPendingState);
    AddressesService.addAddress(ADD_ADDRESS, dispatch, payload, customerId);
  };
};
