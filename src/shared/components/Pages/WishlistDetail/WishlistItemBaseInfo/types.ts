import { WithStyles } from '@material-ui/core';
import { IWishlistProduct } from 'src/shared/interfaces/wishlist';
import { styles } from '../styles';

export interface WishListRowsProps extends WithStyles<typeof styles> {
    productItem: IWishlistProduct;
    renderProduct: Function;
}
