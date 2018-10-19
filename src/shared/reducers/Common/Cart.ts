import {
  CART_ADD_ITEM,
  CART_CREATE,
  CART_DELETE_ITEM,
  CART_UPDATE_ITEM,
} from '../../constants/ActionTypes/Common/Cart';
import { IReduxState } from '../../../typings/app';
import {
  TProductAvailability,
  TProductImageSRC,
  TProductName,
  TProductPrice,
  TProductQuantity,
  TProductSKU,
} from '../../interfaces/product';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '../parts';
import { ICartDataResponse, ICartItemCalculation, TCartId } from '../../interfaces/cart';

export interface ICartItem {
  sku: TProductSKU | null;
  name: TProductName | null;
  image: TProductImageSRC | null;
  quantity: TProductQuantity | null;
  amount: TProductPrice | null;
  calculations: ICartItemCalculation | null;
  groupKey: string | null;
  availability: TProductAvailability | null;
  availableQuantity: TProductQuantity | null;
}

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
      return handlePending(state, action.payload);
    case `${CART_ADD_ITEM}_FULFILLED`:
    case `${CART_UPDATE_ITEM}_FULFILLED`:
      return handleFulfilled(state, action.payload);
    case `${CART_ADD_ITEM}_REJECTED`:
    case `${CART_DELETE_ITEM}_REJECTED`:
    case `${CART_UPDATE_ITEM}_REJECTED`:
      return handleRejected(state, action.payload);
    case `${CART_CREATE}_FULFILLED`:
      return handleCartCreateFulfilled(state, action.payload);
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
    default:
      return state;
  }
};

// handlers
const handleFulfilled = (cartState: ICartState, payload: ICartDataResponse) => {
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

const handleCartCreateFulfilled = (cartState: ICartState, payload: any) => {
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

export function getCartId(state: any, props: any): TCartId {
  return (isCartCreated(state, props) && state.cart.data.id) ? state.cart.data.id : null;
}

// selectors INNER
function getProductFromCart(cartState: ICartState, sku: TProductSKU): ICartItem {
  return (cartState.data.items.filter((item: ICartItem): any => item.sku === sku))[0];
}

function isProductExistsInCart(cartState: ICartState, sku: TProductSKU): boolean {
  return Boolean(cartState.data.items.filter((item: ICartItem): any => item.sku === sku).length);
}

function getCartItemsWithoutSelected(cartState: ICartState, sku: TProductSKU): Array<ICartItem> {
  return cartState.data.items.filter((item: ICartItem): any => item.sku !== sku);
}

