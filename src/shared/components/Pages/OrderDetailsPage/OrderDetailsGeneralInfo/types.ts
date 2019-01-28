import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsParsed } from 'src/shared/interfaces/order';
import { TAppTimeZone } from 'src/shared/interfaces/locale';

export interface IOrderDetailsGeneralInfoProps extends WithStyles<typeof styles> {
    orderId: IOrderDetailsParsed['id'];
    date: IOrderDetailsParsed['dateCreated'];
    priceMode: IOrderDetailsParsed['priceMode'];
    timeZone: TAppTimeZone;
}
