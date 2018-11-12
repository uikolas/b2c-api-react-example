import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {IAddressFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";

export interface IBillingFormSettings extends IAddressFormSettings {
}

export interface IBillingFormProps extends WithStyles<typeof formStyles>, IBillingFormSettings {

}
