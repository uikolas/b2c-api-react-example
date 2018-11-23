import {IRadioItem} from "src/shared/components/UI/SprykerForm/types";
import {IMenuItemSelect} from "src/shared/components/UI/SprykerSelect/types";
import {IPaymentMethod, IShipmentMethod} from "src/shared/interfaces/checkout/index";

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
