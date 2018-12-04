import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import {IOrderDetailsParsed, TOrderDate, TOrderId} from "src/shared/interfaces/order/index";


export interface IOrderDetailsGeneralInfoProps extends WithStyles<typeof styles> {
  orderId: TOrderId;
  date: TOrderDate;
  btnBackHandler: Function;
  priceMode: IOrderDetailsParsed["priceMode"];
}

