import {
  TCustomerFirstName,
  TCustomerLastName,
  TCustomerSalutation
} from "src/shared/interfaces/customer/index";

export interface IShippingAddress {
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  salutation: TCustomerSalutation;
}
