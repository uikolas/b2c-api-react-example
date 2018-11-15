import * as React from 'react';
import {ChangeEvent, FormEvent} from "react";
import {TCheckoutPageContext} from "src/shared/components/Pages/CheckoutPage/types";
import {billingNewAddressDefault, deliveryNewAddressDefault} from "src/shared/components/Pages/CheckoutPage/constants";


export const CheckoutPageContext = React.createContext<TCheckoutPageContext>({
  submitHandler: (event: FormEvent<HTMLFormElement>) => {
    throw new Error('submitHandler() not implemented');
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
  isBillingSameAsDelivery: false,
  deliveryNewAddress: {...deliveryNewAddressDefault},
  billingNewAddress: {...billingNewAddressDefault},
  addressesCollection: null,
  countriesCollection: null,
  selections: {delivery: null, billing: null},
  isAddressesFulfilled: false,
  extraAddressesOptions: {delivery: null, billing: null},
  isUserLoggedIn: false,
});
