
import {
  TCustomerEmail,
  TCustomerFirstName,
  TCustomerLastName,
  TCustomerPassword,
  TCustomerSalutation,
  TCustomerUsername
} from "src/shared/interfaces/customer/index";
import {
  TAddress,
  TAddressCity,
  TAddressCompany,
  TAddressCountry,
  TAddressPhone,
  TAddressZipCode,
  TIso2Code
} from "src/shared/interfaces/addresses/index";

export type TFormInputValue = TCustomerFirstName
  | TCustomerLastName
  | TCustomerSalutation
  | TCustomerEmail
  | TCustomerPassword
  | TCustomerUsername
  | TAddress
  | TAddressCity
  | TAddressCompany
  | TAddressCountry
  | TAddressPhone
  | TAddressZipCode
  | TIso2Code
  ;
