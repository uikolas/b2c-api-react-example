import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {
  ICheckoutFormsProps,
  IExtraAddressesOptions,
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {IAddressItem} from "src/shared/interfaces/addresses";
import {IBillingSelection} from "src/shared/components/Pages/CheckoutPage/types";


export interface IBillingFormProps extends WithStyles<typeof formStyles> {
  addressesCollection: ICheckoutFormsProps["addressesCollection"];
  addressData: IAddressItem ;
  selections: IBillingSelection;
  extraAddressesOptions: IExtraAddressesOptions["billing"];
  isAddressesFulfilled: boolean;
  isUserLoggedIn: boolean;
}
