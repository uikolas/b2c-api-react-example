import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {styles} from './styles';
import {IOrderItem} from 'src/shared/interfaces/order';
import { OrderListItem } from '../OrderListItem';
import {
  OrdersHistoryTableHeaderDate,
  OrdersHistoryTableHeaderID,
  OrdersHistoryTableHeaderTotal
} from "src/shared/constants/orders/index";
import {IOrderListProps} from "src/shared/components/Pages/OrderHistoryPage/OrderList/types";


export const OrderListBase: React.SFC<IOrderListProps> = (props): JSX.Element => {
  const {classes, orders} = props;

  return (
    <div className={classes.root}>

      <Paper className={classes.tableOuter}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>{OrdersHistoryTableHeaderID}</TableCell>
              <TableCell>{OrdersHistoryTableHeaderDate}</TableCell>
              <TableCell>{OrdersHistoryTableHeaderTotal}</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { orders.map((item: IOrderItem) => (
              <OrderListItem
                key={item.id}
                id={item.id}
                dateCreated={item.dateCreated}
                currency={item.currency}
                totals={item.totals}
              />
            )) }
          </TableBody>
        </Table>
      </Paper>

    </div>

  );
};

export const OrderList = withStyles(styles)(OrderListBase);
