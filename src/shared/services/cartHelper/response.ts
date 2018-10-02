import {ICartDataResponse, ICartResponseItem} from "../../interfaces/cart/index";
import {createCartItemFromResponse} from "./item";


export const parseCartCreateResponse = (data: any): ICartDataResponse => {
  return {
    ...parseCommonDataInCartResponse(data),
    items: [],
  };
};

export const parseAddToCartResponse = (data: any): ICartDataResponse => {
  const items = data.included
    .filter((item: any) => ( item.type === 'items' ))
    .map((item: any) => {
      return createCartItemFromResponse(item);
    });

  return {
    ...parseCommonDataInCartResponse(data),
    items,
  };
};

const parseCommonDataInCartResponse = (data: any): any => {
  return {
    id: data.data.id,
    currency: data.data.attributes.currency,
    discounts: data.data.attributes.discounts,
    priceMode: data.data.attributes.priceMode,
    store: data.data.attributes.store,
    totals: data.data.attributes.totals,
  };
};

