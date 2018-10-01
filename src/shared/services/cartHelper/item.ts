import {TProductName, TProductPrice, TProductQuantity, TProductSKU} from "../../interfaces/product/index";

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
