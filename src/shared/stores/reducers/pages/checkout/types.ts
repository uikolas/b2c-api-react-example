import {IAddressItemCollection} from "src/shared/interfaces/addresses/index";
import {IPaymentMethod, IShipmentMethod} from "src/shared/interfaces/checkout/index";
import {IReduxState} from "src/typings/app";
import {TOrderId} from "src/shared/interfaces/order/index";
import {IActionData} from "src/shared/stores/reducers/types";

export interface ICheckoutState extends IReduxState {
  data: ICheckoutStateData;
}

export interface IPageCheckoutAction extends IActionData {
  payloadSendFulfilled?: {
    orderId: TOrderId;
  };
  payloadGetFulfilled?: ICheckoutResponseData;
}

export interface ICheckoutResponseData {
  payments: Array<IPaymentMethod>;
  shipments: Array<IShipmentMethod>;
  addressesCollection: Array<IAddressItemCollection>;
}

interface ICheckoutStateData extends ICheckoutResponseData {
  orderId: TOrderId;
}

