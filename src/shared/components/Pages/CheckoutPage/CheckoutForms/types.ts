import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "./styles";
import {IBillingAddress, ICheckoutAddress, IShippingAddress} from "src/shared/interfaces/checkout/index";
import {ICheckoutPageContext} from "src/shared/components/Pages/CheckoutPage/types";


export interface ICheckoutFormsProps extends WithStyles<typeof formStyles> {
  shippingAddress: IShippingAddress;
  billingAddress: IBillingAddress;
}

export interface IAddressDataFormSettings {
  addressData: ICheckoutAddress;
}

export interface IAddressParamsFormSettings extends IAddressDataFormSettings {
  submitHandler: ICheckoutPageContext["submitHandler"];
  inputChangeHandler: ICheckoutPageContext["inputChangeHandler"];
}
