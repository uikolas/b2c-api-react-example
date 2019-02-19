import {
    IBillingObjectConfigInputStable,
    IConfigInputStable,
    ICreditCardObjectConfigInputStable,
    IDeliveryObjectConfigInputStable,
    IInvoiceObjectConfigInputStable
} from 'src/chared/constants/checkout/types';
import { TFormInputValue } from '@components/components/UI/SprykerForm/types';
import {
    IBillingAddressState,
    ICheckoutCreditCardState,
    ICheckoutInvoiceState,
    IDeliveryAddressState
} from '@interfaces/checkout';

export interface IParamInputValidity {
    value: TFormInputValue;
    fieldConfig: IConfigInputStable;
}

export interface IParamFormValidity {
    form: IDeliveryAddressState | IBillingAddressState | ICheckoutInvoiceState | ICheckoutCreditCardState;
    fieldsConfig: IDeliveryObjectConfigInputStable
        | IBillingObjectConfigInputStable
        | IInvoiceObjectConfigInputStable
        | ICreditCardObjectConfigInputStable;
}
