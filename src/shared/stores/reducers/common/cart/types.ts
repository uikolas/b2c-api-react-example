import { ICartDataResponse } from '@interfaces/cart';
import { IReduxState } from 'src/typings/app';
import {IActionData} from "src/shared/stores/reducers/types";


export interface ICartData extends ICartDataResponse {
  cartCreated: boolean;
}

export interface ICartState extends IReduxState {
  data: ICartData;
}

export interface ICartAction extends IActionData {
  payloadCartItemFulfilled?: ICartDataResponse;
  payloadCartDeleteItemFulfilled?: {
    itemId: string;
  };
}
