import {
  CART_ADD_ITEM,
  CART_CREATE,
} from '../../constants/ActionTypes/Common/Cart';
import {CartService, ICartAddItem, ICartCreatePayload} from "../../services/Common/Cart";
import {TAccessToken} from "../../interfaces/login";
import {TCartId} from "../../interfaces/cart/index";


export const addItemToCartAction = function(payload: ICartAddItem, cartId: TCartId, accessToken: TAccessToken) {
  return (dispatch: Function, getState: Function) => {
    dispatch(cartAddItemPendingState);
    CartService.cartAddItem(CART_ADD_ITEM, dispatch, payload, cartId, accessToken);
  };
};

export const cartAddItemPendingState = {
  type: CART_ADD_ITEM + '_PENDING',
};

export const cartCreatePendingState = {
  type: CART_CREATE + '_PENDING',
};

export const cartCreateAction = function (payload: ICartCreatePayload, accessToken: TAccessToken) {
  return (dispatch: Function, getState: Function) => {
    dispatch(cartCreatePendingState);
    CartService.cartCreate(CART_CREATE, dispatch, payload, accessToken);
  };
};
