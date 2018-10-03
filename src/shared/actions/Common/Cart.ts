import {
  CART_ADD_ITEM,
  CART_CREATE,
  CART_DELETE_ITEM,
} from '../../constants/ActionTypes/Common/Cart';
import {CartService, ICartAddItem, ICartCreatePayload} from "../../services/Common/Cart";
import {ICartDataResponse, TCartId} from "../../interfaces/cart/index";


export const addItemToCartAction = function(
                                            payload: ICartAddItem,
                                            cartId: TCartId,
                                            payloadCartCreate: ICartCreatePayload
                                          ) {
  return (dispatch: Function, getState: Function) => {
    CartService.cartAddItem(dispatch, payload, cartId, payloadCartCreate);
  };
};

export const cartAddItemPendingStateAction = () => ({
  type: CART_ADD_ITEM + '_PENDING',
});

export const cartDeleteItemPendingStateAction = {
  type: CART_DELETE_ITEM + '_PENDING',
};

export const cartAddItemFulfilledStateAction = (payload: ICartDataResponse) => ({
  type: CART_ADD_ITEM + '_FULFILLED',
  payload,
});

export const cartAddItemRejectedStateAction = (message: string) => ({
  type: CART_ADD_ITEM + '_REJECTED',
  payload: {error: message},
});

export const cartCreatePendingStateAction = () => ({
  type: CART_CREATE + '_PENDING',
});

export const cartCreateRejectedStateAction = (message: string) => ({
  type: CART_CREATE + '_REJECTED',
  payload: {error: message},
});

export const cartCreateFulfilledStateAction = (payload: ICartDataResponse) => ({
  type: CART_CREATE + '_FULFILLED',
  payload,
});

export const cartCreateAction = function (payload: ICartCreatePayload) {
  return (dispatch: Function, getState: Function) => {
    CartService.cartCreate(dispatch, payload);
  };
};

export const cartDeleteItemAction = function (cartId: string, itemId: string) {
  return (dispatch: Function, getState: Function) => {
    CartService.cartDeleteItem(CART_DELETE_ITEM, dispatch, cartId, itemId);
    dispatch(cartDeleteItemPendingStateAction);
  };
};
