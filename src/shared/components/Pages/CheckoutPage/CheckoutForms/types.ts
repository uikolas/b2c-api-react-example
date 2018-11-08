import { WithStyles } from '@material-ui/core/styles/withStyles';
import {styles} from "./styles";
import {TCustomerFirstName, TCustomerLastName, TCustomerSalutation} from "src/shared/interfaces/customer/index";
import {ChangeEvent, FormEvent} from "react";


export interface ICheckoutFormsProps extends WithStyles<typeof styles> {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  salutation: TCustomerSalutation;
}
