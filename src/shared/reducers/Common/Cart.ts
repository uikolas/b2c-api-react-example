import {
  CART_ADD_ITEM,
  CART_CREATE,
  CART_DELETE_ITEM,
  CART_UPDATE_ITEM,
  GET_CARTS,
} from 'src/shared/constants/ActionTypes/Common/Cart';
import { IReduxState } from 'src/typings/app';
import {
  TProductQuantity,
  TProductSKU,
} from 'src/shared/interfaces/product';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '../parts';
import {
  ICartDataResponse,
  ICartItemCalculation,
  ICartItem,
  ICartTotals,
  TCartId,
} from 'src/shared/interfaces/cart';
import {PAGES_CUSTOMER_LOGOUT} from "src/shared/constants/ActionTypes/Pages/Login";

export interface ICartData extends ICartDataResponse {
  cartCreated: boolean;
}

export interface ICartState extends IReduxState {
  data: ICartData;
}

export const initialState: ICartState = {
  data: {
    cartCreated: false,
    currency: null,
    items: [],
    id: null,
    priceMode: null,
    store: null,
    discounts: null,
    totals: null,
  },
};

export const cart = function(state: ICartState = initialState, action: any): ICartState {
  switch (action.type) {
    case `${CART_ADD_ITEM}_PENDING`:
    case `${CART_UPDATE_ITEM}_PENDING`:
    case `${CART_CREATE}_PENDING`:
    case `${GET_CARTS}_PENDING`:
      return handlePending(state, action.payload);
    case `${GET_CARTS}_PENDING`:
      return state;
    case `${CART_ADD_ITEM}_FULFILLED`:
    case `${CART_UPDATE_ITEM}_FULFILLED`:
      return handleFulfilled(state, action.payload);
    case `${CART_ADD_ITEM}_REJECTED`:
    case `${CART_DELETE_ITEM}_REJECTED`:
    case `${CART_UPDATE_ITEM}_REJECTED`:
    case `${GET_CARTS}_REJECTED`:
      return handleRejected(state, action.payload);
    case `${CART_CREATE}_FULFILLED`:
    case `${GET_CARTS}_FULFILLED`:
      return handleCartFulfilled(state, action.payload);
    case `${CART_CREATE}_REJECTED`:
      return handleCartCreateRejected(state, action.payload);
    case `${CART_DELETE_ITEM}_PENDING`:
      return {
        ...state,
        ...getReducerPartPending(),
      };
    case `${CART_DELETE_ITEM}_REJECTED`:
      return {
        ...state,
        ...getReducerPartRejected(action.error),
      };
    case `${CART_DELETE_ITEM}_FULFILLED`:
      const itemsAfterDelete: Array<ICartItem> = state.data.items.filter((item) => item.sku !== action.itemId);
      return {
        ...state,
        data: {...state.data, items: itemsAfterDelete},
        ...getReducerPartFulfilled(),
      };
    case PAGES_CUSTOMER_LOGOUT:
      return {
        ...state,
        data: initialState.data,
      };
    default:
      return state;
  }
};

// handlers
const handleFulfilled = (cartState: ICartState, payload: ICartDataResponse | null) => {
  return {
    ...cartState,
    data: {
      ...cartState.data,
      ...payload,
    },
    ...getReducerPartFulfilled(),
  };
};

const handleRejected = (cartState: ICartState, payload: any) => {
  return {
    ...cartState,
    data: {
      ...cartState.data,
    },
    ...getReducerPartRejected(payload.error),
  };
};

const handlePending = (cartState: ICartState, payload: any) => {
  return {
    ...cartState,
    data: {
      ...cartState.data,
    },
    ...getReducerPartPending(),
  };
};

const handleCartFulfilled = (cartState: ICartState, payload: ICartDataResponse) => {
  return {
    ...cartState,
    data: {
      ...cartState.data,
      cartCreated: true,
      ...payload,
    },
    ...getReducerPartFulfilled(),
  };
};

const handleCartCreateRejected = (cartState: ICartState, payload: any) => {
  return {
    ...cartState,
    data: {
      ...cartState.data,
      cartCreated: false,
    },
    ...getReducerPartRejected(payload.error),
  };
};

// selectors
// Number of products(including quantity per each product) in the cart
export function getTotalProductsQuantity(state: any, props: any): TProductQuantity {
  return state.cart.data.items.reduce((acc: number, item: ICartItem) => {
    return acc + item.quantity;
  }, 0);
}

// Number of items in the cart
export function getTotalItemsQuantity(state: any, props: any): TProductQuantity {
  return state.cart.data.items.length;
}

export function isCartCreated(state: any, props: any): boolean {
  return (state.cart.data.cartCreated);
}

export function isCartLoading(state: any, props: any): boolean {
  return (state.cart && state.cart.pending && state.cart.pending === true);
}

export function isCartStateFulfilled(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.cart.fulfilled && state.cart.fulfilled === true);
}

export function isCartStateRejected(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.cart.rejected && state.cart.rejected === true);
}

export function getCartId(state: any, props: any): TCartId {
  return (isCartCreated(state, props) && state.cart.data.id) ? state.cart.data.id : null;
}

export function getCartTotals(state: any, props: any): ICartTotals | null {
  return isStateExist(state, props) ? state.cart.data.totals: null;
}

export function getProductsFromCart(state: any, props: any): ICartItem[] {
  return isStateExist(state, props) ? state.cart.data.items: [];
}

// selectors INNER
function isStateExist(state: any, props: any): boolean {
  return Boolean(state.cart);
}

function getProductFromCart(cartState: ICartState, sku: TProductSKU): ICartItem {
  return (cartState.data.items.filter((item: ICartItem): any => item.sku === sku))[0];
}

function isProductExistsInCart(cartState: ICartState, sku: TProductSKU): boolean {
  return Boolean(cartState.data.items.filter((item: ICartItem): any => item.sku === sku).length);
}

function getCartItemsWithoutSelected(cartState: ICartState, sku: TProductSKU): Array<ICartItem> {
  return cartState.data.items.filter((item: ICartItem): any => item.sku !== sku);
}

