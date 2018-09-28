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

export interface ICartItem {
  sku: TProductSKU;
  name: TProductName;
  quantity: TProductQuantity;
  price: TProductPrice;
}

export interface ICartData {
  cartCreated: boolean;
  items: Array<ICartItem>;
}

export interface ICartState extends IReduxState {
  data: ICartData;
}

export const initialState: ICartState = {
  data: {
    cartCreated: false,
    items: [],
  },
};

export const cart = function (state: ICartState = initialState, action: any): ICartState {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      return handleCartAdd(state, action.payload);
    case `${CART_CREATE}_PENDING`:
      return {
        ...state,
        error: null,
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    case `${CART_CREATE}_FULFILLED`:
      return handleCartCreate(state, action.payload);
    case `${CART_CREATE}_REJECTED`:
      return {
        ...state,
        error: action.error,
        pending: false,
        fulfilled: false,
        rejected: true,
      };
    default:
      return state;
  }
};

// handlers
const handleCartCreate = (cartState: ICartState, payload: any) => {

  // TODO: handle store necessary data to state

  return {
    ...cartState,
    data: {
      ...cartState.data,
      cartCreated: true,
    },
    pending: false,
    fulfilled: true,
  };
};

const handleCartAdd = (cartState: ICartState, payload: ICartItem) => {

  let items: Array<ICartItem> = [];
  const addedItem = {
    sku: payload.sku,
    name: payload.name,
    quantity: payload.quantity,
    price: payload.price,
  };
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

