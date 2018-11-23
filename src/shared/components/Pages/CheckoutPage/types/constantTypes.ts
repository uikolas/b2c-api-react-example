import {IRadioItem} from "src/shared/components/UI/SprykerForm/types";
import {IMenuItemSelect} from "src/shared/components/UI/SprykerSelect/types";
import {IPaymentMethod, IShipmentMethod} from "src/shared/interfaces/checkout/index";
import {IBillingSelectionState, IDeliverySelectionState} from "src/shared/components/Pages/CheckoutPage/types/index";
import {IAddressItem} from "src/shared/interfaces/addresses/index";

export interface ICheckoutInputsFormNames {
  billing: string;
  delivery: string;
  invoice: string;
  creditCard: string;
}

export interface ICheckoutPaymentMethodsNames {
  invoice: string;
  creditCard: string;
}

export interface IPaymentMethodGroupItem extends IRadioItem {}

export interface IShipmentMethodsGrouped {
  [key: string]: Array<IShipmentMethod>;
}

export interface IPaymentMethodsGrouped {
  [key: string]: Array<IPaymentMethod>;
}

export type TPaymentProvidersCollection = Array<IMenuItemSelect>;

export interface ICheckoutSelectionInputs {
  isAddNewDeliveryValue: string;
  isAddNewBillingValue: string;
  isSameAsDeliveryValue: string;
}

export interface ICheckoutPanelsSettings {
  isFirstPanelDisabled: boolean;
  isSecondPanelDisabled: boolean;
  isThirdPanelDisabled: boolean;
  isFourthPanelDisabled: boolean;
}

// Can be moved

export type TAddressType = 'delivery' | 'billing';

export interface IExtraAddressesOptions {
  delivery: Array<IRadioItem> | null;
  billing: Array<IRadioItem> | null;
}

export interface IAddressesSelections {
  delivery: IDeliverySelectionState;
  billing: IBillingSelectionState;
}

export interface ICurrentValuesInSelections {
  delivery: ICheckoutSelectionInputs["isAddNewDeliveryValue"] | IAddressItem["id"] | null;
  billing: ICheckoutSelectionInputs["isAddNewBillingValue"]
    | ICheckoutSelectionInputs["isSameAsDeliveryValue"]
    | IAddressItem["id"]
    | null;
}
