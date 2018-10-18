import {TAccessToken} from "../login/index";

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
export type TAcceptedTerms = string;

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

export interface ICustomerProfile {
  salutation: TCustomerSalutation;
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  email: TCustomerEmail;
  newPassword: TCustomerPassword;
  oldPassword: TCustomerPassword;
  confirmPassword: TCustomerPassword;
}

export interface ICustomerDataParsed {
  id: TCustomerId;
  salutation: TCustomerSalutation;
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  email: TCustomerEmail;
  createdAt: TCustomerTime;
  updatedAt: TCustomerTime;
  gender: TCustomerGender | null;
  dateOfBirth: TCustomerDateOfBirth | null;

  [propName: string]: string | number | null;
}

export interface ICustomerLoginData {
  password: TCustomerPassword;
  username: TCustomerUsername;
}

export interface ICustomerRegisterData {
  acceptedTerms: TAcceptedTerms;
  email: TCustomerEmail;
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  password: TCustomerPassword;
  passwordConfirmation: TCustomerPassword;
  salutation: TCustomerSalutation;
}

export interface ILoginDataToLocalStorage {
  email: TCustomerUsername | TCustomerEmail | null;
}

export interface ICustomerLoginDataParsed {
  accessToken: TAccessToken;
  expiresIn: number;
  refreshToken: TAccessToken;
  tokenType: string;
}
