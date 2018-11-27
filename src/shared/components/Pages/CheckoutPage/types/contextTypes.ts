import * as React from 'react';
import {ChangeEvent, FormEvent} from "react";
import {
  IBillingAddressState,
  IBillingSelectionState,
  ICheckoutCreditCardState,
  ICheckoutInvoiceState,
  IDeliveryAddressState,
  IDeliverySelectionState
} from "src/shared/components/Pages/CheckoutPage/types";
import {IAddressItemCollection} from "src/shared/interfaces/addresses";
import {ICountries} from "src/shared/reducers/Common/Init";
import {IPaymentMethod, IShipmentMethod} from "src/shared/interfaces/checkout";
import {
  TCurrentValueBillingSelection,
  TCurrentValueDeliverySelection,
  TExtraOptionsToSelection
} from "src/shared/components/Pages/CheckoutPage/types/constantTypes";

// Type for Context Provider of the Checkout Page
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
  addressesCollection: IAddressItemCollection[] | null;
  countriesCollection: ICountries[] | null;
  deliverySelections: IDeliverySelectionState | null;
  billingSelections: IBillingSelectionState | null;
  currentValueDeliverySelection: TCurrentValueDeliverySelection;
  currentValueBillingSelection: TCurrentValueBillingSelection;
  isCheckoutFulfilled: boolean;
  extraOptionsDeliverySelection: TExtraOptionsToSelection;
  extraOptionsBillingSelection: TExtraOptionsToSelection;
  isUserLoggedIn: boolean;
  shipmentMethods: Array<IShipmentMethod> | null;
  currentValueShipmentMethod: IShipmentMethod["id"] | null;
  paymentMethods: Array<IPaymentMethod> | null;
  currentValuePaymentMethod: IPaymentMethod["paymentMethod"] | null;
  paymentCreditCardDataInputs: ICheckoutCreditCardState;
  paymentInvoiceDataInputs: ICheckoutInvoiceState;
};
