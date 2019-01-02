import { CATEGORIES_TREE_REQUEST, INIT_APP_ACTION_TYPE } from '../../../constants/ActionTypes/Common/Init';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '../../parts';
import { ICartCreatePayload } from '../../../services/Common/Cart/types';
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";
import {IApiErrorResponse} from "src/shared/services/types";
import {TAppTimeZone} from "src/shared/interfaces/locale/index";
import {TAppCurrency} from "src/shared/interfaces/currency/index";
import {TAppPriceMode} from "src/shared/interfaces/product/index";
import {TAppStore} from "src/shared/interfaces/store/index";
import {ICategory} from "src/shared/interfaces/category/index";
import {ICountry} from "src/shared/interfaces/country/index";
import {IInitData} from "src/shared/interfaces/init/index";
import {IInitState, TInitAction} from "src/shared/reducers/Common/Init/types";


export const initialState: IInitState = {
  data: {
    ok: false,
    priceMode: null,
    currency: null,
    store: null,
    locale: null,
    timeZone: null,
    categoriesTree: [],
    countries: [],
    anonymId: 'anonym',
  },
};

export const init = function(state: IInitState = initialState,
                             action: TInitAction): IInitState {
  switch (action.type) {
    case `${INIT_APP_ACTION_TYPE}_PENDING`:
    case `${CATEGORIES_TREE_REQUEST}_PENDING`:
      return handleInitAppPending(state);
    case `${INIT_APP_ACTION_TYPE}_FULFILLED`:
      return handleInitAppFulfilled(state, action.payloadInitFulfilled);
    case `${INIT_APP_ACTION_TYPE}_REJECTED`:
    case `${CATEGORIES_TREE_REQUEST}_REJECTED`:
      return handleInitAppRejected(state, action.payloadRejected);
    case `${CATEGORIES_TREE_REQUEST}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          ok: true,
          categoriesTree: action.payloadCategoriesTreeFulfilled.categories,
        },
        ...getReducerPartFulfilled(),
      };
    default:
      return state;
  }
};

// handlers
const handleInitAppFulfilled = (appState: IInitState, payload: IInitData) => {
  return {
    ...appState,
    data: {
      ...appState.data,
      ok: true,
      priceMode: payload.priceMode,
      currency: payload.currency,
      store: payload.store,
      locale: payload.locale,
      timeZone: payload.timeZone,
      countries: payload.countries,
      anonymId: payload.anonymId,
    },
    ...getReducerPartFulfilled(),
  };
};

const handleInitAppRejected = (appState: IInitState, payload: IApiErrorResponse) => {
  return {
    ...appState,
    data: {
      ...appState.data,
      ok: false,
    },
    ...getReducerPartRejected(payload.error),
  };
};
const handleInitAppPending = (appState: IInitState) => {
  return {
    ...appState,
    data: {
      ...appState.data,
    },
    ...getReducerPartPending(),
  };
};

// selectors

export function isAppInitiated(state: IReduxStore, props: IReduxOwnProps): boolean {
  return (state.init.data.ok);
}

export function isAppLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
  return (state.init && state.init.pending && state.init.pending === true);
}

export function isAppStateFulfilled(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(state.init && state.init.fulfilled && state.init.fulfilled === true);
}

export function getAppCurrency(state: IReduxStore, props: IReduxOwnProps): TAppCurrency {
  return isAppInitiated(state, props) ? state.init.data.currency : null;
}

export function getAppLocale(state: IReduxStore, props: IReduxOwnProps): TAppStore {
  return isAppInitiated(state, props) ? state.init.data.locale : null;
}

export function getAppTimeZone(state: IReduxStore, props: IReduxOwnProps): TAppTimeZone {
  return isAppInitiated(state, props) ? state.init.data.timeZone : null;
}

export function getAppPriceMode(state: IReduxStore, props: IReduxOwnProps): TAppPriceMode {
  return isAppInitiated(state, props) ? state.init.data.priceMode : null;
}

export function getAppStore(state: IReduxStore, props: IReduxOwnProps): TAppStore {
  return isAppInitiated(state, props) ? state.init.data.store : null;
}

export function getCounties(state: IReduxStore, props: IReduxOwnProps): ICountry[] {
  return isAppInitiated(state, props) ? state.init.data.countries : null;
}

export function getPayloadForCreateCart(state: IReduxStore, props: IReduxOwnProps): ICartCreatePayload {
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

export function getCategoriesTree(state: IReduxStore, props: IReduxOwnProps): ICategory[] {
  return state.init.data.categoriesTree;
}

export function getAnonymId(state: IReduxStore, props: IReduxOwnProps): string {
  return state.init.data.anonymId;
}
