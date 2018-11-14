import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICartItem } from 'src/shared/reducers/Common/Cart';
import { ICartTotals, TCartId } from 'src/shared/interfaces/cart';

export interface CartPageProps extends WithStyles<typeof styles> {
  dispatch: Function;
  location: string;
  items: Array<ICartItem>;
  totals: ICartTotals;
  cartId: TCartId;
  isUserLoggedIn: boolean;
  anonymId: string;
  updateItemInCartAction: Function;
  cartDeleteItemAction: Function;
  removeItemGuestCartAction: Function;
  updateGuestCartAction: Function;
}

export interface CartPageState {
  heightListItem: number;
  voucherCode: string;
}
