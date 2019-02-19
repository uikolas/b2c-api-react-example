import { WithStyles } from '@material-ui/core';
import { styles } from 'src/shared/components/pages/WishListPage/styles';

export interface IWishlistPageProps extends WithStyles<typeof styles> {
    dispatch: Function;
    isLoading: boolean;
    isInitial: boolean;

    getWishlistsAction(): void;
}
