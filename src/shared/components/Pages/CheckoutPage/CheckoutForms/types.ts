import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "./styles";
import {
  IBillingSelection,
  IDeliverySelection, TIsAddNewBillingValue, TIsAddNewDeliveryValue, TIsSameAsDeliveryValue,
} from "src/shared/components/Pages/CheckoutPage/types";
import {IRadioItem} from "src/shared/components/UI/SprykerForm/types";
import {IAddressItem} from "src/shared/interfaces/addresses/index";


export interface ICheckoutFormsProps extends WithStyles<typeof formStyles> {
  panels: {
    first: IPanelData;
    second: IPanelData;
    third: IPanelData;
    fourth: IPanelData;
  };
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

export interface ICurrentValuesInSelections {
  delivery: TIsAddNewDeliveryValue | IAddressItem["id"] | null;
  billing: TIsAddNewBillingValue | TIsSameAsDeliveryValue | IAddressItem["id"] | null;
}

export interface IPanelData {
  title: string;
  isDisabled: boolean;
}
