import {ChangeEvent, FormEvent} from "react";
import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {styles} from "./styles";
import {ICartItem, ICartTotals} from "src/shared/interfaces/cart";
import {IBillingAddress, IDeliveryAddress, TAddressInputValue} from "src/shared/interfaces/checkout/index";
import {TCustomerReference} from "src/shared/interfaces/customer/index";
import {
  IAddNewAddressActions,
  ICheckoutAddress,
  ISameAsDelivery,
  IUsageSavedAddress
} from "src/shared/interfaces/checkout/index";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {TFormInputValue} from "src/shared/components/UI/SprykerForm/types";
import {ICountries} from "src/shared/reducers/Common/Init";
import {
  IAddressesSelections, ICurrentValuesInSelections,
  IExtraAddressesOptions
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";

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
  isAddressesCollectionExist: boolean;
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
  deliverySelection: IDeliverySelection;
  billingSelection: IBillingSelection;
  deliveryNewAddress: IDeliveryAddress;
  billingNewAddress: IBillingAddress;
  stepsCompletion: ICheckoutStepsCompletion;
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

export interface ICheckoutStepsCompletion {
  first: boolean;
  second: boolean;
  third: boolean;
  fourth: boolean;
}

// Type for Context Provider of the Checkout Page
export type TCheckoutPageContext = {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  selectionsChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  handleDeliveryInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  handleBillingInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  isBillingSameAsDelivery: boolean;
  deliveryNewAddress: IDeliveryAddress | null;
  billingNewAddress: IBillingAddress | null;
  addressesCollection: IAddressItem[] | null;
  countriesCollection: ICountries[] | null;
  selections: IAddressesSelections | null;
  currentValuesInSelections: ICurrentValuesInSelections;
  isAddressesFulfilled: boolean;
  extraAddressesOptions: IExtraAddressesOptions | null;
  isUserLoggedIn: boolean;
};
