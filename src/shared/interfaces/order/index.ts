import {TAppCurrency} from "../../reducers/Common/Init";

type TOrderCreatedAt = string;
export type TOrderDate = string;
export type TOrderId = string;
export type TOrderCollection = Array<IOrderItem> | null;

/**
 *  Order History
 */

export interface IOrderTotals {
  canceledTotal: number;
  discountTotal: number;
  expenseTotal: number;
  grandTotal: number;
  subtotal: number;
  taxTotal: number;
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
export interface IOrderDetailsParsed {
  orderId: TOrderId;
}
