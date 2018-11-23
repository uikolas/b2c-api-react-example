import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from 'src/shared/interfaces/commoon/react';
import { styles } from './styles';
import { TProductQuantity } from 'src/shared/interfaces/product';

export interface CartProps extends WithStyles<typeof styles>, WithRouter {
  // connect
  cartItemsQuantity?: TProductQuantity;
  cartProductsQuantity?: TProductQuantity;
}

export interface CartState {
  anchorEl: HTMLElement | null;
  isCartNotificationOpen: boolean;
}
