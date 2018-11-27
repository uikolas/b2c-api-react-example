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
export interface IAddressCountryComposed {
  id_country: number;
  iso2_code: string;
  iso3_code: string;
  name: string;
  postal_code_mandatory: boolean;
  postal_code_regex: string;
  regions: object;
}

interface IAbstractAddressItem {
  id?: string;
  salutation: TCustomerSalutation;
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  address1: TAddress;
  address2: TAddress;
  address3: TAddress;
  zipCode: TAddressZipCode;
  city: TAddressCity;
  company?: TAddressCompany;
  phone?: TAddressPhone;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
  iso2Code?: TIso2Code;
}

export interface IAddressItem extends IAbstractAddressItem {
  country: TAddressCountry;
}

export interface IAddressItemCollection extends IAbstractAddressItem {
  country: IAddressCountryComposed;
}
