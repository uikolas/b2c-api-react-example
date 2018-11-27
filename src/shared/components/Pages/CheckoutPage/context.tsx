import * as React from 'react';
import {ChangeEvent, FormEvent} from "react";
import {TCheckoutPageContext} from "./types/contextTypes";
import {
  billingNewAddressDefault,
  deliveryNewAddressDefault,
  paymentCreditCardDefault,
  paymentInvoiceDefault
} from "src/shared/components/Pages/CheckoutPage/constants/stateDefaults";


export const CheckoutPageContext = React.createContext<TCheckoutPageContext>({
  submitHandler: (event: FormEvent<HTMLFormElement>) => {
    throw new Error('submitHandler() not implemented');
  },
  onBlurHandler: (formName: string) => (event: any): void => {
    throw new Error('onBlurHandler() not implemented');
  },
  selectionsChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    throw new Error('selectionsChangeHandler() not implemented');
  },
  handleDeliveryInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    throw new Error('handleDeliveryInputs() not implemented');
  },
  handleBillingInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    throw new Error('handleBillingInputs() not implemented');
  },
  handleInvoiceInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    throw new Error('handleInvoiceInputs() not implemented');
  },
  handleCreditCardInputs: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    throw new Error('handleCreditCardInputs() not implemented');
  },
  isBillingSameAsDelivery: false,
  deliveryNewAddress: {...deliveryNewAddressDefault},
  billingNewAddress: {...billingNewAddressDefault},
  addressesCollection: null,
  countriesCollection: null,
  deliverySelections: null,
  billingSelections: null,
  currentValueDeliverySelection: null,
  currentValueBillingSelection: null,
  isCheckoutFulfilled: false,
  extraOptionsDeliverySelection: null,
  extraOptionsBillingSelection: null,
  isUserLoggedIn: false,
  shipmentMethods: null,
  currentValueShipmentMethod: null,
  paymentMethods: null,
  currentValuePaymentMethod: null,
  paymentCreditCardDataInputs: {...paymentCreditCardDefault},
  paymentInvoiceDataInputs: {...paymentInvoiceDefault},
});
