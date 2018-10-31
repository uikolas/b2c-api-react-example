import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartTotals, TCartId } from 'src/shared/interfaces/cart';
import { ICartItem } from 'src/shared/reducers/Common/Cart';
import { TProductSKU } from 'src/shared/interfaces/product';
import { styles } from './styles';

export interface CartDropProps extends WithStyles<typeof styles> {
  // connect
  totals: ICartTotals;
  cartItems: ICartItem[];
  isUserLoggedIn?: boolean;
  cartId: string;
  cartDeleteItemAction?(cartId: TCartId, itemId: TProductSKU): void;
  removeItemGuestCartAction?(cartId: TCartId, itemId: TProductSKU): void;
}
