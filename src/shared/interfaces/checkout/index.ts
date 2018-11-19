import {
  ICustomerProfileIdentity,
  TCustomerFirstName,
  TCustomerLastName,
  TCustomerSalutation
} from "src/shared/interfaces/customer";
import {
  IAddressItem,
  TAddress,
  TAddressCity,
  TAddressCompany,
  TAddressCountry,
  TAddressPhone,
  TAddressZipCode,
  TIso2Code
} from "src/shared/interfaces/addresses";

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

export type TAddressInputValue = TCustomerFirstName
  | TCustomerLastName
  | TCustomerSalutation
  | TAddress
  | TAddressZipCode
  | TAddressCity
  | TAddressCountry
  | TAddressCompany
  | TAddressPhone
  | TIso2Code;

export interface ISameAsDelivery {
  isSameAsDelivery: boolean;
}

export interface IUsageSavedAddress {
  billingSelectedAddressId: IAddressItem["id"] | null;
  deliverySelectedAddressId: IAddressItem["id"] | null;
}

export interface IAddNewAddressActions {
  isAddNewBilling: boolean;
  isAddNewDelivery: boolean;
}
