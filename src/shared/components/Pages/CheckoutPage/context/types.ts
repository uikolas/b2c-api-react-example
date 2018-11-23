import * as React from 'react';
import {ChangeEvent, FormEvent} from "react";
// Type for Context Provider of the Checkout Page
import {
  IBillingAddressState,
  ICheckoutCreditCardState,
  ICheckoutInvoiceState,
  IDeliveryAddressState
} from "src/shared/components/Pages/CheckoutPage/types/index";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {ICountries} from "src/shared/reducers/Common/Init";
import {
  IAddressesSelections,
  ICurrentValuesInSelections,
  IExtraAddressesOptions
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {IPaymentMethod, IShipmentMethod} from "src/shared/interfaces/checkout/index";

export type TCheckoutPageContext = {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  onBlurHandler: (formName: string) => React.EventHandler<any>;
  selectionsChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  handleDeliveryInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  handleBillingInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  handleInvoiceInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  handleCreditCardInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  isBillingSameAsDelivery: boolean;
  deliveryNewAddress: IDeliveryAddressState;
  billingNewAddress: IBillingAddressState;
  addressesCollection: IAddressItem[] | null;
  countriesCollection: ICountries[] | null;
  selections: IAddressesSelections | null;
  currentValuesInSelections: ICurrentValuesInSelections;
  isAddressesFulfilled: boolean;
  extraAddressesOptions: IExtraAddressesOptions | null;
  isUserLoggedIn: boolean;
  shipmentMethods: Array<IShipmentMethod> | null;
  currentValueShipmentMethod: IShipmentMethod["id"] | null;
  paymentMethods: Array<IPaymentMethod> | null;
  currentValuePaymentMethod: IPaymentMethod["paymentMethod"] | null;
  paymentCreditCardDataInputs: ICheckoutCreditCardState;
  paymentInvoiceDataInputs: ICheckoutInvoiceState;
};
