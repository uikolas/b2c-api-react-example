import {
  CART_ADD_PRODUCT,
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

interface ICartItem {
  sku: TProductSKU;
  name: TProductName;
  quantity: TProductQuantity;
  price: TProductPrice;
}

export interface ICartState extends IReduxState {
  items: Array<ICartItem>;
}

export const initialState: ICartState = {
  items: [],
};

export const cart = function (state: ICartState = initialState, action: any): ICartState {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      return handleCartAdd(state, action.payload);
    default:
      return state;
  }
};

// handlers
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
    items = [...cartState.items, addedItem];
  }

  return {
    ...cartState,
    items,
  };
};

const handleCartRemove = (cartState: ICartState, payload: ICartItem) => {
  return {
    ...cartState,
    items: cartState.items.filter((item: ICartItem): Array<ICartItem> | boolean => item.sku !== payload.sku)
  };
};

// selectors
// Number of products(including quantity per each product) in the cart
export function getTotalProductsQuantity(state: any, props: any): TProductQuantity {
  return state.cart.items.reduce((acc: number, item: ICartItem) => {
    return acc + item.quantity;
  }, 0);
}

// Number of items in the cart
export function getTotalItemsQuantity(state: any, props: any): TProductQuantity {
  return state.cart.items.length;
}

// selectors INNER
function getProductFromCart(cartState: ICartState, sku: TProductSKU): ICartItem {
  return (cartState.items.filter((item: ICartItem): any => item.sku === sku))[0];
}

function isProductExistsInCart(cartState: ICartState, sku: TProductSKU): boolean {
  return Boolean(cartState.items.filter((item: ICartItem): any => item.sku === sku).length);
}

function getCartItemsWithoutSelected(cartState: ICartState, sku: TProductSKU): Array<ICartItem> {
  return cartState.items.filter((item: ICartItem): any => item.sku !== sku);
}

