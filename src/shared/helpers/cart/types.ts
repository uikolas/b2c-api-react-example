import {
  ICartDiscounts,
  ICartItem,
  ICartItemCalculation,
  ICartTotals
} from "src/shared/interfaces/cart/index";
import {IAbstractRowIncludedResponse} from "src/shared/interfaces/abstract/rowIncludedresponse";
import {
  IRowConcreteProductsIncludedResponse,
  IRowProductAvailabilitiesIncludedResponse,
  IRowProductImageSetsIncludedResponse,
  IRowProductPricesIncludedResponse
} from "src/shared/helpers/product/types";

export interface IUserCartRawResponseMultiValue {
  data: Array<ICustomerCartDataRawResponse>;
  included?: [TRowCustomerCartIncludedResponse];
}

export interface IUserCartRawResponseOneValue {
  data: ICustomerCartDataRawResponse;
  included?: [TRowCustomerCartIncludedResponse];
}

export interface IUserCartRawResponse extends IUserCartRawResponseOneValue {
}

export interface ICustomerCartDataRawResponse {
  attributes: {
    currency: string;
    discounts: {} | Array<ICartDiscounts>;
    priceMode: string;
    store: string;
    totals: ICartTotals;
  };
  id: string;
  links: {
    self: string;
  };
  relationships: {
    items: {
      data: Array<ICartItemDataShort>;
    };
    "guest-cart-items": {
      data: Array<ICartItemDataShort>;
    }
  };
  type: string;
}

export interface ICartResultData {
  [key: string]: ICartItem;
}

export interface ICartItemDataShort {
  type: string;
  id: string;
}

export type TRowCustomerCartIncludedResponse = IRowProductImageSetsIncludedResponse
  | IRowProductAvailabilitiesIncludedResponse
  | IRowProductPricesIncludedResponse
  | IRowConcreteProductsIncludedResponse
  | IRowCustomerCartItemsIncludedResponse;

export interface IRowCustomerCartItemsIncludedResponse extends IAbstractRowIncludedResponse {
  type: "items" | "guest-cart-items";
  attributes: {
    amount: number | null;
    calculations: ICartItemCalculation;
    groupKey: string;
    quantity: number;
    sku: string
  };
}
