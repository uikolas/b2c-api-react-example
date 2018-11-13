import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {
  IAddressDataFormSettings,
  ISavedAddressDataFormSettings
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";

export interface IDeliveryFormProps extends WithStyles<typeof formStyles>
                                            , IAddressDataFormSettings
                                            , ISavedAddressDataFormSettings {

}
