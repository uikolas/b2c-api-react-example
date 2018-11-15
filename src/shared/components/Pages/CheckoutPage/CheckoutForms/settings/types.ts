import {
  ICheckoutFormsProps,
  IExtraAddressesOptions
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {ISameAsDelivery} from "src/shared/interfaces/checkout";
import {IAddressItem} from "src/shared/interfaces/addresses";
import {IFormField} from "src/shared/components/UI/SprykerForm/types";
import {
  IBillingSelection,
  IDeliverySelection,
  TCheckoutPageContext
} from "src/shared/components/Pages/CheckoutPage/types";


// Base handlers for checkout's page forms
export interface IBaseCheckoutFormHandler {
  submitHandler: TCheckoutPageContext["submitHandler"];
  inputChangeHandler: TCheckoutPageContext["inputChangeHandler"];
}

// Param to create address forms
export interface IAddressParams extends IBaseCheckoutFormHandler {
  addressData: IAddressItem;
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
  addressesCollection: ICheckoutFormsProps["addressesCollection"];
  selections: IDeliverySelection | IBillingSelection;
  extraAddressesOptions: IExtraAddressesOptions["delivery"] | IExtraAddressesOptions["billing"] | null;
}

export interface IDeliveryAddressesParams extends IAddressesParams {
  selections: IDeliverySelection;
}

export interface IBillingAddressesParams extends IAddressesParams {
  selections: IBillingSelection;
}
