import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "./styles";
import {
  IBillingSelectionState,
  IDeliverySelectionState,
} from "src/shared/components/Pages/CheckoutPage/types/index";
import {IRadioItem} from "src/shared/components/UI/SprykerForm/types";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {ICheckoutSelectionInputs} from "src/shared/components/Pages/CheckoutPage/types/constantTypes";


export interface ICheckoutFormsProps extends WithStyles<typeof formStyles> {
  panels: {
    first: IPanelData;
    second: IPanelData;
    third: IPanelData;
    fourth: IPanelData;
  };
}

export interface IPanelData {
  title: string;
  isDisabled: boolean;
}

export type TAddressType = 'delivery' | 'billing';

export interface IExtraAddressesOptions {
  delivery: Array<IRadioItem> | null;
  billing: Array<IRadioItem> | null;
}

export interface IAddressesSelections {
  delivery: IDeliverySelectionState;
  billing: IBillingSelectionState;
}

export interface ICurrentValuesInSelections {
  delivery: ICheckoutSelectionInputs["isAddNewDeliveryValue"] | IAddressItem["id"] | null;
  billing: ICheckoutSelectionInputs["isAddNewBillingValue"]
           | ICheckoutSelectionInputs["isSameAsDeliveryValue"]
           | IAddressItem["id"]
           | null;
}

