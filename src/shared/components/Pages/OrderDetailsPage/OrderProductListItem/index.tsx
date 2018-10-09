import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {styles} from './styles';
import {IOrderDetailsItem, TOrderId} from "../../../../interfaces/order/index";
import {AppPrice} from "../../../Common/AppPrice/index";
import {OrderDetailsContext} from '../context';
import {TAppCurrency} from "../../../../reducers/Common/Init";

interface OrderProductListItemProps extends WithStyles<typeof styles>, IOrderDetailsItem {
  currency: TAppCurrency;
}

export const OrderProductListItemBase: React.SFC<OrderProductListItemProps> = (props): JSX.Element => {
  const {classes, name, quantity, sku, sumPrice, sumPriceToPayAggregation} = props;

  return (
    <OrderDetailsContext.Consumer>
      {({ selectItemHandler, currency }) => (
        <TableRow key={sku}>
          <TableCell>{sku}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell><AppPrice value={sumPrice} specificCurrency={currency} /></TableCell>
          <TableCell>{quantity}</TableCell>
          <TableCell><AppPrice value={sumPriceToPayAggregation} specificCurrency={currency} /></TableCell>
        </TableRow>
      )}
    </OrderDetailsContext.Consumer>
  );
};

export const OrderProductListItem = withStyles(styles)(OrderProductListItemBase);

