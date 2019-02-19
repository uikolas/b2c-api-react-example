import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartTotals } from 'src/shared/interfaces/cart/index';
import { styles } from './styles';

export interface OrderSummaryProps extends WithStyles<typeof styles> {
    totals: ICartTotals;
}

export interface OrderSummaryState {
    voucherCode: string;
}
