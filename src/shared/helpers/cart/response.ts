import {ICartDataResponse} from '../../interfaces/cart';
import { parseImageSets } from '../product/imageSetsParser';
import {IProductPricesItem, priceTypeNameDefault, priceTypeNameOriginal} from "src/shared/interfaces/product/index";
import {
  ICartItemDataShort,
  ICartResultData,
  ICustomerCartRawResponse,
  TRowCustomerCartIncludedResponse
} from "src/shared/helpers/cart/types";
import {parseCommonDataInCartResponse} from "src/shared/helpers/cart";

export const parseCartCreateResponse = (response: ICustomerCartRawResponse): ICartDataResponse | null => {
  if (!response) {
    return null;
  }

  return {
    ...parseCommonDataInCartResponse(response.data[0]),
    items: [],
  };
};

export const parseAddToCartResponse = (response: ICustomerCartRawResponse): ICartDataResponse | null => {
  if (!response) {
    return null;
  }
  const {included} = response;
  const [data] = response.data;
  let result: ICartResultData = {};
  let totalQty: number = 0;

  // Fill data with concrete products ids
  if (data.relationships && data.relationships.items) {
    data.relationships.items.data.forEach((datum: ICartItemDataShort) => {
      result[datum.id] = {
        sku: null,
        name: null,
        image: null,
        quantity: null,
        amount: null,
        prices: [],
        calculations: null,
        groupKey: null,
        availability: null,
        availableQuantity: null,
        superAttributes: null,
        priceOriginalGross: null,
        priceOriginalNet: null,
        priceDefaultGross: null,
        priceDefaultNet: null,
      };
    });
  }

  included && included.forEach((row: TRowCustomerCartIncludedResponse) => {
    if (row.type === 'concrete-product-image-sets' && !result[row.id].image) {
      const images = parseImageSets(row.attributes.imageSets);
      result[row.id].image = images[0].externalUrlSmall ? images[0].externalUrlSmall : null;
    } else {
      if (row.type === 'items' && !result[row.id].sku) {
        result[row.id].sku = row.id;
        result[row.id].quantity = row.attributes.quantity;
        result[row.id].amount = row.attributes.amount;
        result[row.id].calculations = row.attributes.calculations;
        result[row.id].groupKey = row.attributes.groupKey;
        totalQty += row.attributes.quantity;
      } else {
        if (row.type === 'concrete-products') {
          result[row.id].name = row.attributes.name;

          if (Array.isArray(row.attributes.superAttributesDefinition)) {
            result[row.id].superAttributes = [];
            Object.keys(row.attributes.attributes).forEach((attribute: string) => {
              if (row.attributes.superAttributesDefinition.includes(attribute)) {
                const attributeKey: string = String(attribute);
                const attributeValue: string = String(row.attributes.attributes[attribute]);
                result[row.id].superAttributes.push({
                  [attributeKey]: attributeValue,
                });
              }
            });
          }
        } else if (row.type === 'concrete-product-prices') {
          result[row.id].prices = row.attributes.prices;
          if (row.attributes.prices && row.attributes.prices.length) {
            row.attributes.prices.forEach((priceData: IProductPricesItem) => {
              if (priceData.priceTypeName === priceTypeNameDefault) {
                result[row.id].priceDefaultGross = priceData.grossAmount;
                result[row.id].priceDefaultNet = priceData.netAmount;
              }
              if (priceData.priceTypeName === priceTypeNameOriginal) {
                result[row.id].priceOriginalGross = priceData.grossAmount;
                result[row.id].priceOriginalNet = priceData.netAmount;
              }
            });
          }
        } else {
          if (row.type === 'concrete-product-availabilities' && !result[row.id].availability) {
            result[row.id].availability = row.attributes.availability;
            result[row.id].availableQuantity = row.attributes.quantity;
          }
        }
      }
    }
  });

  const items = Object.values(result);
  return {
    ...parseCommonDataInCartResponse(data),
    items,
    totalQty,
  };
};

