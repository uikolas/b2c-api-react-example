import {
  CUSTOMER_DATA_REQUEST,
} from '../../constants/ActionTypes/Pages/CustomerProfile';
import { CustomerProfileService } from '../../services/Pages/CustomerProfile';
import {ICustomerDataParsed} from "../../interfaces/customer";

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
