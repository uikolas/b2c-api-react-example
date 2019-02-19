import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from 'src/interfaces/common/index';
import { styles } from './styles';
import { TProductQuantity } from 'src/interfaces/product/index';

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
