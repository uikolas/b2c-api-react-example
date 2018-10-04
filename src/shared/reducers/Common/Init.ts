import {
  INIT_APP_ACTION_TYPE,
} from '../../constants/ActionTypes/Common/Init';
import {
  IReduxState,
} from '../../../typings/app';

import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";
import {ICartCreatePayload} from "../../services/Common/Cart";

export type TAppPriceMode = string | null;
export type TAppCurrency = string | null;
export type TAppStore = string | null;
export type TAppLocale = string | null;

export interface IInitData {
  ok?: boolean;
  priceMode: TAppPriceMode;
  currency: TAppCurrency;
  store: TAppStore;
  locale: TAppLocale;
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
    locale: null,
  },
};

export const init = function (state: IInitState = initialState, action: any): IInitState {
  switch (action.type) {
    case `${INIT_APP_ACTION_TYPE}_PENDING`:
      return handleInitAppPending(state, action.payload);
    case `${INIT_APP_ACTION_TYPE}_FULFILLED`:
      return handleInitAppFulfilled(state, action.payload);
    case `${INIT_APP_ACTION_TYPE}_REJECTED`:
      return handleInitAppRejected(state, action.payload);
    default:
      return state;
  }
};

// handlers
const handleInitAppFulfilled = (appState: IInitState, payload: any) => {
  return {
    ...appState,
    data: {
      ...appState.data,
      ok: true,
      priceMode: payload.priceMode,
      currency: payload.currency,
      store: payload.store,
      locale: payload.locale,
    },
    ...getReducerPartFulfilled(),
  };
};

const handleInitAppRejected = (appState: IInitState, payload: any) => {
  return {
    ...appState,
    data: {
      ...appState.data,
      ok: false,
    },
    ...getReducerPartRejected(payload.error),
  };
};
const handleInitAppPending = (appState: IInitState, payload: any) => {
  return {
    ...appState,
    data: {
      ...appState.data,
    },
    ...getReducerPartPending(),
  };
};

// selectors

export function isAppInitiated(state: any, props: any): boolean {
  return (state.init.data.ok);
}

export function isAppLoading(state: any, props: any): boolean {
  return (state.init && state.init.pending && state.init.pending === true);
}

export function getAppCurrency(state: any, props: any): TAppCurrency {
  return isAppInitiated(state, props) ? state.init.data.currency : null;
}

export function getAppLocale(state: any, props: any): TAppStore {
  return isAppInitiated(state, props) ?  state.init.data.locale : null;
}

export function getAppPriceMode(state: any, props: any): TAppPriceMode {
  return isAppInitiated(state, props) ?  state.init.data.priceMode : null;
}

export function getAppStore(state: any, props: any): TAppStore {
  return isAppInitiated(state, props) ?  state.init.data.store : null;
}

export function getPayloadForCreateCart(state: any, props: any): ICartCreatePayload {
  return (
    isAppInitiated(state, props)
      ? {
          priceMode: state.init.data.priceMode,
          currency: state.init.data.currency,
          store: state.init.data.store,
        }
      : null
  );
}
