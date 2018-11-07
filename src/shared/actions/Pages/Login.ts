import {
  PAGES_LOGIN_REQUEST,
  PAGES_CUSTOMER_REGISTER,
  PAGES_CUSTOMER_LOGOUT,
  REFRESH_TOKEN_REQUEST,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from 'src/shared/constants/ActionTypes/Pages/Login';
import {PagesLoginService} from 'src/shared/services/Pages/Login';
import {ICustomerLoginData, ICustomerLoginDataParsed} from "src/shared/interfaces/customer/index";

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

export const forgotPasswordAction = function(email: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch({type: FORGOT_PASSWORD + '_PENDING'});
    PagesLoginService.forgotPassword(FORGOT_PASSWORD, dispatch, email);
  };
};

export const resetPasswordAction = function(payload: any) {
  return (dispatch: Function, getState: Function) => {
    dispatch({type: RESET_PASSWORD + '_PENDING'});
    PagesLoginService.resetPassword(RESET_PASSWORD, dispatch, payload);
  };
};
