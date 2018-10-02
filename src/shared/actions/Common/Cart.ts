import {
  CART_ADD_ITEM,
  CART_CREATE,
} from '../../constants/ActionTypes/Common/Cart';
import {CartService, ICartAddItem, ICartCreatePayload} from "../../services/Common/Cart";
import {TCartId} from "../../interfaces/cart/index";


export const addItemToCartAction = function(
                                            payload: ICartAddItem,
                                            cartId: TCartId,
                                            payloadCartCreate: ICartCreatePayload
                                          ) {
  return (dispatch: Function, getState: Function) => {
    CartService.cartAddItem(CART_ADD_ITEM, dispatch, payload, cartId, payloadCartCreate);
  };
};

export const cartAddItemPendingStateAction = {
  type: CART_ADD_ITEM + '_PENDING',
};

export const cartCreatePendingStateAction = {
  type: CART_CREATE + '_PENDING',
};

export const cartCreateAction = function (payload: ICartCreatePayload) {
  return (dispatch: Function, getState: Function) => {
    CartService.cartCreate(CART_CREATE, dispatch, payload);
  };
};
