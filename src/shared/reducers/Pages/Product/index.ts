import { PAGES_PRODUCT_REQUEST, PRODUCT_AVAILABILITY_REQUEST } from '../../../constants/ActionTypes/Pages/Product';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '../../parts';
import {IConcreteProductAvailability, IProductDataParsed} from '../../../interfaces/product';
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";
import {IPageProductAction, IProductState} from "src/shared/reducers/Pages/Product/types";
import {IApiErrorResponse} from "src/shared/services/types";


export const initialState: IProductState = {
  data: {
    selectedProduct: null,
  },
};

/*export const pageProduct = function (state: IProductState = initialState, action: IPageProductAction): IProductState {
  console.info(action);
  const res = produce<IProductState>(state, draft => {
>>>>>>> main-dev
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
};*/

export const pageProduct = function(state: IProductState = initialState, action: IPageProductAction): IProductState {
  switch (action.type) {
    case `${PAGES_PRODUCT_REQUEST}_REJECTED`:
    case `${PRODUCT_AVAILABILITY_REQUEST}_REJECTED`:
      return handleRejected(state, action.payloadRejected || {error: action.error});
    case `${PAGES_PRODUCT_REQUEST}_PENDING`:
    case `${PRODUCT_AVAILABILITY_REQUEST}_PENDING`:
      return handlePending(state);
    case `${PAGES_PRODUCT_REQUEST}_FULFILLED`:
      return handleFulfilled(state, action.payloadFulfilled);
    case `${PRODUCT_AVAILABILITY_REQUEST}_FULFILLED`:
      return handleAvailabilityFulfilled(state, action.payloadAvailability);
    default:
      return state;
  }
};

// handlers
const handleFulfilled = (productState: IProductState, payload: IProductDataParsed | null) => {
  return {
    ...productState,
    data: {
      ...productState.data,
      selectedProduct: {...payload},
    },
    ...getReducerPartFulfilled(),
  };
};

const handleAvailabilityFulfilled = (productState: IProductState, payload: IConcreteProductAvailability | null) => {
  if (!payload) {
    return {...productState};
  }
  return {
    ...productState,
    data: {
      ...productState.data,
      selectedProduct: {
        ...productState.data.selectedProduct,
        concreteProducts: {
          ...productState.data.selectedProduct.concreteProducts,
          [payload.sku]: {
            ...productState.data.selectedProduct.concreteProducts[payload.sku],
            availability: payload.availability,
            quantity: payload.quantity,
          }
        }
      },
    },
    ...getReducerPartFulfilled(),
  };
};

const handleRejected = (productState: IProductState, payload: IApiErrorResponse) => {
  return {
    ...productState,
    data: {
      ...productState.data,
    },
    ...getReducerPartRejected(payload.error),
  };
};

const handlePending = (productState: IProductState) => {
  return {
    ...productState,
    data: {
      ...productState.data,
    },
    ...getReducerPartPending(),
  };
};

// selectors
export function isPageProductStateInitiated(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(isStateExist(state, props) && state.pageProduct.initiated && state.pageProduct.initiated === true);
}

export function isProductDetailsPresent(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(isStateExist(state, props) && state.pageProduct.data.selectedProduct);
}

export function isPageProductStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
  return (isStateExist(state, props) && state.pageProduct.pending && state.pageProduct.pending === true);
}

export function isPageProductStateRejected(state: IReduxStore, props: IReduxOwnProps): boolean {
  return (isStateExist(state, props) && state.pageProduct.rejected && state.pageProduct.rejected === true);
}

export function isPageProductStateFulfilled(state: IReduxStore, props: IReduxOwnProps): boolean {
  return (isStateExist(state, props) && state.pageProduct.fulfilled && state.pageProduct.fulfilled === true);
}

export function getProduct(state: IReduxStore, props: IReduxOwnProps): IProductDataParsed | null {
  if (isPageProductStateRejected(state, props)) {
    return null;
  }
  return (isStateExist(state, props) && state.pageProduct.data.selectedProduct)
    ? state.pageProduct.data.selectedProduct
    : null;
}

function isStateExist(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(state.pageProduct);
}
