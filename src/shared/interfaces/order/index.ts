import {TAppCurrency} from "../../reducers/Common/Init";
import {TProductName, TProductPrice, TProductQuantity, TProductSKU} from "../product/index";
import {IAbstractTotals, TCanceledTotal} from "../abstract/totals";

type TOrderCreatedAt = string;
export type TOrderDate = string;
export type TOrderId = string;
export type TOrderCollection = Array<IOrderItem> | null;
export type TOrderExpenseName = string;

/**
 *  Order History
 */

export interface IOrderTotals extends IAbstractTotals {
  canceledTotal: TCanceledTotal;
}

export interface IOrderCollectionParsed {
  items: TOrderCollection;
}

export interface IOrderCollectionResponse {
  data: Array<IOrderItemResponse>;
}

export interface IOrderItem {
  id: TOrderId;
  dateCreated: TOrderDate;
  currency: TAppCurrency;
  totals: IOrderTotals;
}

export interface IOrderItemResponse {
  attributes: {
    createdAt: TOrderCreatedAt;
    currencyIsoCode: TAppCurrency;
    totals: IOrderTotals;
  };
  id: TOrderId;
}

/**
 *  Order Detail
 */

export interface IOrderDetailsResponse {
  attributes: {
    createdAt: TOrderCreatedAt,
    currencyIsoCode: TAppCurrency;
    expenses: Array<IOrderDetailsExpenseItem>;
    items: Array<IOrderDetailsItem>;
    totals: IOrderTotals;
  };
  id: TOrderId;
}

export interface IOrderDetailsParsed extends IOrderItem {
  expenses: Array<IOrderDetailsExpenseItem>;
  items: Array<IOrderDetailsItem>;
}

export interface IOrderDetailsExpenseItem {
  name: TOrderExpenseName;
  sumPrice: TProductPrice;
}

export interface IOrderDetailsItem {
  name: TProductName;
  quantity: TProductQuantity;
  sku: TProductSKU;
  sumPrice: TProductPrice;
  sumPriceToPayAggregation: TProductPrice;
}
