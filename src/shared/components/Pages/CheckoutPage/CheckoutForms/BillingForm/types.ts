import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {IAddressDataFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";


export interface IBillingFormProps extends WithStyles<typeof formStyles>, IAddressDataFormSettings {

}
