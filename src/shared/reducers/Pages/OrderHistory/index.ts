import { ORDERS_COLLECTION_REQUEST } from '../../../constants/ActionTypes/Pages/Order';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '../../parts';
import { IOrderCollectionParsed, TOrderCollection } from '../../../interfaces/order';
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";
import {IOrderHistoryState, IPageOrderHistoryAction} from "src/shared/reducers/Pages/OrderHistory/types";
import {IApiErrorResponse} from "src/shared/services/types";


export const initialState: IOrderHistoryState = {
  data: {
    items: null,
  },
};

export const orderHistory = function(state: IOrderHistoryState = initialState,
                                     action: IPageOrderHistoryAction): IOrderHistoryState {
  switch (action.type) {
    case `${ORDERS_COLLECTION_REQUEST}_PENDING`:
      return handlePending(state);
    case `${ORDERS_COLLECTION_REQUEST}_FULFILLED`:
      return handleFulfilled(state, action.payloadFulfilled);
    case `${ORDERS_COLLECTION_REQUEST}_REJECTED`:
      return handleRejected(state, action.payloadRejected || {error: action.error});
    default:
      return state;
  }
};

// handlers
const handleFulfilled = (orderHistoryState: IOrderHistoryState, payload: IOrderCollectionParsed | null) => {
  return {
    ...orderHistoryState,
    data: {
      ...orderHistoryState.data,
      ...payload,
    },
    ...getReducerPartFulfilled(),
  };
};

const handleRejected = (orderHistoryState: IOrderHistoryState, payload: IApiErrorResponse) => {
  return {
    ...orderHistoryState,
    data: {
      ...orderHistoryState.data,
    },
    ...getReducerPartRejected(payload.error),
  };
};

const handlePending = (orderHistoryState: IOrderHistoryState) => {
  return {
    ...orderHistoryState,
    data: {
      ...orderHistoryState.data,
    },
    ...getReducerPartPending(),
  };
};

// selectors
export function getOrdersCollectionFromStore(state: IReduxStore, props: IReduxOwnProps): TOrderCollection {
  return isOrderHistoryItems(state, props) ? state.orderHistory.data.items : null;
}

export function isOrderHistoryItems(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(isStateExist(state, props) && state.orderHistory.data.items);
}

export function isOrderHistoryStateRejected(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(isStateExist(state, props) && state.orderHistory.rejected && state.orderHistory.rejected === true);
}

export function isOrderHistoryLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(isStateExist(state, props) && state.orderHistory.pending && state.orderHistory.pending === true);
}

export function isOrderHistoryFulfilled(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(isStateExist(state, props) && state.orderHistory.fulfilled && state.orderHistory.fulfilled === true);
}

export function isOrderHistoryInitiated(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(isStateExist(state, props) && state.orderHistory.initiated && state.orderHistory.initiated === true);
}

function isStateExist(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(state.orderHistory);
}
