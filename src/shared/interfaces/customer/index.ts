export type TCustomerSalutation = string;
export type TCustomerFirstName = string;
export type TCustomerLastName = string;
export type TCustomerEmail = string;
export type TCustomerPassword = string;
export type TCustomerUsername = string;

export type TCustomerInputValue = TCustomerFirstName
  | TCustomerLastName
  | TCustomerEmail
  | TCustomerPassword
  | TCustomerSalutation
  | TCustomerUsername;

export type TSalutationVariant = {
  value: string,
  label: string,
};

export interface ICustomerDataProfile {
  salutation: TCustomerSalutation;
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  email: TCustomerEmail;
}

export interface ICustomerChangePassword {
  newPassword: TCustomerPassword;
  oldPassword: TCustomerPassword;
  confirmPassword: TCustomerPassword;
}
