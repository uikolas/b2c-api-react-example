import {
  TCustomerFirstName,
  TCustomerLastName,
  TCustomerSalutation,
} from "src/shared/interfaces/customer";

export type TAddress = string;
export type TAddressZipCode = string;
export type TAddressCity = string;
export type TAddressCountry = string;
export type TAddressCompany = string;
export type TAddressPhone = string;
export type TIso2Code = string;


export interface IAddressItem {
  id?: string;
  salutation: TCustomerSalutation;
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  address1: TAddress;
  address2: TAddress;
  address3: TAddress;
  zipCode: TAddressZipCode;
  city: TAddressCity;
  country: TAddressCountry;
  company?: TAddressCompany;
  phone?: TAddressPhone;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
  iso2Code?: TIso2Code;
}
