import { ICartItem } from '../../reducers/Common/Cart';
import { TAppCurrency } from '../../reducers/Common/Init';
import { IAbstractTotals } from '../abstract/totals';
import { TProductQuantity, TProductSKU } from '../product';

export type TCartId = string;
export type TCartPriceMode = string;
export type TCartStore = string;
export type TCartDisplayName = string;
export type TCartAmount = number;
export type TCartCode = string;
export type TCartAddItemCollection = Array<ICartAddItem> | null;

export interface ICartDiscounts {
  displayName: TCartDisplayName;
  amount: TCartAmount;
  code: TCartCode;
}

export interface ICartAddItem {
  sku: TProductSKU;
  quantity: TProductQuantity;
}

export interface ICartTotals extends IAbstractTotals {

}

export interface ICartDataResponse {
  id: TCartId;
  currency: TAppCurrency;
  discounts: ICartDiscounts | any;
  priceMode: TCartPriceMode;
  store: TCartStore;
  totals: ICartTotals;
  items: Array<ICartItem>;
}

export interface ICartItemCalculation {
  sumDiscountAmountAggregation: number;
  sumDiscountAmountFullAggregation: number;
  sumGrossPrice: number;
  sumNetPrice: number;
  sumPrice: number;
  sumPriceToPayAggregation: number;
  sumProductOptionPriceAggregation: number;
  sumSubtotalAggregation: number;
  sumTaxAmountFullAggregation: number;
  taxRate: number;
  unitDiscountAmountAggregation: number;
  unitDiscountAmountFullAggregation: number;
  unitGrossPrice: number;
  unitNetPrice: number;
  unitPrice: number;
  unitPriceToPayAggregation: number;
  unitProductOptionPriceAggregation: number;
  unitSubtotalAggregation: number;
  unitTaxAmountFullAggregation: number;
}

interface ICartResponseItemAttributes {
  amount: number | null;
  calculations: ICartItemCalculation;
  groupKey: string;
  quantity: number;
  sku: string;
}

export interface ICartResponseItem {
  attributes: ICartResponseItemAttributes;
  id?: string;
  links?: object;
  relationships?: object;
  type?: string;
}
