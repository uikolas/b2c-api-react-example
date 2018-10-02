import {
  CART_CREATE,
  CART_ADD_ITEM,
} from '../../constants/ActionTypes/Common/Cart';
import {
  IReduxState,
} from '../../../typings/app';
import {
  TProductSKU,
  TProductQuantity,
  TProductName,
  TProductPrice,
} from "../../interfaces/product";
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";
import {
  ICartItemCalculation, ICartDataResponse, TCartId,
} from "../../interfaces/cart";

export interface ICartItem {
  sku: TProductSKU;
  // name: TProductName;
  quantity: TProductQuantity;
  amount: TProductPrice | null;
  calculations: ICartItemCalculation;
  groupKey: string;
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

export const cart = function (state: ICartState = initialState, action: any): ICartState {
  switch (action.type) {
    case `${CART_ADD_ITEM}_PENDING`:
      return handleCartAddItemPending(state, action.payload);
    case `${CART_ADD_ITEM}_FULFILLED`:
      return handleCartAddItemFulfilled(state, action.payload);
    case `${CART_ADD_ITEM}_REJECTED`:
      return handleCartAddItemRejected(state, action.payload);
    case `${CART_CREATE}_PENDING`:
      return handleCartCreatePending(state, action.payload);
    case `${CART_CREATE}_FULFILLED`:
      return handleCartCreateFulfilled(state, action.payload);
    case `${CART_CREATE}_REJECTED`:
      return handleCartCreateRejected(state, action.payload);
    default:
      return state;
  }
};

// handlers
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
const handleCartCreatePending = (cartState: ICartState, payload: any) => {
  return {
    ...cartState,
    data: {
      ...cartState.data,
    },
    ...getReducerPartPending(),
  };
};

/*const handleCartAddItem = (cartState: ICartState, payload: ICartItem) => {

  let items: Array<ICartItem> = [];
  const addedItem = payload;
  const existedItem = getProductFromCart(cartState, payload.sku);
  if (existedItem) {
    items = getCartItemsWithoutSelected(cartState, payload.sku);
    addedItem.quantity = existedItem.quantity + payload.quantity;
    items.push(addedItem);
  } else {
    items = [...cartState.data.items, addedItem];
  }

  return {
    ...cartState,
    data: {
      ...cartState.data,
      items: [...items],
    },
    ...getReducerPartFulfilled(),
  };
};*/

const handleCartAddItemFulfilled = (cartState: ICartState, payload: ICartDataResponse) => {
  return {
    ...cartState,
    data: {
      ...cartState.data,
      ...payload,
    },
    ...getReducerPartFulfilled(),
  };
};

const handleCartAddItemPending = (cartState: ICartState, payload: any) => {
  return {
    ...cartState,
    data: {
      ...cartState.data,
    },
    ...getReducerPartPending(),
  };
};

const handleCartAddItemRejected = (cartState: ICartState, payload: any) => {
  return {
    ...cartState,
    data: {
      ...initialState.data,
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

