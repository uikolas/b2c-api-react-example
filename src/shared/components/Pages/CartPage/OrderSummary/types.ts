import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartTotals } from 'src/shared/interfaces/cart';
import { styles } from '../styles';

export interface OrderSummaryProps extends WithStyles<typeof styles> {
    totals: ICartTotals;
    voucherCode: string;

    handleChangeVouchercode(event: React.ChangeEvent<HTMLInputElement>): void;
}
