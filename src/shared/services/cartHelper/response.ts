import {ICartDataResponse, ICartResponseItem} from "../../interfaces/cart/index";
import {createCartItemFromResponse} from "./item";
import {parseImageSets} from "../productHelper/imageSetsParser";


export const parseCartCreateResponse = (data: any): ICartDataResponse => {
  return {
    ...parseCommonDataInCartResponse(data),
    items: [],
  };
};

export const parseAddToCartResponse = (data: any): ICartDataResponse => {

  const result: any = {};
  // Fill data with concrete products ids
  if (data.data.relationships.items.data) {
    data.data.relationships.items.data.forEach((datum: any) => {
      result[datum.id] = {};
    });
  }

  data.included.forEach((row: any) => {
    if (row.type === 'concrete-product-image-sets' && !result[row.id].images) {
      const images = parseImageSets(row.attributes.imageSets);
      result[row.id].image = images[0].externalUrlSmall ? images[0].externalUrlSmall : null;
    } else if (row.type === 'items' && !result[row.id].sku) {
      result[row.id].sku = row.id;
      result[row.id].quantity = row.attributes.quantity;
      result[row.id].amount = row.attributes.amount;
      result[row.id].calculations = row.attributes.calculations;
      result[row.id].groupKey = row.attributes.groupKey;
    } else if (row.type === 'concrete-products' && !result[row.id].name) {
      result[row.id].name = row.attributes.name;
    }
  });

  const items = Object.values(result);
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

