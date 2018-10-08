import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {styles} from './styles';
import {IOrderItem, TOrderId} from "../../../../interfaces/order/index";
import {AppPrice} from "../../../Common/AppPrice/index";
import {AppDate} from "../../../Common/AppDate/index";
import {SprykerButton} from "../../../UI/SprykerButton/index";
import {OrderHistoryContext} from '../context';

interface OrderListItemProps extends WithStyles<typeof styles>, IOrderItem {

}

export const viewOrderButton = "View Order";
export const reorderButton = "Reorder";

export const OrderListItemBase: React.SFC<OrderListItemProps> = (props): JSX.Element => {
  const { classes, id, dateCreated, currency, totals: {grandTotal} } = props;

  return (
    <OrderHistoryContext.Consumer>
      {({ viewClickHandler }) => (
        <TableRow key={id}>
          <TableCell component="th" scope="row">
            {id}
          </TableCell>
          <TableCell><AppDate value={dateCreated} /></TableCell>
          <TableCell><AppPrice value={grandTotal} specificCurrency={currency} /></TableCell>
          <TableCell>
            <SprykerButton
              title={viewOrderButton}
              value={id}
              onClick={viewClickHandler}
            />
            <SprykerButton
              title={reorderButton}
              value={id}
            />
          </TableCell>
        </TableRow>
      )}
    </OrderHistoryContext.Consumer>
  );
};

export const OrderListItem = withStyles(styles)(OrderListItemBase);

