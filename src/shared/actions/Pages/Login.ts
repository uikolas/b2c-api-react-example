import {
  PAGES_LOGIN_REQUEST,
  PAGES_CUSTOMER_REGISTER,
  PAGES_CUSTOMER_LOGOUT,
} from '../../constants/ActionTypes/Pages/Login';
import {PagesLoginService} from '../../services/Pages/Login';


export const loginPendingState = {
  type: PAGES_LOGIN_REQUEST + '_PENDING',
};

export const registerPendingState = {
  type: PAGES_LOGIN_REQUEST + '_PENDING',
};

export const sendLoginAction = function (payload: any) {
  return (dispatch: Function, getState: Function) => {
    PagesLoginService.loginRequest(PAGES_LOGIN_REQUEST, dispatch, payload);
    dispatch(loginPendingState);
  };
};

export const customerRegisterAction = function (payload: any) {
  return (dispatch: Function, getState: Function) => {
    PagesLoginService.register(PAGES_CUSTOMER_REGISTER, dispatch, payload);
    dispatch(registerPendingState);
  };
};

export const logout = function () {
  return { type: PAGES_CUSTOMER_LOGOUT };
};
