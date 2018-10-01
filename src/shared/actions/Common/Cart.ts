import {
  CART_ADD_PRODUCT,
  CART_CREATE,
} from '../../constants/ActionTypes/Common/Cart';
import {CartService} from "../../services/Common/Cart";
import {ICartItem} from "../../reducers/Common/Cart";

// TODO: Add product after cart is created
export const addProductToCart = function(cartItem: ICartItem) {
  return {
    type: CART_ADD_PRODUCT,
    payload: {
      cartItem
    },
  };
};

export const cartCreatePendingState = {
  type: CART_CREATE + '_PENDING',
};

export const cartCreateAction = function (payload: any, accessToken: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(cartCreatePendingState);
    CartService.cartCreate(CART_CREATE, dispatch, payload, accessToken);
  };
};
