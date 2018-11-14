import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {
  ICheckoutFormsProps,
  IExtraAddressesOptions,
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {ICheckoutAddress} from "src/shared/interfaces/checkout/index";
import {IDeliverySelection} from "src/shared/components/Pages/CheckoutPage/types";

export interface IDeliveryFormProps extends WithStyles<typeof formStyles> {
  addressesCollection: ICheckoutFormsProps["addressesCollection"];
  addressData: ICheckoutAddress;
  selections: IDeliverySelection;
  extraAddressesOptions: IExtraAddressesOptions["delivery"];
  isAddressesLoading: boolean;
}
