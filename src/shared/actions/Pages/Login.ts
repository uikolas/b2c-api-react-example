import {
  PAGES_LOGIN_REQUEST,
  PAGES_CUSTOMER_REGISTER,
  PAGES_CUSTOMER_LOGOUT,
  REFRESH_TOKEN_REQUEST,
} from '../../constants/ActionTypes/Pages/Login';
import {PagesLoginService} from '../../services/Pages/Login';
import {saveLoginDataToLocalStorageAction} from "./CustomerProfile";

export const loginPendingState = () => ({
  type: PAGES_LOGIN_REQUEST + '_PENDING',
});

export const registerPendingState = () => ({
  type: PAGES_CUSTOMER_REGISTER + '_PENDING',
});

export const sendLoginAction = function (payload: any) {
  return (dispatch: Function, getState: Function) => {
    dispatch(loginPendingState);
    PagesLoginService.loginRequest(PAGES_LOGIN_REQUEST, dispatch, payload);
  };
};

export const customerRegisterAction = function (payload: any) {
  return (dispatch: Function, getState: Function) => {
    dispatch(registerPendingState);
    PagesLoginService.register(PAGES_CUSTOMER_REGISTER, dispatch, payload);
  };
};

export const logout = function () {
  return { type: PAGES_CUSTOMER_LOGOUT };
};
