import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {styles} from "./styles";
import {ICartItem} from "src/shared/reducers/Common/Cart";
import {TCustomerFirstName, TCustomerLastName, TCustomerSalutation} from "src/shared/interfaces/customer/index";

export interface ICheckoutPageProps extends WithStyles<typeof styles>, RouteProps {
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isInitiated: boolean;

  products: Array<ICartItem> | null;
  isCartFulfilled: boolean;
  isCartRejected: boolean;
}

export interface ICheckoutPageState {

}

export interface ICheckoutDeliveryInputs {
  salutation: TCustomerSalutation;
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
}

export interface ICheckoutFormInput extends ICheckoutDeliveryInputs {
}

export type TCheckoutFormInputValue = TCustomerFirstName
  | TCustomerLastName
  | TCustomerSalutation;

export interface ICheckoutFieldInput {
  name: (keyof ICheckoutFormInput);
  value: TCheckoutFormInputValue;
}
