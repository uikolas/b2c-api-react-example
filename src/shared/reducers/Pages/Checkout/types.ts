import {IAddressItemCollection} from "src/shared/interfaces/addresses/index";
import {IPaymentMethod, IShipmentMethod} from "src/shared/interfaces/checkout/index";
import {IReduxState} from "src/typings/app";
import {TOrderId} from "src/shared/interfaces/order/index";

export interface ICheckoutState extends IReduxState {
  data: ICheckoutStateData;
}

export type TPageCheckoutAction = {
  type: string;
  payloadSendFulfilled?: {
    orderId: TOrderId;
  };
  payloadGetFulfilled?: ICheckoutResponseData;
  error?: string;
};

export interface ICheckoutResponseData {
  payments: Array<IPaymentMethod>;
  shipments: Array<IShipmentMethod>;
  addressesCollection: Array<IAddressItemCollection>;
}

interface ICheckoutStateData extends ICheckoutResponseData {
  orderId: TOrderId;
}

