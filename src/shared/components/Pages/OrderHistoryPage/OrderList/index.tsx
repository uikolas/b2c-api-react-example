import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { styles } from './styles';
import { IOrderCollectionParsed } from '../../../../interfaces/order';
import { OrderListItem } from '../OrderListItem';

interface OrderListProps extends WithStyles<typeof styles>, IOrderCollectionParsed {

}

export const title = 'View orders';
export const orderIdTitle = 'Order Id';
export const orderDateTitle = 'Order Date';
export const orderTotalTitle = 'Total';
export const orderActionsTitle = 'Actions';

export const OrderListBase: React.SFC<OrderListProps> = (props): JSX.Element => {
  const {classes, items} = props;

  return (
    <div className={ classes.root }>
      <Typography variant="title" color="inherit" gutterBottom={ true } className={ classes.title }>
        { title }
      </Typography>

      <Paper className={ classes.tableOuter }>
        <Table className={ classes.table }>
          <TableHead>
            <TableRow>
              <TableCell>{ orderIdTitle }</TableCell>
              <TableCell>{ orderDateTitle }</TableCell>
              <TableCell>{ orderTotalTitle }</TableCell>
              <TableCell>{ orderActionsTitle }</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { items.map(item => (
              <OrderListItem
                key={ item.id }
                id={ item.id }
                dateCreated={ item.dateCreated }
                currency={ item.currency }
                totals={ item.totals }
              />
            )) }
          </TableBody>
        </Table>
      </Paper>

    </div>

  );
};

export const OrderList = withStyles(styles)(OrderListBase);

