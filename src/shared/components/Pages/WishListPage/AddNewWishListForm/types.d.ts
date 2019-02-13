import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IAddNewWishListFormProps extends WithStyles<typeof styles> {
    addWishlistAction(name: string): void;
}

export interface IAddNewWishListFormState {
    name: string;
}
