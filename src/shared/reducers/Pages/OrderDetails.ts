import {
  ORDER_DETAILS_REQUEST,
} from '../../constants/ActionTypes/Pages/Order';
import {
  IReduxState,
} from '../../../typings/app';
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";
import {IOrderDetailsParsed} from "../../interfaces/order/index";

export interface IOrderDetailsState extends IReduxState {
  data: IOrderDetailsParsed;
}

export const initialState: IOrderDetailsState = {
  data: {
    id: null,
    dateCreated: null,
    currency: null,
    totals: null,
    expenses: null,
    items: null,
  },
};

export const orderDetails = function (state: IOrderDetailsState = initialState, action: any): IOrderDetailsState {
  switch (action.type) {
    case `${ORDER_DETAILS_REQUEST}_PENDING`:
      return handlePending(state, action.payload);
    case `${ORDER_DETAILS_REQUEST}_FULFILLED`:
      return handleFulfilled(state, action.payload);
    case `${ORDER_DETAILS_REQUEST}_REJECTED`:
      return handleRejected(state, action.payload);
    default:
      return state;
  }
};

// handlers
const handleFulfilled = (orderDetailsState: IOrderDetailsState, payload: IOrderDetailsParsed | null) => {
  return {
    ...orderDetailsState,
    data: {
      ...orderDetailsState.data,
      ...payload,
    },
    ...getReducerPartFulfilled(),
  };
};

const handleRejected = (orderDetailsState: IOrderDetailsState, payload: any) => {
  return {
    ...orderDetailsState,
    data: {
      ...orderDetailsState.data,
    },
    ...getReducerPartRejected(payload.error),
  };
};

const handlePending = (orderDetailsState: IOrderDetailsState, payload: any) => {
  return {
    ...orderDetailsState,
    data: {
      ...orderDetailsState.data,
    },
    ...getReducerPartPending(),
  };
};

// selectors
/*export function getOrdersCollectionFromStore(state: any, props: any): TOrderCollection {
  return isOrderHistoryItems(state, props) ? state.orderDetails.data.items : null;
}*/

export function isOrderDetailsPresent(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.orderDetails.data.orderId);
}

export function isOrderDetailsStateRejected(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.orderDetails.rejected && state.orderDetails.rejected === true);
}

export function isOrderDetailsLoading(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.orderDetails.pending && state.orderDetails.pending === true);
}

export function isOrderDetailsFulfilled(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.orderDetails.fulfilled && state.orderDetails.fulfilled === true);
}

export function isOrderDetailsInitiated(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.orderDetails.initiated && state.orderDetails.initiated === true);
}

function isStateExist(state: any, props: any): boolean {
  return Boolean(state.orderDetails);
}
