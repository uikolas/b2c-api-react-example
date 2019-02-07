import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface AddNewWishListFormProps extends WithStyles<typeof styles> {
    addWishlistAction(name: string): void;
}

export interface AddNewWishListFormState {
    name: string;
}
