import {ChangeEvent, FormEvent} from "react";
import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {styles} from "./styles";
import {ICartItem, ICartTotals} from "src/shared/interfaces/cart";
import {TCustomerFirstName, TCustomerLastName, TCustomerSalutation, TCustomerReference} from "src/shared/interfaces/customer";
import {ICheckoutRequest, ISameAsDelivery} from "src/shared/interfaces/checkout";
import {
  IAddNewAddressActions,
  ISameAsDelivery,
  IUsageSavedAddress
} from "src/shared/interfaces/checkout";
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
  totals: ICartTotals;
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
  getCheckoutData: (payload: ICheckoutRequest) => void;
  sendCheckoutData: (payload: ICheckoutRequest) => void;
}

export interface ICheckoutPageState {
  deliverySelection: IDeliverySelection;
  billingSelection: IBillingSelection;
}

export interface IDeliverySelection {
  selectedAddressId: IUsageSavedAddress["deliverySelectedAddressId"];
  isAddNew: IAddNewAddressActions["isAddNewDelivery"];
}

export interface IBillingSelection {
  selectedAddressId: IUsageSavedAddress["billingSelectedAddressId"];
  isAddNew: IAddNewAddressActions["isAddNewBilling"];
  isSameAsDelivery: ISameAsDelivery["isSameAsDelivery"];
}

// All possibles names of input
export interface ICheckoutFormInputs extends IAddressItem,
                                             ISameAsDelivery,
                                             IUsageSavedAddress,
                                             IAddNewAddressActions {

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
