import {TProductQuantity, TProductSKU} from "../../interfaces/product/index";
import {ICartAddItem} from "../../interfaces/cart/index";

export const createCartItemAddToCart = (sku: TProductSKU, quantity: TProductQuantity): ICartAddItem => ({
  sku,
  quantity,
});
