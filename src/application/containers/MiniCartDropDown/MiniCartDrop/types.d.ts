import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartTotals, TCartId, ICartItem } from 'src/interfaces/cart/index';
import { TProductSKU } from 'src/interfaces/product/index';
import { styles } from './styles';

export interface IMiniCartDropProps extends WithStyles<typeof styles> {
    totals: ICartTotals | null;
    cartItems: ICartItem[] | null;
    isUserLoggedIn: boolean;
    cartId: string;
    anonymId: string;
    isCartLoading: boolean;
    cartDeleteItemAction?(cartId: TCartId, itemId: TProductSKU): void;
    removeItemGuestCartAction?(cartId: TCartId, itemId: TProductSKU, anonymId: string): void;
}
