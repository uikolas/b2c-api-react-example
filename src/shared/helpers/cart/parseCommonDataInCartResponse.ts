import {ICustomerCartDataRawResponse} from "src/shared/helpers/cart/types";
import {ICommonDataInCart} from "src/shared/interfaces/cart/index";

export const parseCommonDataInCartResponse = (data: ICustomerCartDataRawResponse): ICommonDataInCart => {
  return {
    id: data.id,
    currency: data.attributes.currency,
    discounts: data.attributes.discounts,
    priceMode: data.attributes.priceMode,
    store: data.attributes.store,
    totals: data.attributes.totals,
  };
};
