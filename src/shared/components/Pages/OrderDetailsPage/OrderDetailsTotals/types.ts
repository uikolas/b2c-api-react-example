import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsParsed } from 'src/shared/interfaces/order';
import { TAppCurrency } from 'src/shared/interfaces/currency';

export interface IOrderDetailsTotalsProps extends WithStyles<typeof styles> {
    currency: TAppCurrency;
    expenses: IOrderDetailsParsed['expenses'];
    totals: IOrderDetailsParsed['totals'];
}
