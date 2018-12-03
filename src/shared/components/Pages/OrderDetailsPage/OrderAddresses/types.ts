import {WithStyles} from '@material-ui/core/styles/withStyles';
import {orderAddressesStyles} from "src/shared/components/Pages/OrderDetailsPage/OrderAddresses/styles";
import {IAddressItemOrder} from "src/shared/interfaces/addresses/index";


export interface IOrderAddressesProps extends WithStyles<typeof orderAddressesStyles> {
  billingAddress: IAddressItemOrder;
  shippingAddress: IAddressItemOrder;
  billingBlockTitle: string;
  shippingBlockTitle: string;
}
