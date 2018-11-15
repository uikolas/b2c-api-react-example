import { ICustomerProfileIdentity } from "src/shared/interfaces/customer";
import { IAddressItem } from "src/shared/interfaces/addresses";

export interface ISameAsDelivery {
  isSameAsDelivery: boolean;
}

export interface IPayment {
  paymentProvider: string;
  paymentMethod: string;
  paymentSelection: string;
  amount: number;
}

export interface IShipment {
  carrierName?: string;
  id: string;
  name?: string;
  price?: number;
  taxRate?: number;
  shipmentDeliveryTime?: string;
}

export interface ICheckoutRequest {
  customer?: ICustomerProfileIdentity;
  id?: string;
  billingAddress?: IAddressItem;
  shippingAddress?: IAddressItem;
  payment?: IPayment;
  payments?: Array<IPayment>;
  shipment?: {
    shipmentSelection: string,
    method: IShipment,
  };
}
