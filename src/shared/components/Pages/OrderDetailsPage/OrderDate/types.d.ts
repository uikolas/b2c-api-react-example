import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsParsed } from '@interfaces/order';
import { TAppTimeZone } from '@interfaces/locale';

export interface IOrderDateProps extends WithStyles<typeof styles> {
    date: IOrderDetailsParsed['dateCreated'];
    timeZone: TAppTimeZone;
    title: string;
}
