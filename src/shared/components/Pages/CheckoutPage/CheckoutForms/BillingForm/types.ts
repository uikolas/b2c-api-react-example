import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {
  IAddressDataFormSettings,
  IExtraAddressesOptions,
  ISavedAddressDataFormSettings
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {IAddNewAddressActions, IUsageSavedAddress} from "src/shared/interfaces/checkout/index";


export interface IBillingFormProps extends WithStyles<typeof formStyles>,
                                           IAddressDataFormSettings,
                                           ISavedAddressDataFormSettings {
  selectedAddressId: IUsageSavedAddress["billingSelectedAddressId"];
  isAddNewBilling: IAddNewAddressActions["isAddNewBilling"];
  extraAddressesOptions: IExtraAddressesOptions["billing"];
}
