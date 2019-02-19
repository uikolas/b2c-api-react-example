import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from 'src/shared/interfaces/common/index';
import { styles } from './styles';
import { TProductQuantity } from 'src/shared/interfaces/product';

export interface IMiniCartDropDownProps extends WithStyles<typeof styles>, WithRouter {
    cartItemsQuantity?: TProductQuantity;
    cartProductsQuantity?: TProductQuantity;
    popoverPosLeft: number;
    popoverPosTop: number;
}

export interface IMiniCartDropDownState {
    anchorElement: HTMLElement | null;
    isCartNotificationOpen: boolean;
}
