import {TProductQuantity, TProductSKU} from "../../interfaces/product/index";
import {ICartAddItem} from "../Common/Cart";
import {ICartItem} from "../../reducers/Common/Cart";

export const createCartItemAddToCart = (sku: TProductSKU, quantity: TProductQuantity): ICartAddItem => ({
  sku,
  quantity,
});

export const createCartItemFromResponse = (item: any): ICartItem => {
  return {
    sku: item.id,
    quantity: item.attributes.quantity,
    amount: item.attributes.amount,
    calculations: item.attributes.calculations,
    groupKey: item.attributes.groupKey,
  };
};
