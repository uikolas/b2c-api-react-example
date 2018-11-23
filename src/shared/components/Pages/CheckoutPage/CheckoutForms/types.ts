import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "./styles";
<<<<<<< HEAD
import {
  IBillingSelection,
  IDeliverySelection,
  TIsAddNewBillingValue,
  TIsAddNewDeliveryValue,
  TIsSameAsDeliveryValue,
} from "src/shared/components/Pages/CheckoutPage/types";
import {IRadioItem} from "src/shared/components/UI/SprykerForm/types";
import {IAddressItem} from "src/shared/interfaces/addresses";
=======
>>>>>>> epic/checkout/dev


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
