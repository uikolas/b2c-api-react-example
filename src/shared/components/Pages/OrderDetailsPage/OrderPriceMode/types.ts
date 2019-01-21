import { WithStyles } from '@material-ui/core';
import {styles} from './styles';
import {IOrderDetailsParsed} from "src/shared/interfaces/order/index";
import {TAppTimeZone} from "@stores/reducers/common/init";


export interface IOrderPriceModeProps extends WithStyles<typeof styles> {
  priceMode: IOrderDetailsParsed["priceMode"];
  title: string;
}

