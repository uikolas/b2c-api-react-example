import * as React from 'react';
import {ChangeEvent, FormEvent} from "react";
import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {styles} from "./styles";
import {ICartItem} from "src/shared/reducers/Common/Cart";
import {TCustomerReference} from "src/shared/interfaces/customer/index";
import {ICheckoutAddress, ISameAsDelivery} from "src/shared/interfaces/checkout/index";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {TFormInputValue} from "src/shared/components/UI/SprykerForm/types";
import {ICountries} from "src/shared/reducers/Common/Init";

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
  isCartLoading: boolean;
  getAddressesList: (customerRef: TCustomerReference) => void;
  customerReference: TCustomerReference | null;
  currentAddress: IAddressItem | null;
  addressesCollection: IAddressItem[] | null;
  isAddressesLoading: boolean;
  isAddressesFulfilled: boolean;

  isAppStateLoading: boolean;
  countriesCollection: ICountries[];
}

export interface ICheckoutPageState {
  isBillingSameAsDelivery: boolean;
}

// All possibles names of input
export interface ICheckoutFormInputs extends ICheckoutAddress,
                                             ISameAsDelivery {
}

export interface ICheckoutFieldInput {
  name: (keyof ICheckoutFormInputs);
  value: TFormInputValue;
}

// Type for Context Provider of the Checkout Page
export type TCheckoutPageContext = {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  billingSameAsDeliveryHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isBillingSameAsDelivery: boolean;
};
