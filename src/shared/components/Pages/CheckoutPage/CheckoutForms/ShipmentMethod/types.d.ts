import { WithStyles } from '@material-ui/core/styles/withStyles';
import { formStyles } from '@components/Pages/CheckoutPage/CheckoutForms/styles';
import { IShipmentMethod } from '@interfaces/checkout';
import { ICheckoutPageState } from '@components/Pages/CheckoutPage/types';

export interface IShipmentMethodProps extends WithStyles<typeof formStyles> {
    shipmentMethod: IShipmentMethod['id'] | null;
    shipmentMethods: IShipmentMethod[] | null;
    mutateShipmentMethod: (value: string) => void;
}
