export type TAddress = string;
export type TAddressZipCode = string;
export type TAddressCity = string;
export type TAddressCountry = string;
export type TAddressCompany = string;
export type TAddressPhone = string;
export type TIso2Code = string;


export interface IAddressItem {
  id?: string;
  salutation: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  address3: string;
  zipCode: string;
  city: string;
  country: string;
  company?: string;
  phone?: string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
  iso2Code?: string;
}
