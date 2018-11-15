import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "./styles";
import {
  ISameAsDelivery,
} from "src/shared/interfaces/checkout/index";
import { IAddressItem } from "src/shared/interfaces/addresses";
import {TCheckoutPageContext} from "src/shared/components/Pages/CheckoutPage/types";
import {IFormField} from "src/shared/components/UI/SprykerForm/types";


export interface ICheckoutFormsProps extends WithStyles<typeof formStyles> {
  shippingAddress: IAddressItem;
  billingAddress: IAddressItem;
}

export interface IAddressDataFormSettings {
  addressData: IAddressItem;
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
