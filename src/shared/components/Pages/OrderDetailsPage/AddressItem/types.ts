import {WithStyles} from '@material-ui/core/styles/withStyles';
import {addressItemStyles} from "./styles";
import {IAddressItemOrder} from "src/shared/interfaces/addresses/index";


export interface IAddressItemProps extends WithStyles<typeof addressItemStyles>, IAddressItemOrder {
  blockTitle: string;
}
