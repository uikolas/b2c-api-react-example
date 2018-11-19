import {ChangeEvent} from "react";
import {
  ICurrentValuesInSelections,
  IExtraAddressesOptions
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {ISameAsDelivery, IShipmentMethod} from "src/shared/interfaces/checkout/index";
import {IFormField} from "src/shared/components/UI/SprykerForm/types";
import {
  ICheckoutAddressState,
  IObjectConfigInputStable,
  TCheckoutPageContext
} from "src/shared/components/Pages/CheckoutPage/types";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {ICountries} from "src/shared/reducers/Common/Init";


// Base handlers for checkout's page forms
export interface IBaseCheckoutFormHandler {
  submitHandler: TCheckoutPageContext["submitHandler"];
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
}

// Param to create address forms
export interface IAddressParams extends IBaseCheckoutFormHandler {
  addressData: ICheckoutAddressState;
  addressInputsConfig: IObjectConfigInputStable;
  countriesCollection: ICountries[] | null;
  listFieldNameToChangeHandler?: {
    [key: string]: IFormField["onChangeOwnHandler"]
  };
}

// Param to create SameAsDelivery form
export interface ISameAsDeliveryParams extends IBaseCheckoutFormHandler {
  isSameAsDelivery: ISameAsDelivery["isSameAsDelivery"];
}

// Param to create saved addresses form
export interface IAddressesParams extends IBaseCheckoutFormHandler {
  addressesCollection: IAddressItem[] | null;
  extraAddressesOptions: IExtraAddressesOptions["delivery"] | IExtraAddressesOptions["billing"] | null;
  currentValueInSelection: ICurrentValuesInSelections["delivery"] | ICurrentValuesInSelections["billing"];
}

export interface IDeliveryAddressesParams extends IAddressesParams {
}

export interface IBillingAddressesParams extends IAddressesParams {
}

// Param to create shipping methods form
export interface IShippingMethodsParams extends IBaseCheckoutFormHandler {
  shipmentMethods: Array<IShipmentMethod> | null;
  currentValueShipmentMethod: IShipmentMethod["id"] | null;
}
