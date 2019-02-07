import { WithStyles } from '@material-ui/core';
import { styles } from 'src/shared/components/Pages/WishListPage/styles';

export interface WishlistPageProps extends WithStyles<typeof styles> {
    dispatch: Function;
    isLoading: boolean;
    isInitial: boolean;

    getWishlistsAction(): void;
}
