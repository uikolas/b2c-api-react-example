import {ChangeEvent, FormEvent} from "react";
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {IShippingAddress} from "src/shared/interfaces/checkout/index";

export interface IDeliveryFormProps extends WithStyles<typeof formStyles> {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  shippingAddress: IShippingAddress;
}
