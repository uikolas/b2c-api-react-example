import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from "./styles";
import { ICartItem, ICartTotals } from "src/shared/interfaces/cart";

export interface CartDataProps extends WithStyles<typeof styles> {
  products: Array<ICartItem>;
  totals: ICartTotals;
}

export interface CartDataState {
  heightListItem: number;
}
