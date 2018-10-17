import {
  PAGES_CUSTOMER_REGISTER,
  PAGES_LOGIN_REQUEST,
  PAGES_CUSTOMER_LOGOUT,
  REFRESH_TOKEN_REQUEST,
} from '../../constants/ActionTypes/Pages/Login';
import {
  SET_AUTH_FROM_STORAGE,
} from '../../constants/ActionTypes/Common/Init';
import {
  IReduxState,
} from '../../../typings/app';
import {TAccessToken} from "../../interfaces/login/index";
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";
import {TCustomerReference} from "../../interfaces/customer/index";

export interface ILoginState extends IReduxState {
  data: {
    customerRef?: string,
    isAuth?: boolean,
    tokenType?: string,
    expiresIn?: string,
    accessToken?: TAccessToken,
    refreshToken?: string,
  };
}

export const initialState: ILoginState = {
  data: {
    customerRef: '',
    isAuth: false,
    tokenType: '',
    expiresIn: '',
    accessToken: '',
    refreshToken: '',
  },
};

export const pagesLogin = function (state: ILoginState = initialState, action: any): ILoginState {
  switch (action.type) {
    case `${PAGES_CUSTOMER_REGISTER}_PENDING`:
    case `${REFRESH_TOKEN_REQUEST}_PENDING`:
      return {
        ...state,
        ...getReducerPartPending(),
      };
    case `${PAGES_CUSTOMER_REGISTER}_FULFILLED`:
      return {
        data: {
          isAuth: false,
        },
        ...getReducerPartFulfilled(),
      };
    case `${PAGES_CUSTOMER_REGISTER}_REJECTED`:
    case `${PAGES_LOGIN_REQUEST}_REJECTED`:
    case `${REFRESH_TOKEN_REQUEST}_REJECTED`:
      return {
        ...state,
        ...getReducerPartRejected(action.error),
      };
    case `${PAGES_LOGIN_REQUEST}_PENDING`:
      return {
        ...state,
        ...getReducerPartPending(),
      };
    case `${PAGES_LOGIN_REQUEST}_FULFILLED`:
    case `${REFRESH_TOKEN_REQUEST}_FULFILLED`:
      localStorage.setItem('tokenExpire', (Math.floor(Date.now() / 1000) + action.payload.expiresIn - 120).toString(10));
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('customerRef', action.customerRef);
      return {
        ...state,
        data: {
          ...state.data,
          isAuth: true,
          customerRef: action.customerRef,
          ...action.payload,
        },
        ...getReducerPartFulfilled(),
      };
    case `${SET_AUTH_FROM_STORAGE}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          isAuth: true,
          ...action.payload,
        },
      };
    case PAGES_CUSTOMER_LOGOUT:
      localStorage.clear();
      return {
        ...state,
        data: initialState.data
      };
    default:
      return state;
  }
};

// selectors

export function isUserAuthenticated(state: any, props: any): boolean {
  return (state.pagesLogin && state.pagesLogin.data && state.pagesLogin.data.isAuth === true);
}

export function getAccessToken(state: any, props: any): TAccessToken | null {
  return (
    isUserAuthenticated(state, props) && state.pagesLogin.data.accessToken
    ? state.pagesLogin.data.accessToken
    : null
  );
}

export function getLoginCustomer(state: any, props: any): any | null {
  return (
    isUserAuthenticated(state, props) && state.pagesLogin.data && state.pagesLogin.data.customer
      ? state.pagesLogin.data.customer
      : null
  );
}

export function getCustomerReference(state: any, props: any): TCustomerReference | null {
  return (
    isUserAuthenticated(state, props) && state.pagesLogin.data.customerRef
      ? state.pagesLogin.data.customerRef
      : null
  );
}

export function isPageLoginStateLoading(state: any, props: any): boolean {
  return (state.pagesLogin && state.pagesLogin.pending && state.pagesLogin.pending === true);
}
