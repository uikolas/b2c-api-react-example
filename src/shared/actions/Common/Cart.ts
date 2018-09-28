import {
  CART_ADD_PRODUCT,
} from '../../constants/ActionTypes/Common/Cart';
import {TProductName, TProductPrice, TProductQuantity, TProductSKU} from "../../interfaces/product";

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
