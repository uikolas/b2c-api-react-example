import {
  INIT_APP_ACTION_TYPE,
} from '../../constants/ActionTypes/Common/Init';
import {
  IReduxState,
} from '../../../typings/app';
import {
  CURRENCY_DEFAULT,
  PRICE_MODE_DEFAULT,
  STORE_DEFAULT,
} from "../../constants/Environment/index";

export type TAppPriceMode = string | null;
export type TAppCurrency = string | null;
export type TAppStore = string | null;

export interface IInitData {
  ok: boolean;
  priceMode: TAppPriceMode;
  currency: TAppCurrency;
  store: TAppStore;
}

export interface IInitState extends IReduxState {
  data: IInitData | null;
}

export const initialState: IInitState = {
  data: {
    ok: false,
    priceMode: null,
    currency: null,
    store: null,
  },
};

export const init = function (state: IInitState = initialState, action: any): IInitState {
  switch (action.type) {
    case `${INIT_APP_ACTION_TYPE}_PENDING`:
      return {
        ...state,
        error: null,
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    case `${INIT_APP_ACTION_TYPE}_FULFILLED`:
      return {
      ...state,
      data: {
        ...state.data,
        ok: true,
        priceMode: PRICE_MODE_DEFAULT,
        currency: CURRENCY_DEFAULT,
        store: STORE_DEFAULT,
      },
      error: null,
      pending: true,
      fulfilled: false,
      rejected: false,
    };
    case `${INIT_APP_ACTION_TYPE}_REJECTED`:
      return {
        error: action.error,
        data: {...initialState.data},
        pending: false,
        fulfilled: false,
        rejected: true,
      };
    default:
      return state;
  }
};


// selectors

// TODO: Should be changed a logic
export function isAppInitiated(state: any, props: any): boolean {
  return (state.init.data.ok);
}

export function getAppCurrency(state: any, props: any): TAppCurrency {
  return isAppInitiated(state, props) ? state.init.data.currency : null;
}

export function getAppPriceMode(state: any, props: any): TAppPriceMode {
  return isAppInitiated(state, props) ?  state.init.data.priceMode : null;
}

export function getAppStore(state: any, props: any): TAppStore {
  return isAppInitiated(state, props) ?  state.init.data.store : null;
}
