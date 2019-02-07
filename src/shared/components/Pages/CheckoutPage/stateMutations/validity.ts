import { ICheckoutPageState } from '@components/Pages/CheckoutPage/types';

export const mutateDeliveryNewAddressValidity = (
    prevState: ICheckoutPageState,
    isFormValid: boolean
): Pick<ICheckoutPageState, 'stepsCompletion'> | null => (
    {
        stepsCompletion: {
            ...prevState.stepsCompletion,
            first: isFormValid,
        }
    }
);

export const mutateBillingNewAddressValidity = (
    prevState: ICheckoutPageState,
    isFormValid: boolean
): Pick<ICheckoutPageState, 'stepsCompletion'> | null => (
    {
        stepsCompletion: {
            ...prevState.stepsCompletion,
            second: isFormValid,
        }
    }
);

export const mutateInvoiceValidity = (
    prevState: ICheckoutPageState,
    isFormValid: boolean
): Pick<ICheckoutPageState, 'stepsCompletion'> | null => (
    {
        stepsCompletion: {
            ...prevState.stepsCompletion,
            fourth: isFormValid,
        }
    }
);

export const mutateCreditCardValidity = (
    prevState: ICheckoutPageState,
    isFormValid: boolean
): Pick<ICheckoutPageState, 'stepsCompletion'> | null => (
    {
        stepsCompletion: {
            ...prevState.stepsCompletion,
            fourth: isFormValid,
        }
    }
);
