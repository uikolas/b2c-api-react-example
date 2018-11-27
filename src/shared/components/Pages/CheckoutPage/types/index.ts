import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {styles} from "../styles";
import {ICartItem, ICartTotals} from "src/shared/interfaces/cart";
import {TCustomerReference} from "src/shared/interfaces/customer";
import {
  IAddNewAddressActions,
  ISameAsDelivery,
  IUsageSavedAddress,
  ICheckoutRequest,
  IShipmentMethod,
  IPaymentMethod,
} from "src/shared/interfaces/checkout";
import {IAddressItemCollection} from "src/shared/interfaces/addresses";
import {TFormInputValue} from "src/shared/components/UI/SprykerForm/types";
import {ICountries} from "src/shared/reducers/Common/Init";

export interface ICheckoutPageProps extends WithStyles<typeof styles>, RouteProps {
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  isCheckoutLoading: boolean;
  isCheckoutRejected: boolean;
  isCheckoutFulfilled: boolean;

  products: Array<ICartItem> | null;
  isProductsExists: boolean;
  totals: ICartTotals;
  isCartFulfilled: boolean;
  isCartRejected: boolean;
  isCartLoading: boolean;
  isAddressesCollectionExist: boolean;
  customerReference: TCustomerReference | null;
  addressesCollection: IAddressItemCollection[] | null;
  isAppStateLoading: boolean;
  countriesCollection: ICountries[];
  shipmentMethods: Array<IShipmentMethod> | null;
  paymentMethods: Array<IPaymentMethod> | null;
  getCheckoutData: (payload: ICheckoutRequest) => void;
  sendCheckoutData: (payload: ICheckoutRequest) => void;
}

export interface ICheckoutPageState {
  deliverySelection: IDeliverySelectionState;
  billingSelection: IBillingSelectionState;
  deliveryNewAddress: IDeliveryAddressState;
  billingNewAddress: IBillingAddressState;
  stepsCompletion: ICheckoutStepsCompletionState;
  shipmentMethod: IShipmentMethod["id"] | null;
  paymentMethod: IPaymentMethod["paymentMethod"] | null;
  paymentCreditCardData: ICheckoutCreditCardState;
  paymentInvoiceData: ICheckoutInvoiceState;
}

export interface ICheckoutAddressState {
  firstName: IConfigInputState;
  lastName: IConfigInputState;
  salutation: IConfigInputState;
  address1: IConfigInputState;
  address2: IConfigInputState;
  address3: IConfigInputState;
  zipCode: IConfigInputState;
  city: IConfigInputState;
  country: IConfigInputState;
  company: IConfigInputState;
  phone: IConfigInputState;

  [key: string]: IConfigInputState;
}

export interface IDeliveryAddressState extends ICheckoutAddressState {}

export interface IBillingAddressState extends ICheckoutAddressState {}

export interface IConfigInputState {
  value: TFormInputValue;
  isError: boolean;
}

export interface IDeliverySelectionState {
  selectedAddressId: IUsageSavedAddress["deliverySelectedAddressId"];
  isAddNew: IAddNewAddressActions["isAddNewDelivery"];
}

export interface IBillingSelectionState {
  selectedAddressId: IUsageSavedAddress["billingSelectedAddressId"];
  isAddNew: IAddNewAddressActions["isAddNewBilling"];
  isSameAsDelivery: ISameAsDelivery["isSameAsDelivery"];
}

export interface ICheckoutStepsCompletionState {
  first: boolean;
  second: boolean;
  third: boolean;
  fourth: boolean;
}

export interface ICheckoutCreditCardState {
  paymentProvider: IConfigInputState;
  cardNumber: IConfigInputState;
  cardName: IConfigInputState;
  cardExpiryMonth: IConfigInputState;
  cardExpiryYear: IConfigInputState;
  cardCVC: IConfigInputState;

  [key: string]: IConfigInputState;
}

export interface ICheckoutInvoiceState {
  dateOfBirth: IConfigInputState;

  [key: string]: IConfigInputState;
}
