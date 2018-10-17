import {
  CUSTOMER_DATA_REQUEST,
  CUSTOMER_DATA_UPDATE,
} from '../../constants/ActionTypes/Pages/CustomerProfile';
import { CustomerProfileService } from '../../services/Pages/CustomerProfile';
import {ICustomerDataParsed, ICustomerProfile} from "../../interfaces/customer";

// Retrieve customer data.
export const getCustomerProfilePendingStateAction = () => ({
  type: CUSTOMER_DATA_REQUEST + '_PENDING',
});

export const getCustomerProfileRejectedStateAction = (message: string) => ({
  type: CUSTOMER_DATA_REQUEST + '_REJECTED',
  payload: {error: message},
});

export const getCustomerProfileFulfilledStateAction = (payload: ICustomerDataParsed) => ({
  type: CUSTOMER_DATA_REQUEST + '_FULFILLED',
  payload,
});

export const getCustomerProfileAction = function (customerReference: string) {
  return (dispatch: Function, getState: Function) => {
    CustomerProfileService.getProfileData(dispatch, customerReference);
  };
};

// Update customer data
export const updateCustomerProfilePendingStateAction = () => ({
  type: CUSTOMER_DATA_UPDATE + '_PENDING',
});

export const updateCustomerProfileRejectedStateAction = (message: string) => ({
  type: CUSTOMER_DATA_UPDATE + '_REJECTED',
  payload: {error: message},
});

export const updateCustomerProfileFulfilledStateAction = (payload: ICustomerDataParsed) => ({
  type: CUSTOMER_DATA_UPDATE + '_FULFILLED',
  payload,
});

export const updateCustomerProfileAction = function (customerReference: string, payload: ICustomerProfile) {
  return (dispatch: Function, getState: Function) => {
    CustomerProfileService.updateProfileData(dispatch, customerReference, payload);
  };
};
