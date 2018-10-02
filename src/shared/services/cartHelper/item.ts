import {TProductName, TProductPrice, TProductQuantity, TProductSKU} from "../../interfaces/product/index";
import {ICartAddItem} from "../Common/Cart";

/*
export const createCartItem = (
                                sku: TProductSKU,
                                name: TProductName,
                                quantity: TProductQuantity,
                                price: TProductPrice
                              ) => ({
  sku,
  name,
  quantity,
  price,
});
*/

export const createCartItem = (sku: TProductSKU, quantity: TProductQuantity): ICartAddItem => ({
  sku,
  quantity,
});
