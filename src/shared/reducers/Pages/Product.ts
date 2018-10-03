import {
  PAGES_PRODUCT_REQUEST,
} from '../../constants/ActionTypes/Pages/Product';
import {
  IReduxState,
} from '../../../typings/app';
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";

export interface ProductState extends IReduxState {
  data: {
    selectedProduct: any,
  };
}

export const initialState: ProductState = {
  data: {
    selectedProduct: null,
  },
};


export const pageProduct = function (state: ProductState = initialState, action: any): ProductState {
  switch (action.type) {
    case `${PAGES_PRODUCT_REQUEST}_REJECTED`:
      return {
        ...state,
        ...getReducerPartRejected(action.error),
      };
    case `${PAGES_PRODUCT_REQUEST}_PENDING`:
      return {
        ...state,
        data: {
          ...state.data,
          selectedProduct: null,
        },
        ...getReducerPartPending(),
      };
    case `${PAGES_PRODUCT_REQUEST}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          selectedProduct: action.payload,
        },
        ...getReducerPartFulfilled(),
      };
    default:
      return state;
  }
};
