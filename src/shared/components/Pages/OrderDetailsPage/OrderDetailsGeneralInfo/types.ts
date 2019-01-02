import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import {IOrderDetailsParsed} from "src/shared/interfaces/order/index";
import {TAppTimeZone} from "src/shared/interfaces/locale/index";


export interface IOrderDetailsGeneralInfoProps extends WithStyles<typeof styles> {
  orderId: IOrderDetailsParsed["id"];
  date: IOrderDetailsParsed["dateCreated"];
  priceMode: IOrderDetailsParsed["priceMode"];
  timeZone: TAppTimeZone;
}

