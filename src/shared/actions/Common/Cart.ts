import {
  CART_ADD_ITEM,
  CART_CREATE,
} from '../../constants/ActionTypes/Common/Cart';
import {CartService, ICartAddItem, ICartCreatePayload} from "../../services/Common/Cart";
import {TCartId} from "../../interfaces/cart/index";


export const addItemToCartAction = function(payload: ICartAddItem, cartId: TCartId) {
  return (dispatch: Function, getState: Function) => {
    dispatch(cartAddItemPendingState);
    CartService.cartAddItem(CART_ADD_ITEM, dispatch, payload, cartId);
  };
};

export const cartAddItemPendingState = {
  type: CART_ADD_ITEM + '_PENDING',
};

export const cartCreatePendingState = {
  type: CART_CREATE + '_PENDING',
};

export const cartCreateAction = function (payload: ICartCreatePayload) {
  return (dispatch: Function, getState: Function) => {
    dispatch(cartCreatePendingState);
    CartService.cartCreate(CART_CREATE, dispatch, payload);
  };
};
