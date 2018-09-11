import {
  PAGES_CUSTOMER_REGISTER,
  PAGES_LOGIN_REQUEST,
} from '../../constants/ActionTypes/Pages/Login';
import {
  IReduxState,
} from '../../../typings/app';


export interface ILoginState extends IReduxState {
  data: {
    customer?: any,
    isAuth?: boolean,
  };
}

export const initialState: ILoginState = {
  data: {
    customer: null,
    isAuth: false,
  },
};


export const pagesLogin = function (state: ILoginState = initialState, action: any): ILoginState {
  switch (action.type) {
    case `${PAGES_CUSTOMER_REGISTER}_PENDING`:
      return {
        ...state,
        error: null,
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    case `${PAGES_CUSTOMER_REGISTER}_FULFILLED`:
      return {
        error: null,
        data: {
          customer: action.payload,
          isAuth: false,
        },
        pending: false,
        fulfilled: true,
        rejected: false,
      };
    case `${PAGES_CUSTOMER_REGISTER}_REJECTED`:
      return {
        ...state,
        error: action.error,
        pending: false,
        fulfilled: false,
        rejected: true,
      };
    case `${PAGES_LOGIN_REQUEST}_PENDING`:
      return {
        ...state,
        error: null,
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    case `${PAGES_LOGIN_REQUEST}_FULFILLED`:
      return {
        error: null,
        data: {
          customer: action.payload,
          isAuth: false,
        },
        pending: false,
        fulfilled: true,
        rejected: false,
      };
    case `${PAGES_LOGIN_REQUEST}_REJECTED`:
      return {
        ...state,
        error: action.error,
        pending: false,
        fulfilled: false,
        rejected: true,
      };
    default:
      return state;
  }
};
