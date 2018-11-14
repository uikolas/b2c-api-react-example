import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "./styles";
import {
  IAddNewAddressActions,
  IBillingAddress,
  ICheckoutAddress,
  ISameAsDelivery,
  IShippingAddress,
  IUsageSavedAddress
} from "src/shared/interfaces/checkout/index";
import {TCheckoutPageContext} from "src/shared/components/Pages/CheckoutPage/types";
import {IFormField, IRadioItem} from "src/shared/components/UI/SprykerForm/types";
import {ICountries} from "src/shared/reducers/Common/Init";
import {IAddressItem} from "src/shared/interfaces/addresses/index";

// TODO: fix extends
export interface ICheckoutFormsProps extends WithStyles<typeof formStyles>,
                                             IExtraAddressesOptionsDataFormSettings,
                                             IAddNewAddressActions {
  shippingAddress: IShippingAddress;
  billingAddress: IBillingAddress;
  addressesCollection: IAddressItem[] | null;
  selectedAddresses: IUsageSavedAddress | null;
}

export interface IAddressDataFormSettings {
  addressData: ICheckoutAddress;
}

// Base handlers for checkout's page forms
export interface IBaseCheckoutFormHandler {
  submitHandler: TCheckoutPageContext["submitHandler"];
  inputChangeHandler: TCheckoutPageContext["inputChangeHandler"];
}

// Param to create address forms
export interface IAddressParamsFormSettings extends IBaseCheckoutFormHandler,
                                                    IAddressDataFormSettings {
  listFieldNameToChangeHandler?: {
    [key: string]: IFormField["onChangeOwnHandler"]
  };
}

export interface ISameAsDeliveryDataFormSettings {
  sameAsDeliveryData: ISameAsDelivery;
}

// Param to create SameAsDelivery form
export interface ISameAsDeliveryParamsFormSettings extends IBaseCheckoutFormHandler,
                                                           ISameAsDeliveryDataFormSettings {
  inputChangeHandler: TCheckoutPageContext["billingSameAsDeliveryHandler"];
}

export interface ISavedAddressDataFormSettings {
  addressesCollection: ICheckoutFormsProps["addressesCollection"];
}

// Param to create saved addresses form
export interface ISavedAddressParamsFormSettings extends IBaseCheckoutFormHandler,
                                                         ISavedAddressDataFormSettings {

  // TODO: handler from Context
  selectedAddressId: IAddressItem["id"] | null;
  extraAddressesOptions: Array<IRadioItem> | null;
}

export interface IExtraAddressesOptions {
  delivery: Array<IRadioItem> | null;
  billing: Array<IRadioItem> | null;
}

export interface IExtraAddressesOptionsDataFormSettings {
  extraAddressesOptions: IExtraAddressesOptions | null;
}

export type TAddressType = 'delivery' | 'billing';
