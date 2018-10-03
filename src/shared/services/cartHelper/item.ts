import {TProductQuantity, TProductSKU} from "../../interfaces/product/index";
import {ICartAddItem} from "../Common/Cart";
import {ICartItem} from "../../reducers/Common/Cart";

export const createCartItemAddToCart = (sku: TProductSKU, quantity: TProductQuantity): ICartAddItem => ({
  sku,
  quantity,
});
