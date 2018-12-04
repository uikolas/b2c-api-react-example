import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import {TOrderProducts} from "src/shared/interfaces/order/index";


export interface IOrderProductListProps extends WithStyles<typeof styles> {
  items: TOrderProducts;
}

