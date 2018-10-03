import {
  PAGES_CUSTOMER_REGISTER,
  PAGES_LOGIN_REQUEST,
  PAGES_CUSTOMER_LOGOUT,
  REFRESH_TOKEN_REQUEST,
} from '../../constants/ActionTypes/Pages/Login';
import {
  IReduxState,
} from '../../../typings/app';
import {TAccessToken} from "../../interfaces/login/index";
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";

export interface ILoginState extends IReduxState {
  data: {
    customer?: any,
    isAuth?: boolean,
    tokenType?: string,
    expiresIn?: string,
    accessToken?: TAccessToken,
    refreshToken?: string,
  };
}

export const initialState: ILoginState = {
  data: {
    customer: null,
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
          customer: action.payload,
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
      return {
        ...state,
        data: {
          ...state.data,
          isAuth: true,
          ...action.payload,
        },
        ...getReducerPartFulfilled(),
      };
    case PAGES_CUSTOMER_LOGOUT:
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
