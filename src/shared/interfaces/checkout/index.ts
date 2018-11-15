import {
  TCustomerFirstName,
  TCustomerLastName,
  TCustomerSalutation
} from "src/shared/interfaces/customer/index";
import {
  IAddressItem,
  TAddress,
  TAddressCity,
  TAddressCompany,
  TAddressCountry,
  TAddressPhone,
  TAddressZipCode,
  TIso2Code
} from "src/shared/interfaces/addresses/index";

export interface ICheckoutAddress {
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  salutation: TCustomerSalutation;
  address1: TAddress;
  address2: TAddress;
  address3?: TAddress;
  zipCode: TAddressZipCode;
  city: TAddressCity;
  country: TAddressCountry;
  company?: TAddressCompany;
  phone?: TAddressPhone;
  iso2Code: TIso2Code;
}

export interface IDeliveryAddress extends ICheckoutAddress {
  [key: string]: string;
}

export interface IBillingAddress extends ICheckoutAddress {
  [key: string]: string;
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
