import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsParsed } from 'src/shared/interfaces/order';

export interface IOrderPriceModeProps extends WithStyles<typeof styles> {
    priceMode: IOrderDetailsParsed['priceMode'];
    title: string;
}
