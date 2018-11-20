import {
  ICustomerProfileIdentity,
} from "src/shared/interfaces/customer";
import {
  IAddressItem,
} from "src/shared/interfaces/addresses";

export type TShipmentCarrierName = string;
export type TShipmentId = string;
export type TShipmentName = string;
export type TShipmentPrice = number;
export type TShipmentTaxRate = number;
export type TShipmentShipmentDeliveryTime = string;
export type TPaymentProvider = string;
export type TPaymentSelection = string;
export type TPaymentAmount = number;
export type TPaymentMethodName = TPaymentMethodInvoice | TPaymentMethodCreditCard;

export type TPaymentMethodInvoice = 'invoice';
export const PaymentMethodInvoice = 'invoice';

export type TPaymentMethodCreditCard = 'creditCard';
export const PaymentMethodCreditCard = 'creditCard';

export interface ISameAsDelivery {
  isSameAsDelivery: boolean;
}

export interface IPaymentMethod {
  paymentProvider: TPaymentProvider;
  paymentMethod: TPaymentMethodName;
  paymentSelection: TPaymentSelection;
  amount: TPaymentAmount;
}

export interface IShipmentMethod {
  carrierName: TShipmentCarrierName;
  id: TShipmentId;
  name: TShipmentName;
  price: TShipmentPrice;
  taxRate: TShipmentTaxRate;
  shipmentDeliveryTime: TShipmentShipmentDeliveryTime;
}

export interface ICheckoutRequest {
  customer?: ICustomerProfileIdentity;
  id?: string;
  billingAddress?: IAddressItem;
  shippingAddress?: IAddressItem;
  payment?: IPaymentMethod;
  payments?: Array<IPaymentMethod>;
  shipment?: {
    shipmentSelection: string,
    method: IShipmentMethod,
  };
}

export interface IUsageSavedAddress {
  billingSelectedAddressId: IAddressItem["id"] | null;
  deliverySelectedAddressId: IAddressItem["id"] | null;
}

export interface IAddNewAddressActions {
  isAddNewBilling: boolean;
  isAddNewDelivery: boolean;
}
