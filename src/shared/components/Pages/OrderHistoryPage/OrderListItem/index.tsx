import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { styles } from './styles';
import { IOrderItem } from 'src/shared/interfaces/order';
import { AppPrice } from '../../../Common/AppPrice';
import { AppDate } from '../../../Common/AppDate';
import { SprykerButton } from '../../../UI/SprykerButton';
import { OrderHistoryContext } from '../context';

interface OrderListItemProps extends WithStyles<typeof styles>, IOrderItem {

}

export const viewOrderButton = 'View Order';
export const reorderButton = 'Reorder';

export const OrderListItemBase: React.SFC<OrderListItemProps> = (props): JSX.Element => {
  const {classes, id, dateCreated, currency, totals: {grandTotal}} = props;

  return (
    <OrderHistoryContext.Consumer>
      { ({viewClickHandler}) => (
        <TableRow key={ id }>
          <TableCell component="th" scope="row">
            { id }
          </TableCell>
          <TableCell><AppDate value={ dateCreated }/></TableCell>
          <TableCell><AppPrice value={ grandTotal } specificCurrency={ currency }/></TableCell>
          <TableCell>
            <SprykerButton
              title={ viewOrderButton }
              value={ id }
              onClick={ viewClickHandler }
            />
          </TableCell>
        </TableRow>
      ) }
    </OrderHistoryContext.Consumer>
  );
};

export const OrderListItem = withStyles(styles)(OrderListItemBase);

