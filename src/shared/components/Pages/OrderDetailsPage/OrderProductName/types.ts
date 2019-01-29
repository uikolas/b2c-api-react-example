import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsItem } from 'src/shared/interfaces/order';

export interface IOrderProductNameProps extends WithStyles<typeof styles> {
    productName: IOrderDetailsItem['name'];
    titleSKU: string;
    sku: IOrderDetailsItem['sku'];
}
