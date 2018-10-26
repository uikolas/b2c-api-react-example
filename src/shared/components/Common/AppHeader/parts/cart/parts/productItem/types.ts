import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartItem } from 'src/shared/reducers/Common/Cart';
import { styles } from './styles';

export interface ProductItemProps extends WithStyles<typeof styles> {
  productData: ICartItem;
  deleteItem(itemId: string): void;
}
