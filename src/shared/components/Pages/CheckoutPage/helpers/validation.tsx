import {
    billingConfigInputStable,
    creditCardConfigInputStable,
    deliveryConfigInputStable,
    invoiceConfigInputStable
} from 'src/shared/components/Pages/CheckoutPage/constants/inputsConfig';
import { checkFormInputValidity, checkFormValidity } from 'src/shared/components/Pages/CheckoutPage/helpers';
import {
    IBillingAddressState,
    ICheckoutCreditCardState,
    ICheckoutInvoiceState,
    IDeliveryAddressState
} from 'src/shared/components/Pages/CheckoutPage/types';

// Inputs Validation
export const validateDeliveryInput = (key: string, value: string): boolean => (
    checkFormInputValidity({value,fieldConfig: deliveryConfigInputStable[key]})
);

export const validateBillingInput = (key: string, value: string): boolean => (
    checkFormInputValidity({value, fieldConfig: billingConfigInputStable[key]})
);

export const validateInvoiceInput = (key: string, value: string): boolean => (
    checkFormInputValidity({value, fieldConfig: invoiceConfigInputStable[key]})
);

export const validateCreditCardInput = (key: string, value: string): boolean => (
    checkFormInputValidity({value, fieldConfig: creditCardConfigInputStable[key]})
);

// Forms Validation
export const validateBillingNewAddressForm = (formState: IBillingAddressState): boolean => (
    checkFormValidity({form: formState, fieldsConfig: billingConfigInputStable})
);

export const validateDeliveryNewAddressForm = (formState: IDeliveryAddressState): boolean => (
    checkFormValidity({form: formState, fieldsConfig: deliveryConfigInputStable})
);

export const validateInvoiceForm = (formState: ICheckoutInvoiceState): boolean => (
    checkFormValidity({form: formState, fieldsConfig: invoiceConfigInputStable})
);

export const validateCreditCardForm = (formState: ICheckoutCreditCardState): boolean => (
    checkFormValidity({form: formState, fieldsConfig: creditCardConfigInputStable})
);
