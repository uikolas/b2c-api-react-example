import * as React from 'react';
import {ChangeEvent, FormEvent} from "react";
import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {styles} from "./styles";
import {ICartItem} from "src/shared/reducers/Common/Cart";
import {TCustomerFirstName, TCustomerLastName, TCustomerSalutation} from "src/shared/interfaces/customer/index";
import {IShippingAddress} from "src/shared/interfaces/checkout/index";

export interface ICheckoutPageProps extends WithStyles<typeof styles>, RouteProps {
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isInitiated: boolean;

  products: Array<ICartItem> | null;
  isCartFulfilled: boolean;
  isCartRejected: boolean;
}

export interface ICheckoutPageState {
}

export interface ICheckoutFormInputs extends IShippingAddress {
}

export type TCheckoutFormInputValue = TCustomerFirstName
  | TCustomerLastName
  | TCustomerSalutation;

export interface ICheckoutFieldInput {
  name: (keyof ICheckoutFormInputs);
  value: TCheckoutFormInputValue;
}

export interface ICheckoutPageContext {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
}
