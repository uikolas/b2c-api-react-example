import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from 'src/shared/interfaces/commoon/react';
import { styles } from './styles';

export interface CartProps extends WithStyles<typeof styles>, WithRouter {
  // connect
  cartItemsQuantity?: number;
}

export interface CartState {
  anchorEl: HTMLElement | null;
}
