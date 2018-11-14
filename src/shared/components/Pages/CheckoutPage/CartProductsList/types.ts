import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { TOrderProducts } from 'src/shared/interfaces/order';


export interface ICartProductsListProps extends WithStyles<typeof styles> {
  items: TOrderProducts;
}
