import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "./styles";
import {ChangeEvent, FormEvent} from "react";
import {IBillingAddress, ICheckoutAddress, IShippingAddress} from "src/shared/interfaces/checkout/index";

interface ICheckoutHandlers {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
}

export interface ICheckoutFormsProps extends WithStyles<typeof formStyles>, ICheckoutHandlers {
  shippingAddress: IShippingAddress;
  billingAddress: IBillingAddress;
}

export interface IAddressFormSettings extends ICheckoutHandlers {
  addressData: ICheckoutAddress;
}
