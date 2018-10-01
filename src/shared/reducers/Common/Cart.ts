import {
  CART_ADD_PRODUCT,
  CART_CREATE,
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
import {ICartDiscounts, ICartTotals, TCartId, TCartPriceMode, TCartStore, TCartType} from "../../interfaces/cart";

export interface ICartItem {
  sku: TProductSKU;
  name: TProductName;
  quantity: TProductQuantity;
  price: TProductPrice;
}

export interface ICartData {
  cartCreated: boolean;
  items: Array<ICartItem>;
  type: TCartType | null;
  id: TCartId | null;
  priceMode: TCartPriceMode | null;
  store: TCartStore | null;
  discounts: Array<ICartDiscounts>;
  totals: ICartTotals | null;
}


export interface ICartState extends IReduxState {
  data: ICartData;
}

export const initialState: ICartState = {
  data: {
    cartCreated: false,
    items: [],
    type: null,
    id: null,
    priceMode: null,
    store: null,
    discounts: null,
    totals: null,
  },
};

export const cart = function (state: ICartState = initialState, action: any): ICartState {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      console.log('action', action);
      return handleCartAdd(state, action.payload);
    case `${CART_CREATE}_PENDING`:
      return handleCartPending(state, action.payload);
    case `${CART_CREATE}_FULFILLED`:
      return handleCartFulfilled(state, action.payload);
    case `${CART_CREATE}_REJECTED`:
      return handleCartRejected(state, action.payload);
    default:
      return state;
  }
};

// handlers
const handleCartFulfilled = (cartState: ICartState, payload: any) => {
  return {
    ...cartState,
    data: {
      ...cartState.data,
      cartCreated: true,
      type: payload.type,
      id: payload.id,
      priceMode: payload.attributes.priceMode,
      store: payload.attributes.store,
      discounts: payload.attributes.discounts,
      totals: payload.attributes.totals,
    },
    ...getReducerPartFulfilled(),
  };
};

const handleCartRejected = (cartState: ICartState, payload: any) => {
  return {
    ...cartState,
    data: {
      ...cartState.data,
      cartCreated: false,
    },
    ...getReducerPartRejected(payload.error),
  };
};
const handleCartPending = (cartState: ICartState, payload: any) => {
  return {
    ...cartState,
    data: {
      ...initialState.data,
    },
    ...getReducerPartPending(),
  };
};


const handleCartAdd = (cartState: ICartState, payload: ICartItem) => {

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
  };
};

const handleCartRemove = (cartState: ICartState, payload: ICartItem) => {
  return {
    ...cartState.data,
    data: {
      items: cartState.data.items.filter((item: ICartItem): Array<ICartItem> | boolean => item.sku !== payload.sku)
    }
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

