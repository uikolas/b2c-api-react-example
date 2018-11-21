import {
  TProductAvailability,
  TProductImageSRC,
  TProductName,
  TProductPrice,
  TProductQuantity,
  TProductSKU,
} from 'src/shared/interfaces/product';
import { ICartDataResponse, ICartItemCalculation } from 'src/shared/interfaces/cart';
import { IReduxState } from 'src/typings/app';

export interface ICartItem {
  sku: TProductSKU | null;
  name: TProductName | null;
  image: TProductImageSRC | null;
  quantity: TProductQuantity | null;
  amount: TProductPrice | null;
  calculations: ICartItemCalculation | null;
  groupKey: string | null;
  availability: TProductAvailability | null;
  availableQuantity: TProductQuantity | null;
  superAttributes: Array<{[key: string]: string}> | null;
}

export interface ICartData extends ICartDataResponse {
  cartCreated: boolean;
}

export interface ICartState extends IReduxState {
  data: ICartData;
}
