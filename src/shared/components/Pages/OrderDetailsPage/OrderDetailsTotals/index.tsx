import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {styles} from './styles';
import {IOrderDetailsExpenseItem, IOrderTotals, TOrderExpenses} from "../../../../interfaces/order/index";
import {AppPrice} from "../../../Common/AppPrice/index";
import {TAppCurrency} from "../../../../reducers/Common/Init";
import {TAbstractTotal} from "../../../../interfaces/abstract/totals";


interface OrderDetailsTotalsProps extends WithStyles<typeof styles>, IOrderTotals {
  currency: TAppCurrency;
  expenses: TOrderExpenses;
}

export const subtotalTitle = "Subtotal: ";
export const expensesTitle = "Shipment ";
export const shipmentTitle = `${expensesTitle} Total: `;
export const discountTitle = "Discount: ";
export const taxTitle = "Tax: ";
export const canceledTitle = "Canceled: ";
export const totalTitle = "Grand Total: ";

export const OrderDetailsTotalsBase: React.SFC<OrderDetailsTotalsProps> = (props): JSX.Element => {
  const {
    classes,
    expenses,
    currency,
    canceledTotal,
    expenseTotal,
    discountTotal,
    taxTotal,
    subtotal,
    grandTotal
  } = props;

  console.log('expenses ', expenses);
  const renderTotalItem = (
                            value: TAbstractTotal,
                            title: string = '',
                            valueSign: string | null = null,
                            extraClassName: string | null = null
                          ): JSX.Element | null => {

    if (!value) {
      return null;
    }

    return (
      <Typography
        variant="subheading"
        color="inherit"
        align="right"
        gutterBottom={true}
        className={extraClassName ? extraClassName : null}
      >
        {title}
        {valueSign ? valueSign : null}
        <AppPrice value={value} specificCurrency={currency} />
      </Typography>
    );
  }

  return (
    <Grid container justify="flex-end" className={classes.root}>
      <Grid item xs={12}>
        {renderTotalItem(subtotal, subtotalTitle)}
        {(!expenses || !expenses.length)
          ? null
          : expenses.map( (item: IOrderDetailsExpenseItem) => {
            return (
              <React.Fragment key={item.name}>
                {renderTotalItem(item.sumPrice, `${expensesTitle} ${item.name}: `)}
              </React.Fragment>
            );
          })
        }
        {expenses.length > 1 ? renderTotalItem(expenseTotal, shipmentTitle) : null}
        {renderTotalItem(canceledTotal, canceledTitle)}
        {/*renderTotalItem(taxTotal, taxTitle)*/}
        {renderTotalItem(discountTotal, discountTitle, '-')}
        {renderTotalItem(grandTotal, totalTitle, null, classes.bold)}
      </Grid>
    </Grid>
  );
};

export const OrderDetailsTotals = withStyles(styles)(OrderDetailsTotalsBase);

