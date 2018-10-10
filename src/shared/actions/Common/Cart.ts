import {
  CART_ADD_ITEM,
  CART_CREATE,
  CART_DELETE_ITEM,
  CART_UPDATE_ITEM,
} from '../../constants/ActionTypes/Common/Cart';
import {CartService, ICartCreatePayload} from "../../services/Common/Cart";
import {ICartAddItem, ICartDataResponse, TCartId} from "../../interfaces/cart/index";
import {TProductSKU} from "../../interfaces/product/index";


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

export const cartDeleteItemAction = function (cartId: TCartId, itemId: TProductSKU) {
  return (dispatch: Function, getState: Function) => {
    CartService.cartDeleteItem(CART_DELETE_ITEM, dispatch, cartId, itemId);
    dispatch(cartDeleteItemPendingStateAction);
  };
};

export const cartUpdateItemPendingStateAction = () => ({
  type: CART_UPDATE_ITEM + '_PENDING',
});

export const cartUpdateItemRejectedStateAction = (message: string) => ({
  type: CART_UPDATE_ITEM + '_REJECTED',
  payload: {error: message},
});

export const cartUpdateItemFulfilledStateAction = (payload: ICartDataResponse) => ({
  type: CART_UPDATE_ITEM + '_FULFILLED',
  payload,
});

export const updateItemInCartAction = function (payload: ICartAddItem, cartId: TCartId) {
  return (dispatch: Function, getState: Function) => {
    CartService.cartUpdateItem(dispatch, payload, cartId);
  };
};
