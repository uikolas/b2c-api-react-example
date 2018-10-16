
export interface IAddressItem {
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
