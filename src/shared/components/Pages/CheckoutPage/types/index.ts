import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from '../styles';
import { ICartItem, ICartTotals, TCartId } from '@interfaces/cart';
import { ICustomerDataParsed, TCustomerReference } from '@interfaces/customer';
import {
    IAddNewAddressActions,
    ISameAsDelivery,
    IUsageSavedAddress,
    ICheckoutRequest,
    IShipmentMethod,
    IPaymentMethod,
} from '@interfaces/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';
import { TFormInputValue } from '@components/UI/SprykerForm/types';
import { ICountry } from '@interfaces/country';

export interface ICheckoutPageProps extends WithStyles<typeof styles>, RouteProps {
    isAppDataSet: boolean;
    isUserLoggedIn: boolean;
    isCheckoutLoading: boolean;
    isCheckoutRejected: boolean;
    isCheckoutFulfilled: boolean;
    profile: ICustomerDataParsed | null;
    isProductsExists: boolean;
    cartId: TCartId;
    isAddressesCollectionExist: boolean;
    customerReference: TCustomerReference | null;
    addressesCollection: IAddressItemCollection[] | null;
    orderId: string;
    anonymId: string;
    isAppStateLoading: boolean;
    countriesCollection: ICountry[];
    shipmentMethods: IShipmentMethod[] | null;
    paymentMethods: IPaymentMethod[] | null;
    getCheckoutData: (payload: ICheckoutRequest, anonymId: string) => void;
    sendCheckoutData: (payload: ICheckoutRequest, anonymId: string) => void;
    getCustomerData: (customerReference: TCustomerReference) => void;
    stepsCompletion: ICheckoutStepsCompletionState;
    deliverySelection: IDeliverySelectionState;
    billingSelection: IBillingSelectionState;
    deliveryNewAddress: IDeliveryAddressState;
    billingNewAddress: IBillingAddressState;
    shipmentMethod: IShipmentMethod['id'] | null;
    paymentMethod: IPaymentMethod['paymentMethodName'] | null;
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

export interface IDeliveryAddressState extends ICheckoutAddressState {
}

export interface IBillingAddressState extends ICheckoutAddressState {
}

export interface IConfigInputState {
    value: TFormInputValue;
    isError: boolean;
}

export interface IDeliverySelectionState {
    selectedAddressId: IUsageSavedAddress['deliverySelectedAddressId'];
    isAddNew: IAddNewAddressActions['isAddNewDelivery'];
}

export interface IBillingSelectionState {
    selectedAddressId: IUsageSavedAddress['billingSelectedAddressId'];
    isAddNew: IAddNewAddressActions['isAddNewBilling'];
    isSameAsDelivery: ISameAsDelivery['isSameAsDelivery'];
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
