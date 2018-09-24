import {
  PAGES_PRODUCT_REQUEST,
} from '../../constants/ActionTypes/Pages/Product';
import {
  IReduxState,
} from '../../../typings/app';
import {
  CURRENCY_DEFAULT,
} from '../../constants/Environment';

export interface ProductState extends IReduxState {
  data: {
    selectedProduct: any,
    currency: string,
  };
}

export const initialState: ProductState = {
  data: {
    selectedProduct: null,
    currency: CURRENCY_DEFAULT,
  },
};


export const pageProduct = function (state: ProductState = initialState, action: any): ProductState {
  switch (action.type) {
    case `${PAGES_PRODUCT_REQUEST}_REJECTED`:
      return {
        ...state,
        error: action.error,
        pending: false,
        fulfilled: false,
        rejected: true,
      };
    case `${PAGES_PRODUCT_REQUEST}_PENDING`:
      return {
        ...state,
        data: {
          ...state.data,
          selectedProduct: null,
        },
        error: null,
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    case `${PAGES_PRODUCT_REQUEST}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          selectedProduct: action.payload,
        },
        pending: false,
        fulfilled: true,
      };
    default:
      return state;
  }
};
