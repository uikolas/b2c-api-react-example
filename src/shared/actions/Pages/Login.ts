import {
  PAGES_LOGIN_REQUEST,
  PAGES_CUSTOMER_REGISTER,
  PAGES_CUSTOMER_LOGOUT,
  REFRESH_TOKEN_REQUEST,
} from '../../constants/ActionTypes/Pages/Login';
import {PagesLoginService} from '../../services/Pages/Login';
import {ICustomerLoginData, ICustomerLoginDataParsed} from "../../interfaces/customer/index";

export const registerPendingState = () => ({
  type: PAGES_CUSTOMER_REGISTER + '_PENDING',
});

export const customerRegisterAction = function (payload: any) {
  return (dispatch: Function, getState: Function) => {
    dispatch(registerPendingState);
    PagesLoginService.register(PAGES_CUSTOMER_REGISTER, dispatch, payload);
  };
};

export const logout = function () {
  return { type: PAGES_CUSTOMER_LOGOUT };
};

// Login Customer Entity
export const loginCustomerPendingStateAction = () => ({
  type: PAGES_LOGIN_REQUEST + '_PENDING',
});

export const loginCustomerRejectedStateAction = (message: string) => ({
  type: PAGES_LOGIN_REQUEST + '_REJECTED',
  payload: {error: message},
});

export const loginCustomerFulfilledStateAction = (payload: ICustomerLoginDataParsed) => ({
  type: PAGES_LOGIN_REQUEST + '_FULFILLED',
  payload,
});

export const loginCustomerAction = function (payload: ICustomerLoginData) {
  return (dispatch: Function, getState: Function) => {
    PagesLoginService.loginRequest(dispatch, payload);
  };
};
