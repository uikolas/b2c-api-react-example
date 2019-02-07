import { IRadioItem } from '@components/UI/SprykerForm/types';
import { IMenuItemSelect } from '@components/UI/SprykerSelect/types';
import { IPaymentMethod, IShipmentMethod } from '@interfaces/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';

export interface ICheckoutFormsNames {
    billing: string;
    delivery: string;
    invoice: string;
    creditCard: string;
    savedDelivery: string;
    sameAsDeliveryForm: string;
    savedBilling: string;
    shipmentMethodBase: string;
    paymentMethod: string;
}

export interface ICheckoutPaymentMethodsNames {
    invoice: string;
    creditCard: string;
}

export interface IPaymentMethodsGrouped {
    [key: string]: IPaymentMethod[];
}

export type TPaymentProvidersCollection = IMenuItemSelect[];

export interface IPaymentMethodGroupItem extends IRadioItem {}

export interface IShipmentMethodsGrouped {
    [key: string]: IShipmentMethod[];
}

export interface ICheckoutSelectionInputs {
    isAddNewDeliveryValue: string;
    isAddNewBillingValue: string;
    isSameAsDeliveryValue: string;
}

// Can be moved
export type TAddressType = 'delivery' | 'billing';

export type TExtraOptionsToSelection = IRadioItem[] | null;

export type TCurrentValueDeliverySelection = ICheckoutSelectionInputs['isAddNewDeliveryValue']
    | IAddressItemCollection['id']
    | null;

export type TCurrentValueBillingSelection = ICheckoutSelectionInputs['isAddNewBillingValue']
    | ICheckoutSelectionInputs['isSameAsDeliveryValue']
    | IAddressItemCollection['id']
    | null;
