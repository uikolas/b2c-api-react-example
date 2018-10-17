export type TCustomerSalutation = string;
export type TCustomerFirstName = string;
export type TCustomerLastName = string;
export type TCustomerEmail = string;
export type TCustomerPassword = string;
export type TCustomerUsername = string;
export type TCustomerId = string;
export type TCustomerReference = string;
export type TCustomerTime = string;
export type TCustomerDateOfBirth = string;
export type TCustomerGender = string;

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

export interface ICustomerDataParsed {
  id: TCustomerId;
  salutation: TCustomerSalutation;
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  createdAt: TCustomerTime;
  updatedAt: TCustomerTime;
  email: TCustomerEmail;
  gender: TCustomerGender | null;
  dateOfBirth: TCustomerDateOfBirth | null;
}
