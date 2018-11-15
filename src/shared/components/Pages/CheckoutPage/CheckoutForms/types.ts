import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "./styles";
import {
  IBillingSelection,
  IDeliverySelection,
} from "src/shared/components/Pages/CheckoutPage/types";
import {IRadioItem} from "src/shared/components/UI/SprykerForm/types";


export interface ICheckoutFormsProps extends WithStyles<typeof formStyles> {

}

export type TAddressType = 'delivery' | 'billing';

export interface IExtraAddressesOptions {
  delivery: Array<IRadioItem> | null;
  billing: Array<IRadioItem> | null;
}

export interface IAddressesSelections {
  delivery: IDeliverySelection;
  billing: IBillingSelection;
}
