import * as React from 'react';
import {ChangeEvent} from "react";
import {
  IPaymentMethod,
  ISameAsDelivery,
  IShipmentMethod
} from "src/shared/interfaces/checkout/index";
import {IFormField} from "src/shared/components/UI/SprykerForm/types";
import {
  ICheckoutAddressState,
  ICheckoutCreditCardState,
  ICheckoutInvoiceState,
} from "src/shared/components/Pages/CheckoutPage/types/index";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {ICountries} from "src/shared/reducers/Common/Init";
import {TCheckoutPageContext} from "src/shared/components/Pages/CheckoutPage/types/contextTypes";
import {
  ICreditCardObjectConfigInputStable,
  IInvoiceObjectConfigInputStable,
  IObjectConfigInputStable
} from "src/shared/components/Pages/CheckoutPage/types/inputsConfigTypes";
import {
  ICurrentValuesInSelections,
  IExtraAddressesOptions,
  IPaymentMethodGroupItem,
  TPaymentProvidersCollection
} from "src/shared/components/Pages/CheckoutPage/types/constantTypes";


// Base handlers for checkout's page forms
export interface IBaseCheckoutFormHandler {
  submitHandler: TCheckoutPageContext["submitHandler"];
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  onBlurHandler?: React.EventHandler<any>;
}

// Param to create address forms
export interface IAddressParams extends IBaseCheckoutFormHandler {
  inputsData: ICheckoutAddressState;
  inputsConfig: IObjectConfigInputStable;
  countriesCollection: ICountries[] | null;
  listFieldNameToChangeHandler?: {
    [key: string]: IFormField["onChangeOwnHandler"]
  };
}

// Param to create SameAsDelivery form
export interface ISameAsDeliveryParams extends IBaseCheckoutFormHandler {
  isSameAsDelivery: ISameAsDelivery["isSameAsDelivery"];
}

// Param to create saved addresses form
export interface IAddressesParams extends IBaseCheckoutFormHandler {
  addressesCollection: IAddressItem[] | null;
  extraAddressesOptions: IExtraAddressesOptions["delivery"] | IExtraAddressesOptions["billing"] | null;
  currentValueInSelection: ICurrentValuesInSelections["delivery"] | ICurrentValuesInSelections["billing"];
}

export interface IDeliveryAddressesParams extends IAddressesParams {
}

export interface IBillingAddressesParams extends IAddressesParams {
}

// Param to create shipping methods form
export interface IShippingMethodsParams extends IBaseCheckoutFormHandler {
  shipmentMethods: Array<IShipmentMethod> | null;
  currentValueShipmentMethod: IShipmentMethod["id"] | null;
  carrierName: IShipmentMethod["carrierName"];
  shipmentCarrierNameToIcon: {
    [key: string]: JSX.Element;
  };
}

export interface IPaymentProviderToIcon {
  [key: string]: JSX.Element;
}

// Param to create payment methods form
export interface IPaymentMethodsParams extends IBaseCheckoutFormHandler {
  paymentMethodGroupItems: Array<IPaymentMethodGroupItem> | null;
  currentValuePaymentMethod: IPaymentMethod["paymentMethod"] | null;
}

// Param to create invoice payment form
export interface IPaymentInvoiceParams extends IBaseCheckoutFormHandler {
  inputsData: ICheckoutInvoiceState;
  inputsConfig: IInvoiceObjectConfigInputStable;
}

// Param to create creditCard payment form
export interface IPaymentCreditCardParams extends IBaseCheckoutFormHandler {
  inputsData: ICheckoutCreditCardState;
  inputsConfig: ICreditCardObjectConfigInputStable;
  providersCollection: TPaymentProvidersCollection;
}
