import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import {IOrderDetailsParsed} from "src/shared/interfaces/order/index";
import {TAppCurrency} from "@stores/reducers/common/init";


export interface IOrderDetailsTotalsProps extends WithStyles<typeof styles> {
  currency: TAppCurrency;
  expenses: IOrderDetailsParsed["expenses"];
  totals: IOrderDetailsParsed["totals"];
}

