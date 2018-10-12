import produce from 'immer';
import {
  PAGES_PRODUCT_REQUEST,
} from '../../constants/ActionTypes/Pages/Product';
import {
  IReduxState,
} from '../../../typings/app';
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";
import {IProductDataParsed} from "../../interfaces/product/index";

export interface ProductState extends IReduxState {
  data: {
    selectedProduct: IProductDataParsed | null,
  };
}

export const initialState: ProductState = {
  data: {
    selectedProduct: null,
  },
};

export const pageProduct = function (state: ProductState = initialState, action: any): ProductState {
  console.info(action);
  const res = produce<ProductState>(state, draft => {
    switch (action.type) {
      case `${PAGES_PRODUCT_REQUEST}_REJECTED`:
        draft.error = action.error;
        draft.pending = false;
        draft.fulfilled = false;
        draft.rejected = true;
        draft.initiated = true;
        break;
      case `${PAGES_PRODUCT_REQUEST}_PENDING`:
        draft.data = {selectedProduct: null};
        draft.error = false;
        draft.pending = true;
        draft.fulfilled = false;
        draft.rejected = false;
        draft.initiated = true;
        break;
      case `${PAGES_PRODUCT_REQUEST}_FULFILLED`:
        draft.data = {selectedProduct: action.payload};
        draft.error = false;
        draft.pending = false;
        draft.fulfilled = true;
        draft.rejected = false;
        draft.initiated = true;
        break;
      default:
        break;
    }
  });
  console.info(res);

  return res;
};
export function isPageProductStateInitiated(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.pageProduct.initiated && state.pageProduct.initiated === true);
}

export function isProductDetailsPresent(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.pageProduct.data.selectedProduct);
}

export function isPageProductStateLoading(state: any, props: any): boolean {
  return (isStateExist(state, props) && state.pageProduct.pending && state.pageProduct.pending === true);
}

export function isPageProductStateRejected(state: any, props: any): boolean {
  return (isStateExist(state, props) && state.pageProduct.rejected && state.pageProduct.rejected === true);
}

export function isPageProductStateFulfilled(state: any, props: any): boolean {
  return (isStateExist(state, props) && state.pageProduct.fulfilled && state.pageProduct.fulfilled === true);
}

export function getProduct(state: any, props: any): IProductDataParsed | null {
  if (isPageProductStateRejected(state, props)) {
    return null;
  }
  return (isStateExist(state, props) && state.pageProduct.data.selectedProduct) ? state.pageProduct.data.selectedProduct : null;
}

function isStateExist(state: any, props: any): boolean {
  return Boolean(state.pageProduct);
}
