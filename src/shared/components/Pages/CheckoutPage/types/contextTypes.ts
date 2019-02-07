import {
    IBillingAddressState,
    IBillingSelectionState,
    ICheckoutCreditCardState,
    ICheckoutInvoiceState,
    IDeliveryAddressState,
    IDeliverySelectionState
} from 'src/shared/components/Pages/CheckoutPage/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { IPaymentMethod, IShipmentMethod } from '@interfaces/checkout';
import {
    TCurrentValueBillingSelection,
    TCurrentValueDeliverySelection,
    TExtraOptionsToSelection
} from 'src/shared/components/Pages/CheckoutPage/types/constantTypes';
import { BlurEvent, FormEvent, InputChangeEvent } from '@interfaces/common/react';
import { ICountry } from '@interfaces/country';

// Type for Context Provider of the Checkout Page
export type TCheckoutPageContext = {
    submitHandler: (event: FormEvent) => void;
    onBlurHandler: (formName: string) => (event: BlurEvent) => void;
    selectionsChangeHandler: (event: InputChangeEvent) => void;
    handleDeliveryInputs: (event: InputChangeEvent) => void;
    handleBillingInputs: (event: InputChangeEvent) => void;
    handleInvoiceInputs: (event: InputChangeEvent) => void;
    handleCreditCardInputs: (event: InputChangeEvent) => void;
    isBillingSameAsDelivery: boolean;
    deliveryNewAddress: IDeliveryAddressState;
    billingNewAddress: IBillingAddressState;
    addressesCollection: IAddressItemCollection[] | null;
    countriesCollection: ICountry[] | null;
    deliverySelections: IDeliverySelectionState | null;
    billingSelections: IBillingSelectionState | null;
    currentValueDeliverySelection: TCurrentValueDeliverySelection;
    currentValueBillingSelection: TCurrentValueBillingSelection;
    isCheckoutFulfilled: boolean;
    extraOptionsDeliverySelection: TExtraOptionsToSelection;
    extraOptionsBillingSelection: TExtraOptionsToSelection;
    isUserLoggedIn: boolean;
    shipmentMethods: IShipmentMethod[] | null;
    currentValueShipmentMethod: IShipmentMethod['id'] | null;
    paymentMethods: IPaymentMethod[] | null;
    currentValuePaymentMethod: IPaymentMethod['paymentMethodName'] | null;
    paymentCreditCardDataInputs: ICheckoutCreditCardState;
    paymentInvoiceDataInputs: ICheckoutInvoiceState;
};
