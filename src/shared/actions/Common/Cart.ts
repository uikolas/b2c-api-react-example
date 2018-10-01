import {
  CART_ADD_PRODUCT,
  CART_CREATE,
} from '../../constants/ActionTypes/Common/Cart';
import {TProductName, TProductPrice, TProductQuantity, TProductSKU} from "../../interfaces/product";
import {CartService} from "../../services/Common/Cart";
import {string} from "prop-types";


// TODO: Add product after cart is created
export const addProductToCart = function(
                                          sku: TProductSKU,
                                          name: TProductName ,
                                          quantity: TProductQuantity,
                                          price: TProductPrice
                                        ) {
  return {
    type: CART_ADD_PRODUCT,
    payload: {
      sku,
      name,
      quantity,
      price,
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
