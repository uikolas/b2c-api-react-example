import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IWishlist } from '@interfaces/wishlist';

export interface WishListsTableProps extends WithStyles<typeof styles> {
    isLoading: boolean;
    wishlists: IWishlist[] | null;

    getWishlistsAction(): void;

    updateWishlistAction(wishlistId: string, name: string): void;

    deleteWishlistAction(wishlistId: string): void;
}

export interface WishListsTableState {
    name: string;
    updatedName: string;
    updatedList: string;
}
